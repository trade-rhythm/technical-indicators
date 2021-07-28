#!/usr/bin/env node
const fs = require("fs/promises");
const path = require("path");
const { build, ts, tsconfig, dirname, glob, log } = require("estrella");
const zlib = require("zlib");
const prettyBytes = require("pretty-bytes");

const brotliSize = buffer => zlib.brotliCompressSync(buffer).length;
const config = {
  entry: "src/main.ts",
  target: ["safari13", "chrome90", "firefox88"] // Last 2 major versions
};

build({
  ...config,
  outfile: "dist/index.mjs",
  bundle: true,
  format: "esm",
  minify: false,
  async onEnd(config) {
    const dtsFilesOutdir = dirname(config.outfile);
    generateTypeDefs(tsconfig(config), config.entry, dtsFilesOutdir);
  }
});

build({
  ...config,
  tslint: false,
  outfile: "dist/index.cjs",
  bundle: true,
  format: "cjs",
  minify: false
});

build({
  ...config,
  tslint: false,
  outfile: "dist/index.min.js",
  bundle: true,
  format: "iife",
  globalName: "TA",
  minify: true,
  async onEnd(config) {
    const size = prettyBytes(brotliSize(await fs.readFile(config.outfile)));
    console.log(`all: ${size} (min, br)`);
  }
});

fs.readdir("./src").then(files => {
  files.forEach(async file => {
    const stat = await fs.lstat(`./src/${file}`);
    if (stat.isDirectory()) {
      build({
        quiet: true,
        entry: `src/${file}/index.ts`,
        outfile: `dist/${file}/index.js`,
        bundle: false,
        format: "esm",
        minify: false,
        target: config.target,
        async onEnd(config) {
          const size = prettyBytes(
            brotliSize(await fs.readFile(config.outfile))
          );
          console.log(`${path.dirname(config.outfile)}: ${size} (br)`);
        }
      });
      build({
        quiet: true,
        tslint: false,
        entry: `src/${file}/index.ts`,
        outfile: `dist/${file}/index.cjs`,
        bundle: false,
        format: "cjs",
        target: config.target,
        minify: false
      });
    }
  });
});

function generateTypeDefs(tsconfig, entryfiles, outdir) {
  const filenames = Array.from(
    new Set(
      (Array.isArray(entryfiles) ? entryfiles : [entryfiles]).concat(
        tsconfig.include || []
      )
    )
  ).filter(v => v);
  log.info("Generating type declaration files for", filenames.join(", "));
  const compilerOptions = {
    ...tsconfig.compilerOptions,
    moduleResolution: undefined,
    declaration: true,
    outDir: outdir
  };
  const program = ts.ts.createProgram(filenames, compilerOptions);
  const targetSourceFile = undefined;
  const writeFile = undefined;
  const cancellationToken = undefined;
  const emitOnlyDtsFiles = true;
  program.emit(
    targetSourceFile,
    writeFile,
    cancellationToken,
    emitOnlyDtsFiles
  );
  log.info("Wrote", glob(outdir + "/*.d.ts").join(", "));
}
