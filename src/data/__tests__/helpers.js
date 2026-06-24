import { readFileSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));

export function loadYaml(name) {
	const path = `${__dirname}/../${name}.yaml`;
	return parse(readFileSync(path, "utf-8"));
}
