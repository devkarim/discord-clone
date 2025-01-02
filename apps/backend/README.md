# Discord Clone - Backend

## Overview

This application is a clone of Discord so this is **not intended** for commercial use. This page is for the backend app.

Visit the website from [here](https://discord-clone.karimwael.com).

This project is inspired by this [video](https://www.youtube.com/watch?v=ZbX4Ok9YX94) ❤️

## Features

- Login and registration using email and password using Passport.js.
- Backend API for the web app using Express.js.
- Create and join servers with customization like changing server name and image.
- Create and join text, voice, and video channels in the server.
- Send messages in the text channels.
- Send direct messages to mutuals.
- Customize the user's profile by changing your username and profile picture.
- Customize the server's roles and permissions.
- Join voice and video channels and talk with friends using LiveKit.
- Send emojis and attachments in the chat.
- PostgreSQL hosted on [neon.tech](https://neon.tech).
- Redis database hosted on Upstash.
- Infinite scrolling for messages.
- Responsive design for mobile and desktop.
- Light and dark mode using shadcn/ui.
- Websockets for real-time communication.
- Manage server members by kicking and banning them.
- Edit and delete messages.
- Explore featured servers.
- Edit and delete the server's channels.
- Add, edit, and remove channel categories.
- Status indicator for online and offline users.
- Invite and join servers using invite links.

## Technologies

- [TypeScript](https://www.typescriptlang.org)
- [Express.js](https://expressjs.com)
- [Zod](https://zod.dev)
- [Prisma](https://www.prisma.io)
- [PlanetScale](https://planetscale.com)
- [Upstash](https://upstash.com)
- [Redis](https://redis.io)
- [Socket.IO](https://socket.io)
- [Passportjs](http://www.passportjs.org)

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

These environment variables are required for the backend to work:

```
NODE_ENV=
PORT=
SESSION_SECRET=
REDIS_DATABASE_URL=
```

You can check `.env.example` in this app for more information.

### Start development server

Use this command to start the development servers (Next.js & Express.js) in parallel:

```
pnpm dev
```

## See also

- [Discord Clone Web](https://github.com/devkarim/discord-clone/tree/main/apps/web)

## Author

This project is made by [@devkarim](https://github.com/devkarim).

## License

This project is licensed under the [MIT](https://github.com/devkarim/discord-clone/blob/main/LICENSE.md) License - feel free to explore, modify, and share.
