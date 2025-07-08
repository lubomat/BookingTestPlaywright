# Booking.com Automated Testing Suite

This repository contains an automated test suite for Booking.com, developed using Playwright and the Page Object Model pattern.

## Overview

- **Purpose:** To provide robust, maintainable, and scalable end-to-end (E2E) and integration tests for the Booking.com web application.
- **Features:**
  - Integration tests for key components (calendar, occupancy, destination input)
  - Full E2E scenarios simulating real user flows
  - Modular Page Object structure for easy maintenance and extension

## Structure

- `/page-objects` — Page Object Model classes for each major component
- `/tests` — Integration and E2E test specifications

## Technologies

- [Playwright](https://playwright.dev/) for browser automation
- TypeScript for type safety and maintainability

## How to Use

1. Clone this repository.
2. Install dependencies: `npm install`
3. Run tests: `npx playwright test`

## Author

Mateusz Lubowiecki
