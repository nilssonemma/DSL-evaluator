# DSL Expression Evaluator

This project implements a simple domain-specific language (DSL) for evaluating mathematical expressions using an abstract syntax tree (AST).

## Implementation Approach

1. **Understand the requirements**

- Read and understood the project description.
- Decided to start with the core requirements and add bonus features afterward.

2. **Project Setup**

- Created the initial file structure with the ASTNode interface and placeholder classes for NumberNode and BinaryOperationNode.

3. **Implement Core Features**

- Wrote simple unit tests for NumberNode and BinaryOperationNode.
- Implemented evaluate() logic with basic error handling (division by zero, unsupported operators).
- Wrote additional tests for nested expressions.

4. **Add print bonus feature**

- Decided to implement a print() method to output expressions with parentheses.
- Started with simple implementation (parentheses around all binary operations).
- Gradually refined by introducing operator precedence and handling non-associative operators (-, /).
- Verified with extensive tests, including edge cases.

5. **Add comparison operation bonus feature**

- Decided to add support for comparison operations.
- Started updating interfaces and return types to support boolean
- Added error handling for unsupported nested comparison operators.
- Extended Operators.ts file with support for comparison operations (<,>, =)
- Wrote additional tests for comparison operations


6. **Code cleanup and Documentation**

- Extracted all operator related logic (type, precedence, evaluation function) into a separate Operators.ts file.
  - Ensured new operators can be added by modifying only the operator utility file.
  - Keeping AST nodes generic and reusable.
- Clean up code
- Wrote README and added project instructions.

## Assumptions

* All expressions are assumed to be syntactically valid.
* Precedence and associativity follow standard math rules.
* Nested comparison operators are not supported.


## Getting Started

### Installation

1. Clone this repository
```bash
git clone https://github.com/nilssonemma/DSL-evaluator.git
```
2. Install dependencies:

```bash
npm install
```

### Run the Project

To evaluate an expression:

```bash
npm run start
```

This will execute a sample expression defined in `src/index.ts`. You can change this expression to try different inputs.

### Run Tests

```bash
npm run test
```

Runs the Jest test suite to verify correctness and handle edge cases.

## AI Usage Disclosure

Some parts of this project were assisted by Copilot:

* Extending test files with nested expressions and edge cases. Generating tests for comparison operations.
* Help with the non-associative operations logic
* Generating this README structure 

## Example

This expression:

```ts
const left = new BinaryOperationNode(new NumberNode(10), new NumberNode(5), "+");
const right = new BinaryOperationNode(new NumberNode(4), new NumberNode(2), "-");
const expression = new BinaryOperationNode(left, right, "*");

console.log(expression.print());    // "10 + 5 * (4 - 2)"
console.log(expression.evaluate()); // 30