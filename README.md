# Setup the project

## Required

- NodeJS 18+
- npm 10+

## Setup

- `git clone https://github.com/bhargabdhungel/profitpulse.git`
- `cd profitpulse`
- check the `.env.example` file and create a new file called `.env`
- fill in the required variables in the `.env` file ( postgres database string )
- `npm i -g pnpm`
- `pnpm i`
- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm run dev`

There you go, you're ready to go!

## The Tech Stack

- nextjs
- tailwind
- shadcn ui
- t3-trpc
- typescript
- react-query
- recoil
- prisma
- postgres
