import { program } from "commander";
import extractSchema from "./extract-schema";
import packSchema from "./pack-schema";

program
  .version("0.0.1")
  .command("extract <resourceType> <inputPath> [outputPath]")
  .action(extractResource);
program
  .command("pack <inputYmlPath> [outputXmlPath]")
    .action(packSchema);
program.parse(process.argv);

async function extractResource(resourceType: string, inputPath: string, outputPath: string)
{
  if(resourceType === "schema")
  {
    extractSchema(inputPath, outputPath);
  }
}