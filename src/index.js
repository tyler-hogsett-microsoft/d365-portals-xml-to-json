const getSchemaXml = require("./get-schema-xml");
const convertSchemaXmlToYaml = require("./convert-schema-xml-to-yaml");
const parser = require("xml2json");
const jsonata = require("jsonata");
const YAML = require("yamljs");
const fileExists = require("fs").existsSync;
const createDirectory = require("fs").promises.mkdir;
const deleteFile = require("fs").promises.unlink;
const writeFile = require("fs").promises.writeFile;

runAsync();

async function runAsync() {
    const xml = await getSchemaXml();
    console.log(`Schema XML Length: ${xml.length}`);

    const yaml = await convertSchemaXmlToYaml(xml);
    
    const binPath = "./bin";
    if(!fileExists(binPath))
    {
        await createDirectory(binPath);
    }
    const schemaFilePath = `${binPath}/schema.yml`;
    if(fileExists(schemaFilePath))
    {
        await deleteFile(schemaFilePath)
    }
    writeFile(schemaFilePath, JSON.stringify(yaml, null, 2));
}

/*

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
*/