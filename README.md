# Helpdesk

A small support desk app in React. Support staff see tickets from customers,
open one, change its status and reply.

CmdRound uses this repo as a starting point for coding assessments. Your task
is in the ticket you were given, not in this file.

## Run it

```
npm install
npm run dev     # http://localhost:5173
npm test        # vitest, runs once
```

Needs Node 18.18 or newer.

## What's in it

- `src/App.jsx`: the layout and the routes.
- `src/pages/`: one file per page. Tickets, one ticket, customers, not found.
- `src/components/`: small shared pieces.
- `src/data/api.js`: a pretend backend. Every call is async and returns a copy.
  It keeps its data in memory, so a reload starts over from `src/data/seed.js`.
- `test/`: tests for the data layer and the pages.

There is no real server or database. Treat `src/data/api.js` as the backend.
