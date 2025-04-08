# CalculatorApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.6.

## Getting Started Guide

```bash
npm install
```

### Development server

To start a local development server, run:

```bash
ng serve
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
ng test
```

## How the app works

### Structure decisions

### Assumptions made

As the potential user is an employee of the firm, he uses this app internally. Then probably optimizing the app to work without JavaScript is unnecessary. To allow equal opportunities for diverse people, optimizing for accessibility is important. As the app is connected with numbers and potentially finances, it should have high code unit test coverage.

Memory not needed for calc history and etc.
In future cases, services for state management.
No keyboard input, but will be easy to add.

### How the algorithms work

### Edge cases

Percentage - example 100 + 10% = 100 + (10% \* 100)
