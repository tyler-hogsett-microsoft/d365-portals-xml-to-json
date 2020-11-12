import { dirname } from "path";
import { promises as fsPromises } from "fs";
const { mkdir, writeFile } = fsPromises;

export default async function createOutputFile(
  path: string,
  contents: string
) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents, "utf-8");
}