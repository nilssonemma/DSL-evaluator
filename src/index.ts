import { NumberNode } from "./AST/NumberNode";
import { BinaryOperationNode } from "./AST/BinaryOperationNode";

const left = new BinaryOperationNode(
  new NumberNode(10),
  new NumberNode(5),
  "+"
);
const right = new BinaryOperationNode(
  new NumberNode(4),
  new NumberNode(2),
  "-"
);
const expression = new BinaryOperationNode(left, right, "*");

console.log(`${expression.print()} = ${expression.evaluate()}`);
