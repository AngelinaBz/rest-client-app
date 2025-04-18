# APICraft

Welcome to the APICraft Application!

APICraft is a lightweight and intuitive REST API client that allows users to send HTTP requests, configure methods, URLs, headers and more. It also supports secure access through user authentication and request history management.

## Overview

APICraft is a developer-friendly tool for working with REST APIs. Its core features include:
- User authentication to keep your data secure.
- Multi-language support for seamless interaction in the preferred language.
- Intuitive request interface with HTTP method selector, URL input, request body editor, headers editor, response viewer and code generation section.
- Variable management for reusable values.
- Request history to view and re-run previous API calls.

## Technology stack

- **Frontend**: Next.js, TypeScript, CSS, Ant Design, next-intl, React Hook Form, yup, Monaco Editor
- **Authentication**: Firebase
- **Code Quality**: ESLint, Prettier, Lint Staged, Husky
- **Testing**: Vitest

## Team

- [Angelina Bezik](https://github.com/AngelinaBz)
- [Tatiana Telegina](https://github.com/pambaka)
- [Hasan Ozbakir](https://github.com/hasanozbakir)

## Getting Started

To run our APICraft Application locally, follow these steps:

### Installation

1. Clone the repository

```sh
  git clone https://github.com/AngelinaBz/rest-client-app.git
```

2. Install dependencies

```sh
  npm install
```

3. Add .env file with settings to the project root.

4. Run the app

```sh
  npm run dev
```

## Available scripts

```sh
npm run dev
```

Start the app in development mode

```sh
npm run build
```

Build the app in production mode

```sh
npm run lint
```

Run the linter to check the code using `ESLint`

```sh
npm run format:fix
```

Automatically format all files using `Prettier`

```sh
npm run prepare
```

Set up Husky

```sh
npm run test
```

Run tests with Vitest

```sh
npm run test:coverage
```

Run tests with coverage
