import { describe, it, expect } from "vitest";

const configMachine = (from, to) => {
    if (typeof from !== "string")
        throw new Error("Parameter 'from' must be a string");
    if (typeof to !== "string")
        throw new Error("Parameter 'from' must be a string");

    const sameLength = from.length === to.length;
    if (!sameLength) return false;

    const hasSameUniqueLetters = new Set(from).size === new Set(to).size;
    if (!hasSameUniqueLetters) return false;

    const transformations = {};
    for (let index = 0; index < from.length; index++) {
        const fromLetter = from[index];
        const toLetter = to[index];

        const storedLetter = transformations[fromLetter];
        if (storedLetter && storedLetter !== toLetter) return false;

        transformations[fromLetter] = toLetter;
    }

    return true;
};

describe("Can configure Claus machine", () => {
    it("Should be a function", () => {
        expect(typeof configMachine).toBe("function");
    });

    it("Must throw if first parameter provided is not a string", () => {
        expect(() => configMachine()).toThrow();
    });

    it("Must throw if second parameter provided is not a string", () => {
        expect(() => configMachine("a")).toThrow();
    });

    it("Should return a boolean value", () => {
        expect(configMachine("a", "b")).toBeTypeOf("boolean");
    });

    it("Should return 'false' if length of first and second parameters are different", () => {
        expect(configMachine("abc", "de")).toBe(false);
        expect(configMachine("abb", "ab")).toBe(false);
    });

    it("Should return 'false' if parameters provided have different number of unique letters", () => {
        expect(configMachine("abb", "abc")).toBe(false);
        expect(configMachine("ee", "de")).toBe(false);
    });

    it("Should return 'false' if strings has different order of transformation", () => {
        expect(configMachine("xbox", "xxbo")).toBe(false);
    });
});
