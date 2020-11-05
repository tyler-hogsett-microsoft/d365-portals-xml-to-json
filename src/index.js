const parser = require("xml2json");
const jsonata = require("jsonata");
const YAML = require("yamljs");

const xml = "<foo attr=\"value\"><bar>widget</bar></foo>";
console.log(`input -> \r\n${xml}\r\n`);

// xml to json
const json = JSON.parse(parser.toJson(xml, {reversible: true}));
console.log(`to json -> \r\n${JSON.stringify(json, null, 2)}\r\n`);

// reversible json: {"foo":{"attr":"value","bar":{"$t":"widget"}}}
// "readable" goal: {"foo":{"attr":"value","bar":"widget"}}
const expression = jsonata(
    '{"foo":{"attr":foo.attr,"bar":foo.bar."$t"}}');
const result = expression.evaluate(json);
console.log(`through jsonata -> \r\n${JSON.stringify(result, null, 2)}\r\n`);

const yaml = YAML.stringify(result, null, 2);
console.log(`to YAML -> \r\n${yaml}`);

const backToJson = YAML.parse(yaml);
console.log(`back to json -> \r\n${JSON.stringify(backToJson, null, 2)}\r\n`);

const reverseExpression = jsonata(
    `{"foo":{"attr":foo.attr,"bar":{"$t":foo.bar}}}`);
const reverseResult = reverseExpression.evaluate(backToJson);
console.log(
    `run through reverse query -> \r\n${
        JSON.stringify(reverseResult, null, 2)}\r\n`);

// json to xml
const backToXml = parser.toXml(reverseResult);
console.log(`back to xml -> \r\n${backToXml}`);