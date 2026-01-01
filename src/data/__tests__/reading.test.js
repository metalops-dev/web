import { readFileSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";

const __dirname = dirname(fileURLToPath(import.meta.url));
const readingYaml = readFileSync(`${__dirname}/../reading.yaml`, "utf-8");
const readingData = parse(readingYaml);

describe("reading.js", () => {
	it("exports an object with sections array", () => {
		expect(readingData).toBeDefined();
		expect(Array.isArray(readingData.sections)).toBe(true);
	});

	it("has at least one section", () => {
		expect(readingData.sections.length).toBeGreaterThan(0);
	});

	it("each section has required properties", () => {
		readingData.sections.forEach((section) => {
			expect(section).toHaveProperty("name");
			expect(section).toHaveProperty("books");
			expect(typeof section.name).toBe("string");
			expect(Array.isArray(section.books)).toBe(true);
		});
	});

	it("each book has required properties", () => {
		readingData.sections.forEach((section) => {
			section.books.forEach((book) => {
				expect(book).toHaveProperty("title");
				expect(book).toHaveProperty("author");
				expect(typeof book.title).toBe("string");
				expect(typeof book.author).toBe("string");
			});
		});
	});

	it("section names are unique", () => {
		const names = readingData.sections.map((s) => s.name);
		const uniqueNames = new Set(names);
		expect(uniqueNames.size).toBe(names.length);
	});
});
