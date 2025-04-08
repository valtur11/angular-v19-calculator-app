# CalculatorApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Getting Started Guide

```bash
npm install
```

### Development server

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

### Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
npm test
```

## How the app works

## How the App Works

### Structure Decisions

1. **Component-Based Design**:

   - The app is divided into reusable Angular components:
     - `CalculatorComponent`: Manages the main calculator logic and state.
     - `CalculatorDisplayComponent`: Displays the current and previous expressions.
     - `CalculatorButtonsComponent`: Handles user interactions with calculator buttons.
     - `WrapperComponent`: Provides a layout wrapper for the application.

2. **State Management and operations**:

   - Signals are used to manage the state of the calculator, such as `currentExpression`, `numberA`, and `numberB`.
   - `CalculatorService` is responsible for performing calculations and formatting operations.

3. **Modular Approach**:
   - The app is structured to separate concerns, with services handling logic and components focusing on UI.

---

### Assumptions Made

1. **Basic Calculator Functionality**:

   - The app assumes users need basic arithmetic operations (addition, subtraction, multiplication, division) and common unary operations (square, square root, reciprocal, negate). The functionality is inspired by Windows Calculator App, the standard one.

2. **Error Handling**:

   - Errors like division by zero or invalid operations are displayed to the user in the calculator display.

3. **No Advanced Features**:

   - Features like history tracking, scientific functions, or keyboard input are not included but can be added in the future.

4. **User-Friendly Design**:
   - The app assumes users will interact with buttons only, and input validation ensures no invalid states.

---

### How the Algorithms Work

1. **Unary Operations**:

   - Operations like square, square root, reciprocal, and negate are applied to a single number (`numberA` or `numberB`).
   - Example: `Square(4)` → `16`.

2. **Binary Operations**:

   - Operations like addition, subtraction, multiplication, and division involve two numbers (`numberA` and `numberB`).
   - Example: `5 + 3` → `8`.

3. **Percent Edge Case**:

   - The percent operation behaves differently depending on the context:
     - Unary: `100 x 15%` → `0.15`.
     - Binary: `50 + 10%` → `55`.

4. **Expression Evaluation**:
   - The `evaluateExpression` method calculates the result of the current operation and updates the state.

---

### Edge Cases

1. **Division by Zero**:

   - Throws an error: "Cannot divide by zero."

2. **Square Root of Negative Numbers**:

   - Throws an error: "Cannot take square root of negative number."

3. **Multiple Decimals**:

   - Prevents adding multiple decimal points in a number.

4. **Empty or Placeholder Values**:

   - Handles cases where `numberB` is a placeholder or null.

5. **Chained Operations**:
   - Supports chaining operations by updating `numberA` with the result of the previous calculation.

## Future Considerations

1. **Internal Use**:

   - As the app is used internally by employees, optimizing it to work without JavaScript is unnecessary.

2. **Accessibility**:

   - To ensure equal opportunities for diverse users, optimizing the app for accessibility is important.

3. **High Test Coverage**:

   - Since the app deals with numbers and potentially finances, maintaining high unit test coverage is critical.
   - **Current State**: Basic unit tests are implemented, but additional tests are needed to cover edge cases and complex scenarios.

4. **Simplified Features**:

   - Memory for calculation history is not currently needed but can be added in the future.
   - Keyboard input is not implemented yet but can be easily added if required.

5. **State Management**:

   - In future cases, services for advanced state management may be introduced
