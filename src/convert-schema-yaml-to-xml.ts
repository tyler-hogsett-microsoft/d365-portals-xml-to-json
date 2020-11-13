import YAML from "yamljs";
import { promises as fsPromises } from "fs";
const { readFile } = fsPromises;
import jsonata from "jsonata";
import { toXml as convertJsonToXml } from "xml2json";
import xmlEscape from "xml-escape";
import formatXml from "xml-formatter";

async function convertSchemaYamlToXml(yaml)
{
  const formattedJson = YAML.parse(yaml);
  const rawJson = await getRawJson(formattedJson);
  collapseFetchQueries(rawJson);
  const rawXml = convertJsonToXml(rawJson);
  const formattedXml = formatXml(
    rawXml,
    {
      indentation: "  "
    });
  return formattedXml;
}

async function getRawJson(formattedJson)
{
  const query = await readFile(
    "./src/jsonata/reverse-schema.jsonata",
    "utf-8"
  );
  const expression = jsonata(query);
  const rawJson = expression.evaluate(formattedJson);
  return rawJson;
}

function collapseFetchQueries(rawJson)
{
  rawJson.entities[0].entity.forEach(entity => {
    if(!!entity.filter) {
      entity.filter = [{ "$t":
        xmlEscape(convertJsonToXml(entity.filter))
      }]
    }
  });
}

export default convertSchemaYamlToXml;