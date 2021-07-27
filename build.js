#!/usr/bin/env node
const fs = require("fs/promises");
const path = require("path");
const { build, ts, tsconfig, dirname, glob, log } = require("estrella");
const zlib = require("zlib");
const prettyBytes = require("pretty-bytes");

const brotliSize = (buffer) => zlib.brotliCompressSync(buffer).length;

build({
  entry: "src/main.ts",
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  minify: false,
  target: ["safari13"],
  async onEnd(config) {
    const dtsFilesOutdir = dirname(config.outfile);
    generateTypeDefs(tsconfig(config), config.entry, dtsFilesOutdir);
    const size = prettyBytes(brotliSize(await fs.readFile(config.outfile)));
    console.log(`all: ${size} (br)`);
  },
});

build({
  tslint: false,
  entry: "src/main.ts",
  outfile: "dist/index.cjs",
  bundle: true,
  format: "cjs",
  minify: false,
  target: ["safari13"],
});

fs.readdir("./src").then((files) => {
  files.forEach(async (file) => {
    const stat = await fs.lstat(`./src/${file}`);
    if (stat.isDirectory()) {
      build({
        quiet: true,
        entry: `src/${file}/index.ts`,
        outfile: `dist/${file}/index.js`,
        bundle: false,
        format: "esm",
        minify: false,
        target: ["safari13"],
        async onEnd(config) {
          const size = prettyBytes(
            brotliSize(await fs.readFile(config.outfile))
          );
          console.log(`${path.dirname(config.outfile)}: ${size} (br)`);
        },
      });
      build({
        quiet: true,
        tslint: false,
        entry: `src/${file}/index.ts`,
        outfile: `dist/${file}/index.cjs`,
        bundle: false,
        format: "cjs",
        target: ["safari13"],
        minify: false,
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
  ).filter((v) => v);
  log.info("Generating type declaration files for", filenames.join(", "));
  const compilerOptions = {
    ...tsconfig.compilerOptions,
    moduleResolution: undefined,
    declaration: true,
    outDir: outdir,
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
