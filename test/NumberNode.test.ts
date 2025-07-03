import { NumberNode } from "../src/AST/NumberNode";

// Copilot was used to help write parts of this test suite

describe("NumberNode", () => {
  it("should store the value passed to the constructor", () => {
    const node = new NumberNode(42);
    expect(node.value).toBe(42);
  });

  it("should return the correct value when evaluate is called", () => {
    const node = new NumberNode(42);
    expect(node.evaluate()).toBe(42);
  });

  it("should handle negative numbers correctly", () => {
    const node = new NumberNode(-10);
    expect(node.value).toBe(-10);
    expect(node.evaluate()).toBe(-10);
  });

  it("should handle zero correctly", () => {
    const node = new NumberNode(0);
    expect(node.value).toBe(0);
    expect(node.evaluate()).toBe(0);
  });

  it("should handle floating-point numbers correctly", () => {
    const node = new NumberNode(3.14);
    expect(node.value).toBe(3.14);
    expect(node.evaluate()).toBe(3.14);
  });
});
