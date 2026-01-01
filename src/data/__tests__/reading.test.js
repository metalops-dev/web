import { describe, expect, it } from "vitest";
import readingData from "../reading.js";

describe("reading.js", () => {
	it("exports an object with currentlyReading and recentlyFinished arrays", () => {
		expect(readingData).toBeDefined();
		expect(Array.isArray(readingData.currentlyReading)).toBe(true);
		expect(Array.isArray(readingData.recentlyFinished)).toBe(true);
	});

	it("each book in currentlyReading has required properties", () => {
		readingData.currentlyReading.forEach((book) => {
			expect(book).toHaveProperty("title");
			expect(book).toHaveProperty("author");
			expect(typeof book.title).toBe("string");
			expect(typeof book.author).toBe("string");
		});
	});

	it("each book in recentlyFinished has required properties", () => {
		readingData.recentlyFinished.forEach((book) => {
			expect(book).toHaveProperty("title");
			expect(book).toHaveProperty("author");
			expect(typeof book.title).toBe("string");
			expect(typeof book.author).toBe("string");
		});
	});

	it("book titles and authors are non-empty strings", () => {
		const allBooks = [
			...readingData.currentlyReading,
			...readingData.recentlyFinished,
		];
		allBooks.forEach((book) => {
			expect(book.title.length).toBeGreaterThan(0);
			expect(book.author.length).toBeGreaterThan(0);
		});
	});
});
