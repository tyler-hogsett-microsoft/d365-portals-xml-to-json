const loadConfigFile = require('rollup/dist/loadConfigFile');
const path = require('path');
const rollup = require('rollup');

loadConfigFile(path.resolve(__dirname, 'rollup.config.js')).then(
  async ({ options }) => {
    for (const optionsObj of options) {
      const bundle = await rollup.rollup(optionsObj);
      await Promise.all(optionsObj.output.map(bundle.write));
    }

    const watcher = rollup.watch(options);
    watcher.on("event", event => {
      if(event.code === "BUNDLE_END") {
        delete require.cache[require.resolve("./bin/index")];
        require("./bin/index");
      }
    })
  }
);