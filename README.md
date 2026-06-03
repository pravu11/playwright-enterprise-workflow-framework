# Enterprise Workflow Automation Framework

## Project Overview

This project is an end-to-end automation framework developed using Playwright and TypeScript for validating complex enterprise business workflows related to order processing, synchronization, execution management, and dynamic operational flows.

The framework automates highly dynamic workflows involving:
- Application order management
- Material quantity handling
- Duplicate panel creation
- Trial execution set management
- Validation error correction
- Order synchronization workflows
- Dynamic runtime validations

The automation solution was designed to improve:
- Regression coverage
- Execution reliability
- Workflow validation accuracy
- Maintainability of automated tests
- Scalability for changing business requirements

The framework handles complex business scenarios involving:
- Runtime-generated UI elements
- Dynamic data-driven workflows
- Conditional execution paths
- Frequently changing customer requirements
- Multi-step order processing flows

---

# Tech Stack

## Automation
- Playwright
- TypeScript
- Node.js

## Framework Design
- Page Object Model (POM)
- Modular Framework Architecture
- Data-Driven Testing
- Reusable Workflow Components

## Tools
- VS Code
- Git
- npm

---

# Framework Features

- End-to-end workflow automation
- Dynamic locator handling
- Session reuse and authentication management
- Reusable page object architecture
- Configurable environment setup
- Runtime validation handling
- Dynamic test data support
- Error handling and retry support
- Parallel execution support
- Headed and headless execution modes

---

# Framework Architecture

The framework follows a modular architecture with clear separation of concerns:

- `pages/` handles UI interactions using the Page Object Model
- `flows/` contains reusable business workflow implementations
- `utils/` provides reusable utility methods and helpers
- `constants/` stores static data and reusable constants
- `tests/` contains test scenarios and execution suites

This structure improves:
- Reusability
- Maintainability
- Scalability
- Readability of test workflows

---

# Automated Modules

## Application Order Management
- Order processing validation
- Order synchronization handling
- Dynamic order status verification

## Material Details Handling
- Dynamic material quantity updates
- Variable material data handling
- Runtime-generated material validations

## Duplicate Panel Management
- Duplicate panel creation
- Dynamic popup handling
- Panel selection workflows

## Trial Execution Set Management
- Trial panel creation
- Execution set workflows
- Dynamic panel assignments

## Validation Error Handling
- Invalid field correction
- Dynamic error identification
- Runtime form validation handling

---

# Project Structure

```bash
AWETAAUTOMATION/
│
├── .github/                 # CI/CD workflows and GitHub configurations
├── constants/               # Application constants and static data
├── flows/                   # Reusable business workflow implementations
├── node_modules/
├── pages/                   # Page Object Model classes
├── playwright-report/       # Generated Playwright HTML reports
├── test-results/            # Screenshots, videos, traces, execution artifacts
├── tests/                   # Test specifications and test suites
├── utils/                   # Reusable helper methods and utilities
│
├── .gitignore
├── .hintrc
├── package-lock.json
├── package.json
├── playwright.config.ts     # Playwright configuration
├── storageState.json        # Saved authentication/session state
│
└── README.md

---

# Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/smoke/fullFlow.spec.ts
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

---

# Reporting

The framework supports:
- HTML Reports
- Playwright Trace Viewer
- Screenshot capture on failure
- Video recording for failed executions

Open HTML report:

```bash
npx playwright show-report
```
