const fileExists = require("fs").existsSync;
const createDirectory = require("fs").promises.mkdir;
const deleteFile = require("fs").promises.unlink;
const writeFile = require("fs").promises.writeFile;
const readFile = require("fs").promises.readFile;

const getSchemaXml = require("./get-schema-xml");
const convertSchemaXmlToYaml = require("./convert-schema-xml-to-yaml");
const convertSchemaYamlToXml = require("./convert-schema-yaml-to-xml");

const binPath = "./bin";
const schemaFilePath = `${binPath}/schema.yml`;
const reverseSchemaFilePath = `${binPath}/reverse-schema.xml`;

runAsync();

async function runAsync() {    
    if(!fileExists(binPath))
    {
        await createDirectory(binPath);
    }
    await createYaml();
    await createXml();
}

async function createYaml() {
    if(fileExists(schemaFilePath))
    {
        await deleteFile(schemaFilePath)
    }

    const xml = await getSchemaXml();
    console.log(`Schema XML Length: ${xml.length}`);
    const yaml = await convertSchemaXmlToYaml(xml);
    await writeFile(schemaFilePath, yaml);
}

async function createXml() {
    if(fileExists(reverseSchemaFilePath))
    {
        await deleteFile(reverseSchemaFilePath);
    }

    const yaml = await readFile(schemaFilePath, "utf-8");
    console.log(`Schema YAML Length: ${yaml.length}`);
    const xml = await convertSchemaYamlToXml(yaml);
    await writeFile(reverseSchemaFilePath, xml);
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