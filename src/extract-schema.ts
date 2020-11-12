import convertSchemaXmlToYaml from "./convert-schema-xml-to-yaml";
import createOutputFile from "./create-output-file";
import getSchemaXml from "./get-schema-xml";

export default async function extractSchema(
  inputXmlPath: string,
  outputYmlPath: string = "./bin/schema.yml")
{
  const xml = await getSchemaXml(inputXmlPath);
  console.log(`Schema XML Length: ${xml.length}`);
  const yaml = await convertSchemaXmlToYaml(xml);
  await createOutputFile(outputYmlPath, yaml);
}
