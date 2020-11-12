import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.ts",
    output: {
        file: "bin/index.js",
        format: "cjs"
    },
    external: ["fs"],
    watch: {
        include: "src/**"
    },
    plugins: [typescript(), terser()]
}