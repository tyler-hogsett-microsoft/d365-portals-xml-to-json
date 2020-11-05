const parser = require("xml2json");

const xml = "<foo attr=\"value\"><bar>widget</bar></foo>";
console.log(`input -> ${xml}`);

// xml to json
const json = parser.toJson(xml, {reversible: true});
console.log("to json -> %s", json);

// json to xml
const backToXml = parser.toXml(json);
console.log("back to xml -> %s", backToXml);