# Playwright API Tests

## Overview

This project contains automated API tests implemented using **Playwright** for the Automation Exercise API.
The tests validate API functionality, response status codes, response messages, and important response fields.
Both **positive and negative scenarios** are covered.

## APIs Covered

The following APIs are tested:

* **API 1** – Get All Products List
* **API 5** – POST To Search Product
* **API 6** – POST To Search Product without "search_product" parameter 
* **API 7** – POST To Verify Login with valid details
* **API 10** – POST To Verify Login with invalid details
* **API 11** – POST To Create/Register User Account
* **API 12** – DELETE To Delete User Account

Additionally, using the Products API response, the tests:

* Print products with **price greater than 1000**
* Print products with **user type: Women**
* Print products with **category: Tops**

## Installation

Install project dependencies:

```
npm install
```

## Running the Tests

Run all tests:

```
npx playwright test
```
## Test Execution Order (Important)

Some tests depend on an existing user account.

1. **Run Test 6 first** – This creates a new user account with email and password.
2. **Run Test 4** – This verifies login using the valid credentials created in Test 6.
3. **Run Test 7** – This deletes the created user account.

All other tests **do not require a specific execution order** and can be run independently.

## Requirements

* Node.js
* Playwright

Install Playwright if needed:

```
npx playwright install
```
