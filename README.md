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

4. Open `.env.local` and enter the Basic Auth **username** and **password**
   listed in the official assessment API documentation, under the "Get All
   Patients" request's Authorization section:
   <https://documenter.getpostman.com/view/11861104/2sA35G42ve>

   `VITE_API_URL` is already filled in. `.env.local` is git-ignored and is not
   included in the submission.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL that Vite prints in the terminal (for example
   `http://localhost:5173/`; Vite picks the next free port if that one is busy).

To check the production build instead, run `npm run build` followed by
`npm run preview`, and open the URL it prints.

## About the API credentials

The Basic Auth header is built at request time with `btoa()` from the
environment values. No credentials or pre-encoded keys live in the source
code. Note that Vite inlines `VITE_*` variables into the browser bundle, so
the values are still visible to anyone using the built app. That is acceptable
here because the credentials are published in the API documentation; a
production app would route requests through a server-side proxy instead.

## Data handling

The API returns all patients in one response. `src/services/patientApi.js`
passes Jessica Taylor's full record to the UI. To reproduce the sidebar in the
design, the first 12 records are reduced to name, gender, age, and profile
photo only — no diagnosis history, vitals, contact, or insurance data for any
other patient reaches the UI.
