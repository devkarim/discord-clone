# express-typescript-prisma-template

## Overview

This is a Node.js backend template / boilerplate using TypeScript, Express.js 5, Prisma ORM, and Passport.js. with type-safety & module-alias.

## Dependencies

- [TypeScript](https://www.typescriptlang.org)
- [Express.js](https://expressjs.com)
- [Prisma ORM](https://www.prisma.io)
- [Passport.js](https://www.passportjs.org)
- [Zod](https://zod.dev)
- [zod-express-validator](https://www.npmjs.com/package/zod-express-validator)
- [module-alias](https://www.npmjs.com/package/module-alias)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Prerequisites

#### - Node v18.17.1

### Cloning this repo

Clone the repo and navigate to it:

- `git clone https://github.com/devkarim/express-typescript-prisma-template.git`
- `cd express-typescript-prisma-template`

### Install required packages

Use one of the following commands to install the packages:

- `npm i`
- `yarn`
- `pnpm i`

### Setup .env file

These environment variables are required for the app to work:

```
NODE_ENV=

PORT=

DATABASE_URL=

SESSION_SECRET=
```

You can check [.env.example](https://github.com/devkarim/express-typescript-prisma-template/blob/main/.env.example) for more information.

### Push changes to database and generate PrismaClient

Use this to push and generate PrismaClient:

`npx prisma db push`

### Start development server

Use one of the following commands to start the development server:

- `npm run dev`
- `yarn dev`
- `pnpm dev`

### Build server and run

Use one of the following commands to build & run the server:

- `npm run start`
- `yarn start`
- `pnpm start`

## Author

This template is made by [@devkarim](https://github.com/devkarim).

## License

This project is licensed under the [MIT](https://github.com/devkarim/express-typescript-prisma-template/blob/main/LICENSE.md) License - feel free to explore, modify, and share.
