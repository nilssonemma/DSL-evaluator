import { ASTNode } from "./ASTNode";

export class NumberNode implements ASTNode {
  constructor(private _value: number) {}

  get value(): number {
    return this._value;
  }

  evaluate(): number {
    return this.value;
  }
  print(): string {
    return this.value.toString();
  }
}
