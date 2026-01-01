import { describe, expect, it } from "vitest";
import bookmarksData from "../bookmarks.js";

describe("bookmarks.js", () => {
	it("exports an object with categories array", () => {
		expect(bookmarksData).toBeDefined();
		expect(Array.isArray(bookmarksData.categories)).toBe(true);
	});

	it("has at least one category", () => {
		expect(bookmarksData.categories.length).toBeGreaterThan(0);
	});

	it("each category has required properties", () => {
		bookmarksData.categories.forEach((category) => {
			expect(category).toHaveProperty("name");
			expect(category).toHaveProperty("links");
			expect(typeof category.name).toBe("string");
			expect(Array.isArray(category.links)).toBe(true);
		});
	});

	it("each link has required properties", () => {
		bookmarksData.categories.forEach((category) => {
			category.links.forEach((link) => {
				expect(link).toHaveProperty("title");
				expect(link).toHaveProperty("url");
				expect(link).toHaveProperty("description");
				expect(typeof link.title).toBe("string");
				expect(typeof link.url).toBe("string");
				expect(typeof link.description).toBe("string");
			});
		});
	});

	it("all URLs are valid", () => {
		bookmarksData.categories.forEach((category) => {
			category.links.forEach((link) => {
				expect(() => new URL(link.url)).not.toThrow();
			});
		});
	});
});
