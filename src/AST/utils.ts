import { ASTNode } from "./ASTNode";
import { BinaryOperationNode } from "./BinaryOperationNode";
import { nonAssociativeOperators, Operator, precedence } from "./Operators";

export function needsParentheses(
  operator: Operator,
  node: ASTNode,
  isRightChild: boolean
): boolean {
  if (!(node instanceof BinaryOperationNode)) {
    return false;
  }

  const currentPrecedence = precedence[operator];
  const nodePrecedence = precedence[node.operator];

  if (nodePrecedence < currentPrecedence) {
    return true;
  }

  // Copilot was used to help with non-associative operators logic
  if (nodePrecedence === currentPrecedence) {
    return isRightChild && nonAssociativeOperators.has(operator);
  }

  return false;
}
