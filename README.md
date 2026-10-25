# Tech.Care — Patient Dashboard

Coalition Technologies Frontend Developer skills assessment. A single-page
Patients dashboard showing Jessica Taylor's data from the Coalition
Technologies Patient Data API, built with React, Vite, CSS and Chart.js.

## How to run locally

This is a Vite application. **`index.html` cannot be opened directly from the
filesystem** (double-clicking it shows a blank page, because browsers block
JavaScript modules loaded from `file://`). Run it through Vite instead:

1. Install [Node.js](https://nodejs.org/) version 20.19+ or 22.12+ if needed.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

4. Open `.env.local` and set `COALITION_API_USERNAME` and
   `COALITION_API_PASSWORD` to the Basic Auth **username** and **password**
   listed in the official assessment API documentation, under the "Get All
   Patients" request's Authorization section:
   <https://documenter.getpostman.com/view/11861104/2sA35G42ve>

   These are server-side variables, read only by the API proxy (see below).
   `.env.local` is git-ignored and must never be committed.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL that Vite prints in the terminal (for example
   `http://localhost:5174/`; Vite picks the next free port if that one is busy).

To check the production build instead, run `npm run build` followed by
`npm run preview`, and open the URL it prints.

## API security: server-side proxy

The browser never talks to the Coalition Technologies API directly and never
holds its credentials:

```
browser ──GET /api/patients──▶ api/patients.js ──Basic Auth──▶ Patient Data API
         (no credentials)      (credentials from server env)
```

- `api/patients.js` is a Vercel serverless function. It reads
  `COALITION_API_USERNAME` and `COALITION_API_PASSWORD` from the server
  environment, builds the Basic Auth header on the server, and calls the API.
- Locally, `vite.config.js` serves the same function at `/api/patients` for
  `npm run dev` and `npm run preview`, reading the variables from `.env.local`.
- The variables deliberately have no `VITE_` prefix: Vite only bundles
  `VITE_*` variables into browser code, so these never reach the client.
- Upstream error details are not forwarded to the browser.

## Data handling

The API returns all patients in one response. The proxy filters it **on the
server**, so the browser only receives:

- Jessica Taylor's full record (profile, diagnosis history, vitals,
  diagnostic list, lab results), and
- name, gender, age, and profile photo for the first 12 patients, to reproduce
  the sidebar in the design.

No diagnosis history, vitals, contact, or insurance data for any other patient
is sent to the browser.

## Deploying to Vercel

Import the repository at <https://vercel.com/new>. Vercel detects Vite
(build command `npm run build`, output directory `dist`) and the `api/`
function automatically. Add `COALITION_API_USERNAME` and
`COALITION_API_PASSWORD` as environment variables in the Vercel project
settings. Do not add any `VITE_`-prefixed credential variables.

## Assessment submission vs. this repository

The assessment instructions asked for the Basic Auth header to be encoded in
the browser with `btoa()`, so the submitted assessment ZIP calls the API
directly from the browser. This public repository is the deployment version:
it moves authentication and data filtering into the server-side proxy above,
so no credentials are bundled into the public site. The dashboard UI is
otherwise the same.
