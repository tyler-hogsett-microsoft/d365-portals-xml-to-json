import { toJson as convertXmlToJson } from "xml2json";
import { promises as fsPromises } from "fs";
const { readFile } = fsPromises;
import jsonata from "jsonata";
import YAML from "yamljs";

async function convertSchemaXmlToYaml(schemaXml)
{
  const rawJson = getRawJson(schemaXml);
  const formattedJson = await getFormattedJson(rawJson);
  return YAML.stringify(formattedJson, 100, 2);
}

function getRawJson(schemaXml: string)
{
  const rawJson = convertXmlToJson(
    schemaXml,
    {
      arrayNotation: true,
      coerce: true,
      object: true,
      reversible: true
    });
  rawJson.entities[0].entity.forEach(entity => {
    if(!!entity.filter) {
      entity.filter = convertXmlToJson(
        entity.filter[0]["$t"],
        {
          arrayNotation: true,
          coerce: true,
          object: true,
          reversible: true
        });
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

export default convertSchemaXmlToYaml;