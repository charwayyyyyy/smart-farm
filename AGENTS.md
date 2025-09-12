# SmartFarmGH Agent Instructions

This document provides instructions for AI agents working on the SmartFarmGH codebase.

## Project Overview

SmartFarmGH is an AI-powered farmer education platform with a chatbot and SMS reminders. It is a monorepo with the following packages:

- `frontend`: A Next.js web application.
- `backend`: A Node.js (Express) API server.
- `chatbot`: An AI chatbot implementation.
- `sms-engine`: An SMS calendar and reminder system.

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v7+ for workspace support)
- PostgreSQL
- API keys for OpenAI and Twilio

### Installation

The project uses npm workspaces. To install all dependencies, run the following command from the root of the project:

```bash
npm install
```

### Running the Application

To run all services concurrently, use the following command from the root of the project:

```bash
npm run dev
```

This will start the following services:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **Chatbot**: (runs as a service, no public port)
- **SMS Engine**: (runs as a service, no public port)

### Environment Variables

Each package that requires environment variables (`backend`, `chatbot`, `sms-engine`) has an `.env.example` file. Create a `.env` file in each of these directories and add the required API keys and database connection strings.

## Testing

To run the tests for a specific package, navigate to the package directory and run the `test` script:

```bash
cd packages/<package-name>
npm test
```

For example, to run the backend tests:

```bash
cd backend
npm test
```

## Coding Conventions

- **JavaScript**: Follow the Airbnb JavaScript Style Guide.
- **React**: Follow the official React best practices.
- **Node.js**: Follow the official Node.js best practices.

## Submitting Changes

1.  Create a feature branch.
2.  Make your changes.
3.  Ensure all tests pass.
4.  Update the `README.md` if necessary.
5.  Submit a pull request with a descriptive title and summary.
