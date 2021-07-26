const Benchmark = require("benchmark");
const { Big, Fast } = require("../dist/index.cjs");

const suite = new Benchmark.Suite("INum");

global.Big = Big;
global.Fast = Fast;

suite
  .add("TR#Fast", {
    fn() {
      const f = new Fast(0.2);
      f.add(0.1);
    },
  })
  .add("TR#Big", {
    fn() {
      const b = new Big(0.2);
      b.add(0.1);
    },
  })
  .on("cycle", function (event) {
    console.log(String(event.target));
  })
  .on("complete", function () {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true, defer: true });
