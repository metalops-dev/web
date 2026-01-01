import { describe, expect, it } from "vitest";
import talksData from "../talks.js";

describe("talks.js", () => {
	it("exports an object with upcoming and past arrays", () => {
		expect(talksData).toBeDefined();
		expect(Array.isArray(talksData.upcoming)).toBe(true);
		expect(Array.isArray(talksData.past)).toBe(true);
	});

	it("has a contactUrl property", () => {
		expect(talksData).toHaveProperty("contactUrl");
		expect(typeof talksData.contactUrl).toBe("string");
	});

	it("contactUrl is a valid URL", () => {
		expect(() => new URL(talksData.contactUrl)).not.toThrow();
	});

	it("each talk in upcoming has required properties", () => {
		talksData.upcoming.forEach((talk) => {
			expect(talk).toHaveProperty("title");
			expect(talk).toHaveProperty("date");
			expect(talk).toHaveProperty("event");
			expect(typeof talk.title).toBe("string");
		});
	});

	it("each talk in past has required properties", () => {
		talksData.past.forEach((talk) => {
			expect(talk).toHaveProperty("title");
			expect(talk).toHaveProperty("date");
			expect(talk).toHaveProperty("event");
			expect(typeof talk.title).toBe("string");
		});
	});
});
