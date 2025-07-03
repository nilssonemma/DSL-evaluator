export interface ASTNode {
  evaluate(): number | boolean;
  print(): string;
}
