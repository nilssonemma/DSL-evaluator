export type Operator = "+" | "-" | "*" | "/" | "<" | ">" | "=";

export function getOperationFunction(
  operator: Operator
): (a: number, b: number) => number | boolean {
  switch (operator) {
    case "+":
      return (a, b) => a + b;
    case "-":
      return (a, b) => a - b;
    case "*":
      return (a, b) => a * b;
    case "/":
      return (a, b) => {
        if (b === 0) {
          throw new Error("Division by zero not allowed");
        }
        return a / b;
      };
    case "<":
      return (a, b) => a < b;
    case ">":
      return (a, b) => a > b;
    case "=":
      return (a, b) => a === b;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

export const precedence: Record<Operator, number> = {
  "=": 0,
  "<": 1,
  ">": 1,
  "+": 2,
  "-": 2,
  "*": 3,
  "/": 3,
};
// Copilot was used to help with non associative operators
export const nonAssociativeOperators = new Set<Operator>(["-", "/"]);
