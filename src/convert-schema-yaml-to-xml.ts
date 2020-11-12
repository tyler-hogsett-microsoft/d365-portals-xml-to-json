const YAML = require("yamljs");
const readFile = require("fs").promises.readFile;
const jsonata = require("jsonata");
const convertJsonToXml = require("xml2json").toXml;
const xmlEscape = require("xml-escape");
const formatXml = require("xml-formatter");

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