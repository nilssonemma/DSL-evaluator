import { ASTNode } from "./ASTNode";
import { Operator, getOperationFunction } from "./Operators";
import { needsParentheses } from "./utils";

export class BinaryOperationNode implements ASTNode {
  constructor(
    private left: ASTNode,
    private right: ASTNode,
    private _operator: Operator
  ) {}

  get operator(): Operator {
    return this._operator;
  }
  evaluate(): number | boolean {
    const leftValue = this.left.evaluate();
    const rightValue = this.right.evaluate();
    const operation = getOperationFunction(this.operator);

    if (typeof leftValue !== "number" || typeof rightValue !== "number") {
      throw new Error("Nested comparison operations are not supported");
    }

    return operation(leftValue, rightValue);
  }

  print(): string {
    const leftPrint = needsParentheses(this.operator, this.left, false)
      ? `(${this.left.print()})`
      : this.left.print();
    const rightPrint = needsParentheses(this.operator, this.right, true)
      ? `(${this.right.print()})`
      : this.right.print();

    return `${leftPrint} ${this.operator} ${rightPrint}`;
  }
}
