# APICraft

Welcome to the APICraft Application!

APICraft is a lightweight and intuitive REST API client that allows users to send HTTP requests, configure methods, URLs, headers and more. It also supports secure access through user authentication, request history and variables management.

## Features

- **User authentication** to keep your data secure.
- **Multi-language support** for seamless interaction in the preferred language.
- **Intuitive request interface** with HTTP method selector, URL input, request body editor, headers editor, response viewer and code generation section.
- **Variable management** for reusable values.
- **Request history** to view and re-run previous API calls.

## Technology stack

- **Frontend**: Next.js, TypeScript, CSS, Ant Design, React Hook Form with yup validation, Monaco Editor
- **Authentication**: Firebase
- **Internationalization (i18n)**: next-intl
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

Start the app in development mode:

```sh
npm run dev
```

Build the app in production mode:

```sh
npm run build
```

Run the linter to check the code using `ESLint`:

```sh
npm run lint
```

Automatically format all files using `Prettier`:

```sh
npm run format:fix
```

Set up Husky:

```sh
npm run prepare
```

Run tests with Vitest:

```sh
npm run test
```

Run tests with coverage:

```sh
npm run test:coverage
```
