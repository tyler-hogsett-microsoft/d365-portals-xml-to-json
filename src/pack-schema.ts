import { promises as fsPromises } from "fs";
const { readFile } = fsPromises;
import convertSchemaYamlToXml from "./convert-schema-yaml-to-xml";
import createOutputFile from "./create-output-file";

export default async function packSchema(
  inputYmlPath: string,
  outputXmlPath: string = "./bin/data_schema.xml")
{

  const yaml = await readFile(inputYmlPath, "utf-8");
  console.log(`Schema YAML Length: ${yaml.length}`);
  const xml = await convertSchemaYamlToXml(yaml);
  await createOutputFile(outputXmlPath, xml);
}
