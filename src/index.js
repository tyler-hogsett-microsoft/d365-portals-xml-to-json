const jsonata = require("jsonata");
const parser = require("xml2json");

const xml = "<foo attr=\"value\"><bar>widget</bar></foo>";
console.log(`input -> ${xml}`);

// xml to json
const json = JSON.parse(parser.toJson(xml, {reversible: true}));
console.log(`to json -> ${JSON.stringify(json)}`);

// reversible json: {"foo":{"attr":"value","bar":{"$t":"widget"}}}
// "readable" goal: {"foo":{"attr":"value","bar":"widget"}}
const expression = jsonata('{"foo":{"attr":foo.attr,"bar":foo.bar."$t"}}');
const result = expression.evaluate(json);
console.log(`through jsonata -> ${JSON.stringify(result)}`);

const reverseExpression = jsonata(`{"foo":{"attr":foo.attr,"bar":{"$t":foo.bar}}}`);
const reverseResult = reverseExpression.evaluate(result);
console.log(`run through reverse query -> ${JSON.stringify(reverseResult)}`);

// json to xml
const backToXml = parser.toXml(reverseResult);
console.log("back to xml -> %s", backToXml);