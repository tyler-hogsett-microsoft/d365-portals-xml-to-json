const convertXmlJson = require("xml2json").toJson;
const readFile = require("fs").promises.readFile;
const jsonata = require("jsonata");
const YAML = require("yamljs");

const xmlToJsonOptions = {
    arrayNotation: true,
    coerce: true,
    object: false
};

async function convertSchemaXmlToYaml(schemaXml)
{
    const rawJson = getRawJson(schemaXml);
    return JSON.parse(JSON.stringify(rawJson));
    /*const formattedJson = getFormattedJson(rawJson);
    return formattedJson;*/
}

async function getRawJson(schemaXml)
{
    const rawJson = JSON.parse(convertXmlJson(
        schemaXml,
        xmlToJsonOptions));
    return rawJson;
    rawJson.entities.forEach(entities =>
        entities.entity.forEach(entity => {
            if(!!entity.filter) {
                entity.filter = JSON.parse(convertXmlJson(
                    entity.filter[0],
                    xmlToJsonOptions));
            }
        })
    );
    return rawJson;
}

async function getFormattedJson(rawJson)
{
    return JSON.parse(JSON.stringify(rawJson));
    const query = await readFile(
        "./src/jsonata/schema.jsonata",
        "utf-8");
    const expression = jsonata(query);
    const formattedJson = expression.evaluate();
    return formattedJson;
}

module.exports = convertSchemaXmlToYaml;