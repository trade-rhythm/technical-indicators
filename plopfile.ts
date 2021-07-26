import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("indicator", {
    description: "technical indicator",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "indicator name please",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/{{name}}/index.ts",
        templateFile: "templates/indicator.hbs",
      },
      {
        type: "add",
        path: "src/{{name}}/{{name}}.test.ts",
        templateFile: "templates/test.hbs",
      },
    ],
  });
}
