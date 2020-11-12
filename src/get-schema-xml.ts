const readFile = require("fs").promises.readFile;

async function getSchemaXml()
{
  const file = await readFile("test/sample-portal/data_schema.xml");
  return file.toString();
}

export default getSchemaXml;