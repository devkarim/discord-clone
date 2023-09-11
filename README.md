# Discord Clone

## Overview

A discord clone. This web application is a clone of Discord so this is **not intended** for commercial use.

Visit the website from [here](https://discord-clone.karimwael.com).

This project is inspired by this [video](https://www.youtube.com/watch?v=ZbX4Ok9YX94) ❤️

## Features

- To be added.

## Technologies

- [React.js](https://react.dev)
- [Next.js 13](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Express.js](https://expressjs.com)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://www.prisma.io)
- [PlanetScale](https://planetscale.com)
- [react-hook-form](https://react-hook-form.com)
- [react-toastify](https://fkhadra.github.io/react-toastify)

## Prerequisites

#### - Node v18.17.1

### Cloning this repo

Clone the monorepo and navigate to it:

- `git clone https://github.com/devkarim/discord-clone.git`
- `cd discord-clone`

### Install required packages

This monorepo uses `pnpm` as a package manager, use the following to install:

```
pnpm i
```

### Setup .env file

These environment variables are required for the app to work:

```
# for backend workspace
NODE_ENV=
PORT=
SESSION_SECRET=
REDIS_DATABASE_URL=

# for database package
DATABASE_URL=
```

You can check `.env.example` in each workspace/package for more information.

### Start development server

Use this command to start the development servers (Next.js & Express.js) in parallel:

```
pnpm dev
```

## Author

This project is made by [@devkarim](https://github.com/devkarim).

## License

This project is licensed under the [MIT](https://github.com/devkarim/discord-clone/blob/main/LICENSE.md) License - feel free to explore, modify, and share.
