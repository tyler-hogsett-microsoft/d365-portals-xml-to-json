import external from "rollup-plugin-peer-deps-external";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve as resolve } from "@rollup/plugin-node-resolve";
// import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    dir: "build",
    format: "cjs"
  },
  external: ["fs"],
  watch: {
    include: "src/**"
  },
  plugins: [
    //external(),
    typescript(),
    resolve(),
    /*, terser()*/
  ]
}