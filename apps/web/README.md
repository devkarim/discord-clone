# Discord Clone - Web

## Overview

This application is a clone of Discord so this is **not intended** for commercial use. This page is for the web app.

Visit the website from [here](https://discord-clone.karimwael.com).

This project is inspired by this [video](https://www.youtube.com/watch?v=ZbX4Ok9YX94) ❤️

## Features

- Login and registration using email and password.
- Create and join servers with customization like changing server name and image.
- Create and join text, voice and video channels in the server.
- Send messages in the text channels.
- Send direct messages to mutuals.
- Customize user's profile by changing your username and profile picture.
- Customize server's roles and permissions.
- Join voice and video channels and talk with friends.
- Send emojis and attachments in the chat.
- MySQL database hosted on PlanetScale.
- Redis database hosted on Upstash.
- Infinite scrolling for messages.
- Responsive design for mobile and desktop.
- Light and dark mode.
- Websockets for real-time communication.
- Manage server's members by kicking and banning them.
- Edit and delete messages.
- Explore featured servers.
- Edit and delete server's channels.
- Add, edit, and remove channel categories.
- Status indicator for online and offline users.
- Invite and join servers using invite links.

## Technologies

- [React.js](https://react.dev)
- [Next.js 13](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Zod](https://zod.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Prisma](https://www.prisma.io)
- [react-hook-form](https://react-hook-form.com)
- [react-toastify](https://fkhadra.github.io/react-toastify)
- [Livekit](https://livekit.io)
- [UploadThing](https://uploadthing.com)

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

These environment variables are required for the web app to work:

```
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=

LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_URL=
```

You can check `.env.example` in this app for more information.

### Start development server

Use this command to start the development servers (Next.js & Express.js) in parallel:

```
pnpm dev
```

## See also

- [Discord Clone Backend](https://github.com/devkarim/discord-clone/tree/main/apps/backend)

## Author

This project is made by [@devkarim](https://github.com/devkarim).

## License

This project is licensed under the [MIT](https://github.com/devkarim/discord-clone/blob/main/LICENSE.md) License - feel free to explore, modify, and share.
