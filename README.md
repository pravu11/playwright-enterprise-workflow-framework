# Playwright Enterprise Workflow Automation Framework

## Overview

This repository contains a scalable UI automation framework built using Playwright and TypeScript for validating enterprise workflows through reusable page objects, workflow abstractions, and configuration-driven execution.

The framework follows a layered architecture that separates test scenarios, business workflows, and page interactions to improve maintainability, reusability, and scalability.

The automation solution focuses on:

* End-to-end workflow validation
* Dynamic data handling
* Business process automation
* Configuration-driven execution
* Reusable workflow components
* Maintainable test design

---

## Technology Stack

### Automation

* Playwright
* TypeScript
* Node.js

### Framework Design

* Page Object Model (POM)
* Workflow-Based Architecture
* Modular Framework Design
* Reusable Components
* Configuration-Driven Execution

### Tools

* VS Code
* Git
* GitHub
* npm

---

## Framework Architecture

The framework follows a layered architecture:

```text
Tests
  ↓
Flows
  ↓
Pages
  ↓
Playwright
```

### Pages Layer

Responsible for:

* UI interactions
* Element locators
* Reusable page actions

### Flows Layer

Responsible for:

* Business workflow orchestration
* Multi-page operations
* Validation handling
* Reusable process execution

### Tests Layer

Responsible for:

* Scenario definitions
* Smoke testing
* Feature validation
* Regression coverage

---

## Authentication Strategy

The framework uses Playwright's setup project pattern to create and reuse authenticated sessions.

Authentication Flow:

```text
Auth Setup
    ↓
Generate Session State
    ↓
Reuse Session Across Tests
```

Benefits:

* Faster test execution
* Reduced repeated logins
* Consistent authenticated test environment
* Improved test stability

Note:

Session state files are generated during execution and are intentionally excluded from source control.

---

## Key Features

* End-to-end workflow automation
* Page Object Model implementation
* Reusable business flow components
* Dynamic locator handling
* Data-driven execution support
* Configurable environment setup
* Session reuse and authentication management
* Screenshot capture on failures
* HTML reporting
* Parallel execution support
* Headed and headless execution modes
* Scalable framework structure

---

## Project Structure

```text
PLAYWRIGHT-ENTERPRISE-WORKFLOW-FRAMEWORK

├── .github
│   └── workflows
│       └── playwright.yml

├── constants
│   └── appConstants.ts

├── flows
│   ├── manageOrder
│   │   ├── batchDuplication.flow.ts
│   │   ├── executionSet.flow.ts
│   │   └── orderManagement.flow.ts
│   │
│   └── sync
│       └── dataSynchronization.flow.ts

├── pages
│   ├── manageOrder
│   │   ├── BatchDuplicationPage.ts
│   │   ├── ExecutionSetPage.ts
│   │   └── OrderManagementPage.ts
│   │
│   ├── LoginPage.ts
│   └── DataSyncPage.ts

├── tests
│   ├── Features
│   ├── Regression
│   ├── Smoke
│   └── setup

├── utils
│   └── testData.ts

├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Test Coverage

The framework currently includes automation coverage for:

### Workflow Management

* Order lifecycle validation
* Batch processing workflows
* Execution set handling
* Workflow progression validation

### Data Synchronization

* Synchronization workflow validation
* Status verification
* Data consistency checks

### Regression Testing

* End-to-end workflow validation
* Cross-module workflow coverage

### Smoke Testing

* Critical workflow validation
* Application health checks

---

## Reporting

The framework supports:

* HTML Reports
* Screenshot Capture on Failure
* Video Recording on Failure
* Playwright Trace Viewer

Generate reports:

```bash
npx playwright show-report
```

---

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run smoke suite:

```bash
npx playwright test tests/Smoke
```

Run regression suite:

```bash
npx playwright test tests/Regression
```

Run feature tests:

```bash
npx playwright test tests/Features
```

---

## Design Goals

This framework was built with the following goals:

* Maintainability
* Reusability
* Scalability
* Readability
* Workflow abstraction
* Reduced code duplication
* Easier long-term automation maintenance

---

## Learning & Development

This repository represents a self-driven automation initiative focused on framework design, workflow automation, authentication management, and scalable test architecture using Playwright and TypeScript.

The framework continues to evolve through ongoing improvements in automation design, reusability, and workflow validation practices.
