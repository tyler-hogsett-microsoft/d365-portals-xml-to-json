import { promises as fsPromises } from "fs";
const { readFile } = fsPromises;

async function getSchemaXml(schemaPath: string)
{
  const file = await readFile(schemaPath);
  return file.toString();
}

export default getSchemaXml;