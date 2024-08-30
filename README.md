# MB-Haaste

**Simple full stack application for testing people applying for Mad Booster**

Application manages list of customers and contacts. `Express` server provides records over `REST API` for frontend written with `react`, bootstrapped with `vite`. `Redux` is used for state management and styles with good ol' `bootstrap`

Project is meant to measure applicant's skills of reading and writing code with a similar environment used at Mad Booster.

---
## The Task

Explore the project and figure out what all the things it does.

Project is filled with comments starting with `MB-TODO`. These comments are instuctions for improving the existing code and adding functionalities to the project. Search for `MB-TODO` and complete these little tasks as you see fit.

Frontend also has `<MBTodo />` component which gives a visible representation of possible tasks.

> [!IMPORTANT]
> The code is not perfect! It contains common flaws and imperfections so do whatever you want with the code! Modify, remove, lint, expand, etc. to improve it 🚀.

We want to see how would you think and solve these kinds of problems. It is all up to you how you want to showcase your understanding of `javascript`, `react`, `REST APIs` and but also a skill of interpreting someone else's code.

Whenever you are ready let us know by sending the modified code e.g. via Github or what ever methods suits you and let's have a chat.

You can hit us up at `kehitys@madbooster.com`.

## Prerequisites

[Node.js v18](https://nodejs.org/en/download/current)

---

## Setup

```bash
# Fork or clone the project
git clone git@github.com:MadBooster/mb-haaste.git
cd mb-haaste
npm install
# On separate windows/tabs
# Starts server with `nodemon` on http://localhost:3100
npm run dev --workspace backend
# Starts react app with `vite` on http://localhost:3000
npm run dev --workspace frontend

# Search project for `MB-TODO` comments and start exploring
```
---

## Structure

| Folder    | File                  | Details                                                                                         |
| --------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| /backend  |                       |                                                                                                 |
| ./app/    | app.js                | Configure Express server middlewares/routes/error handlers/etc                                  |
| ./app/    | config.js             | Configurations from env                                                                         |
| ./app/    | errorHandler.js       | Catch and send errors to client                                                                 |
| ./app/    | index.js              | Starts express server                                                                           |
| ./app/    | models.js             | Initializes simple JSON ORM for `customers/contacts/customerContacts`                           |
| ./app/    | routes.js             | CRUD-routes                                                                                     |
| ./        | database.json         | App "database". NOTE: Created on after initial startup                                          |
| ./        | initial-database.json | Backup database                                                                                 |
| /frontend |                       |                                                                                                 |
| ./src/    | api.jsx               | Helper to make requests using `window.fetch`                                                    |
| ./src/    | App.jsx               | Application router setup                                                                        |
| ./src/    | *Slices.jsx           | Redux state helpers [(redux-toolkit)](https://redux-toolkit.js.org/api/createAsyncThunk)        |
| ./src/    | *Table.jsx            | Table components                                                                                |
| ./src/    | ErrorPage.jsx         | Fallback route                                                                                  |
| ./src/    | main.jsx              | Initialize react                                                                                |
| ./src/    | MBTodo.jsx            | Component to help you along your journey. Add `isCompleted` prop to hide                        |
| ./src/    | Pages.jsx             | Views                                                                                           |
| ./src/    | store.jsx             | Redux store   [(Redux Toolkit Quick Start)](https://redux-toolkit.js.org/tutorials/quick-start) |
| ./        | vite.config.js        | Vite configuration                                                                              |

---

*ps. If you have suggestions how to improve this project, leave a pull request*