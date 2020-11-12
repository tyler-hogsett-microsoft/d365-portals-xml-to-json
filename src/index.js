import {
    existsSync as fileExists,
    promises as fsPromises
} from "fs";
const createDirectory = fsPromises.mkdir;
const deleteFile = fsPromises.unlink;
const writeFile = fsPromises.writeFile;
const readFile = fsPromises.readFile;

import getSchemaXml from "./get-schema-xml";
import convertSchemaXmlToYaml from "./convert-schema-xml-to-yaml";
import convertSchemaYamlToXml from "./convert-schema-yaml-to-xml";

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
