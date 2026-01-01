import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const usesYaml = readFileSync(`${__dirname}/../uses.yaml`, "utf-8");
const usesData = parse(usesYaml);

describe("uses.js", () => {
	it("exports an object with categories array", () => {
		expect(usesData).toBeDefined();
		expect(Array.isArray(usesData.categories)).toBe(true);
	});

	it("has at least one category", () => {
		expect(usesData.categories.length).toBeGreaterThan(0);
	});

	it("each category has required properties", () => {
		usesData.categories.forEach((category) => {
			expect(category).toHaveProperty("name");
			expect(category).toHaveProperty("items");
			expect(typeof category.name).toBe("string");
			expect(Array.isArray(category.items)).toBe(true);
		});
	});

	it("each item has required properties", () => {
		usesData.categories.forEach((category) => {
			category.items.forEach((item) => {
				expect(item).toHaveProperty("name");
				expect(item).toHaveProperty("description");
				expect(typeof item.name).toBe("string");
				expect(typeof item.description).toBe("string");
			});
		});
	});

	it("all names and descriptions are non-empty", () => {
		usesData.categories.forEach((category) => {
			category.items.forEach((item) => {
				expect(item.name.length).toBeGreaterThan(0);
				expect(item.description.length).toBeGreaterThan(0);
			});
		});
	});

	it("category names are unique", () => {
		const names = usesData.categories.map((c) => c.name);
		const uniqueNames = new Set(names);
		expect(uniqueNames.size).toBe(names.length);
	});

	it("items per category are not duplicated", () => {
		usesData.categories.forEach((category) => {
			const itemNames = category.items.map((i) => i.name);
			const uniqueNames = new Set(itemNames);
			expect(uniqueNames.size).toBe(itemNames.length);
		});
	});
});
