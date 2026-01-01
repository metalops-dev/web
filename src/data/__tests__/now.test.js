import { describe, expect, it } from "vitest";
import nowData from "../now.js";

describe("now.js", () => {
	it("exports an object with sections array", () => {
		expect(nowData).toBeDefined();
		expect(Array.isArray(nowData.sections)).toBe(true);
	});

	it("has at least one section", () => {
		expect(nowData.sections.length).toBeGreaterThan(0);
	});

	it("each section has required properties", () => {
		nowData.sections.forEach((section) => {
			expect(section).toHaveProperty("title");
			expect(section).toHaveProperty("items");
			expect(typeof section.title).toBe("string");
			expect(Array.isArray(section.items)).toBe(true);
		});
	});

	it("each section has at least one item", () => {
		nowData.sections.forEach((section) => {
			expect(section.items.length).toBeGreaterThan(0);
		});
	});

	it("all items are strings", () => {
		nowData.sections.forEach((section) => {
			section.items.forEach((item) => {
				expect(typeof item).toBe("string");
				expect(item.length).toBeGreaterThan(0);
			});
		});
	});

	it("section titles are unique", () => {
		const titles = nowData.sections.map((s) => s.title);
		const uniqueTitles = new Set(titles);
		expect(uniqueTitles.size).toBe(titles.length);
	});
});
