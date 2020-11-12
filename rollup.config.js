export default {
    input: "src/index.js",
    output: {
        file: "bin/index.js",
        format: "cjs"
    },
    external: ["fs"],
    watch: {
        include: "src/**"
    }
}