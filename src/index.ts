import { program } from "commander";
import extractSchema from "./extract-schema";
import packSchema from "./pack-schema";

program
  .version("0.0.1")
  .command("extract <inputXmlPath> [outputYmlPath]")
    .action(extractSchema)
program
  .command("pack <inputYmlPath> [outputXmlPath]")
    .action(packSchema);
program.parse(process.argv);