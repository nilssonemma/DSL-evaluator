import { BinaryOperationNode } from "../src/AST/BinaryOperationNode";
import { Operator } from "../src/AST/Operators";
import { NumberNode } from "../src/AST/NumberNode";

// Copilot was used to help write large parts of this test suite

describe("BinaryOperationNode", () => {
  describe("Basic arithmetic operations", () => {
    it("should correctly print and evaluate addition", () => {
      const left = new NumberNode(5);
      const right = new NumberNode(3);
      const expression = new BinaryOperationNode(left, right, "+");

      expect(expression.print()).toBe("5 + 3");
      expect(expression.evaluate()).toBe(8);
    });

    it("should correctly print and evaluate subtraction", () => {
      const left = new NumberNode(10);
      const right = new NumberNode(4);
      const expression = new BinaryOperationNode(left, right, "-");

      expect(expression.print()).toBe("10 - 4");
      expect(expression.evaluate()).toBe(6);
    });

    it("should correctly print and evaluate multiplication", () => {
      const left = new NumberNode(7);
      const right = new NumberNode(6);
      const expression = new BinaryOperationNode(left, right, "*");

      expect(expression.print()).toBe("7 * 6");
      expect(expression.evaluate()).toBe(42);
    });

    it("should correctly print and evaluate division", () => {
      const left = new NumberNode(20);
      const right = new NumberNode(4);
      const expression = new BinaryOperationNode(left, right, "/");

      expect(expression.print()).toBe("20 / 4");
      expect(expression.evaluate()).toBe(5);
    });

    it("should throw an error when dividing by zero", () => {
      const left = new NumberNode(10);
      const right = new NumberNode(0);
      const expression = new BinaryOperationNode(left, right, "/");

      expect(expression.print()).toBe("10 / 0");
      expect(() => expression.evaluate()).toThrow("Division by zero");
    });
    it("should throw an error on unsupported operations", () => {
      const left = new NumberNode(10);
      const right = new NumberNode(0);
      const expression = new BinaryOperationNode(left, right, "^" as Operator);

      expect(expression.print()).toBe("10 ^ 0");
      expect(() => expression.evaluate()).toThrow("Unsupported operator: ^");
    });

    it("should correctly print and evaluate nested addition and multiplication", () => {
      const left = new BinaryOperationNode(
        new NumberNode(2),
        new NumberNode(3),
        "+"
      );
      const right = new NumberNode(4);
      const expression = new BinaryOperationNode(left, right, "*");

      expect(expression.print()).toBe("(2 + 3) * 4");
      expect(expression.evaluate()).toBe(20);
    });

    it("should correctly print and evaluate deeply nested addition and multiplication", () => {
      const left = new BinaryOperationNode(
        new BinaryOperationNode(new NumberNode(5), new NumberNode(3), "*"),
        new NumberNode(3),
        "+"
      );
      const right = new BinaryOperationNode(
        new BinaryOperationNode(new NumberNode(10), new NumberNode(2), "/"),
        new BinaryOperationNode(new NumberNode(5), new NumberNode(2), "-"),
        "*"
      );
      const expression = new BinaryOperationNode(left, right, "*");

      expect(expression.print()).toBe("(5 * 3 + 3) * 10 / 2 * (5 - 2)");
      expect(expression.evaluate()).toBe(270);
    });

    it("should add parentheses around addition under multiplication", () => {
      const inner = new BinaryOperationNode(
        new NumberNode(3),
        new NumberNode(4),
        "+"
      );
      const expression = new BinaryOperationNode(new NumberNode(2), inner, "*");

      expect(expression.print()).toBe("2 * (3 + 4)");
      expect(expression.evaluate()).toBe(14);
    });

    it("should correctly print and evaluate nested subtraction and division", () => {
      const left = new BinaryOperationNode(
        new NumberNode(10),
        new NumberNode(2),
        "-"
      );
      const right = new NumberNode(4);
      const expression = new BinaryOperationNode(left, right, "/");

      expect(expression.print()).toBe("(10 - 2) / 4");
      expect(expression.evaluate()).toBe(2);
    });

    it("should correctly print and evaluate deeply nested expressions", () => {
      const innerleft = new BinaryOperationNode(
        new NumberNode(5),
        new NumberNode(3),
        "+"
      );
      const innerRightexpression = new BinaryOperationNode(
        new NumberNode(8),
        new NumberNode(2),
        "-"
      );
      const outerexpression = new BinaryOperationNode(
        innerleft,
        innerRightexpression,
        "*"
      );

      expect(outerexpression.print()).toBe("(5 + 3) * (8 - 2)");
      expect(outerexpression.evaluate()).toBe(48);
    });

    it("should throw an error for nested division by zero", () => {
      const left = new BinaryOperationNode(
        new NumberNode(10),
        new NumberNode(5),
        "+"
      );
      const right = new BinaryOperationNode(
        new NumberNode(10),
        new NumberNode(10),
        "-"
      );
      const expression = new BinaryOperationNode(left, right, "/");

      expect(expression.print()).toBe("(10 + 5) / (10 - 10)");
      expect(() => expression.evaluate()).toThrow("Division by zero");
    });
    it("should correctly print and evaluate left-associative subtraction without extra parentheses", () => {
      const left = new BinaryOperationNode(
        new NumberNode(10),
        new NumberNode(2),
        "-"
      );
      const right = new NumberNode(3);
      const expression = new BinaryOperationNode(left, right, "-");

      expect(expression.print()).toBe("10 - 2 - 3");
      expect(expression.evaluate()).toBe(5);
    });
    // Copilot was used to find this edge case and add support for it
    it("should add parentheses around right operand for non-associative subtraction to preserve order", () => {
      const left = new NumberNode(10);
      const right = new BinaryOperationNode(
        new NumberNode(3),
        new NumberNode(1),
        "-"
      );
      const expression = new BinaryOperationNode(left, right, "-");

      expect(expression.print()).toBe("10 - (3 - 1)");
      expect(expression.evaluate()).toBe(8);
    });
    it("should not add parentheses when not needed", () => {
      const left = new BinaryOperationNode(
        new NumberNode(2),
        new NumberNode(3),
        "+"
      );
      const right = new BinaryOperationNode(
        new NumberNode(4),
        new NumberNode(5),
        "*"
      );
      const expression = new BinaryOperationNode(left, right, "-");

      expect(expression.print()).toBe("2 + 3 - 4 * 5");
      expect(expression.evaluate()).toBe(-15);
    });

    it("should correctly handle negative numbers in addition", () => {
      const left = new NumberNode(-3);
      const right = new NumberNode(5);
      const expression = new BinaryOperationNode(left, right, "+");

      expect(expression.print()).toBe("-3 + 5");
      expect(expression.evaluate()).toBe(2);
    });
    it("should correctly handle negative numbers in subtraction", () => {
      const left = new NumberNode(-3);
      const right = new NumberNode(5);
      const expression = new BinaryOperationNode(left, right, "-");

      expect(expression.print()).toBe("-3 - 5");
      expect(expression.evaluate()).toBe(-8);
    });

    it("should correctly handle negative numbers in multiplication", () => {
      const left = new NumberNode(-3);
      const right = new NumberNode(5);
      const expression = new BinaryOperationNode(left, right, "*");

      expect(expression.print()).toBe("-3 * 5");
      expect(expression.evaluate()).toBe(-15);
    });

    it("should correctly handle negative numbers in division", () => {
      const left = new NumberNode(-10);
      const right = new NumberNode(2);
      const expression = new BinaryOperationNode(left, right, "/");

      expect(expression.print()).toBe("-10 / 2");
      expect(expression.evaluate()).toBe(-5);
    });
    it("should correctly handle division resulting in a decimal value", () => {
      const left = new NumberNode(7);
      const right = new NumberNode(2);
      const expression = new BinaryOperationNode(left, right, "/");

      expect(expression.print()).toBe("7 / 2");
      expect(expression.evaluate()).toBe(3.5);
    });
  });

  describe("Comparison operations", () => {
    it("should correctly print and evaluate > operation", () => {
      const left = new NumberNode(5);
      const right = new NumberNode(3);
      const expression = new BinaryOperationNode(left, right, ">");

      expect(expression.print()).toBe("5 > 3");
      expect(expression.evaluate()).toBe(true);
    });

    it("should correctly print and evaluate less than operation", () => {
      const left = new NumberNode(2);
      const right = new NumberNode(4);
      const expression = new BinaryOperationNode(left, right, "<");

      expect(expression.print()).toBe("2 < 4");
      expect(expression.evaluate()).toBe(true);
    });

    it("should correctly print and evaluate equality operation", () => {
      const left = new NumberNode(7);
      const right = new NumberNode(7);
      const expression = new BinaryOperationNode(left, right, "=");

      expect(expression.print()).toBe("7 = 7");
      expect(expression.evaluate()).toBe(true);
    });

    it("should correctly print and evaluate inequality for greater than", () => {
      const left = new NumberNode(3);
      const right = new NumberNode(5);
      const expression = new BinaryOperationNode(left, right, ">");

      expect(expression.print()).toBe("3 > 5");
      expect(expression.evaluate()).toBe(false);
    });

    it("should correctly print and evaluate inequality for less than", () => {
      const left = new NumberNode(6);
      const right = new NumberNode(4);
      const expression = new BinaryOperationNode(left, right, "<");

      expect(expression.print()).toBe("6 < 4");
      expect(expression.evaluate()).toBe(false);
    });

    it("should correctly print and evaluate inequality for equality", () => {
      const left = new NumberNode(8);
      const right = new NumberNode(10);
      const expression = new BinaryOperationNode(left, right, "=");

      expect(expression.print()).toBe("8 = 10");
      expect(expression.evaluate()).toBe(false);
    });

    it("should throw error on nested comparison operations", () => {
      const left = new BinaryOperationNode(
        new NumberNode(5),
        new NumberNode(3),
        ">"
      );
      const right = new BinaryOperationNode(
        new NumberNode(2),
        new NumberNode(4),
        "<"
      );
      const expression = new BinaryOperationNode(left, right, "=");

      expect(expression.print()).toBe("5 > 3 = 2 < 4");
      expect(() => expression.evaluate()).toThrow(
        "Nested comparison operations are not supported"
      );
    });

    it("should throw an error for unsupported comparison operator", () => {
      const left = new NumberNode(10);
      const right = new NumberNode(5);
      const expression = new BinaryOperationNode(left, right, "!=" as Operator);

      expect(expression.print()).toBe("10 != 5");
      expect(() => expression.evaluate()).toThrow("Unsupported operator: !=");
    });
    it("should compare arithmetic operations", () => {
      const left = new BinaryOperationNode(
        new NumberNode(2),
        new NumberNode(3),
        "+"
      );
      const right = new BinaryOperationNode(
        new NumberNode(4),
        new NumberNode(5),
        "*"
      );
      const expression = new BinaryOperationNode(left, right, ">");

      expect(expression.print()).toBe("2 + 3 > 4 * 5");
      expect(expression.evaluate()).toBe(false);
    });
    it("should correctly handle comparison between negative numbers", () => {
      const left = new NumberNode(-5);
      const right = new NumberNode(-3);
      const expression = new BinaryOperationNode(left, right, ">");

      expect(expression.print()).toBe("-5 > -3");
      expect(expression.evaluate()).toBe(false);
    });
    it("should correctly handle comparison between zero and negative numbers", () => {
      const left = new NumberNode(0);
      const right = new NumberNode(-3);
      const expression = new BinaryOperationNode(left, right, ">");

      expect(expression.print()).toBe("0 > -3");
      expect(expression.evaluate()).toBe(true);
    });
  });
});
