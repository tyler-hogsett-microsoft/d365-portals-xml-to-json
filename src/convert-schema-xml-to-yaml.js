const convertXmlToJson = require("xml2json").toJson;
const readFile = require("fs").promises.readFile;
const jsonata = require("jsonata");
const YAML = require("yamljs");

const xmlToJsonOptions = {
    arrayNotation: true,
    coerce: true,
    object: true,
    reversible: true
};

async function convertSchemaXmlToYaml(schemaXml)
{
    const rawJson = getRawJson(schemaXml);
    const formattedJson = await getFormattedJson(rawJson);
    return YAML.stringify(formattedJson, 100, 2);
}

function getRawJson(schemaXml)
{
    const rawJson = convertXmlToJson(
        schemaXml,
        xmlToJsonOptions);
    rawJson.entities[0].entity.forEach(entity => {
        if(!!entity.filter) {
            entity.filter = convertXmlToJson(
                entity.filter[0]["$t"],
                xmlToJsonOptions);
        }
    });
    return rawJson;
}

async function getFormattedJson(rawJson)
{
    const query = await readFile(
        "./src/jsonata/schema.jsonata",
        "utf-8");
    const expression = jsonata(query);
    const formattedJson = expression.evaluate(rawJson);
    return formattedJson;
}

module.exports = convertSchemaXmlToYaml;