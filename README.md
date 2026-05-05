# Solar Sheet Web App

This is a static dashboard built from the Google Sheet:

https://docs.google.com/spreadsheets/d/1gPj0r4AZmNwBAhLrOOoy-bvT2hb8bwvDKvBx4bnE9Xk/edit?coid=644336796&gid=0#gid=0

## Run locally

```powershell
cd C:\Mantu\solar-sheet-webapp
npx http-server . -p 5174
```

Then open:

```text
http://localhost:5174
```

## Notes

- The app tries to load live CSV data from the Google Sheet.
- If the browser blocks the live request or the sheet becomes private, it uses the built-in copy of the rows that were available when the app was created.
- The app auto-refreshes sheet data every 60 seconds.
- `April 2026`, `Plant Status`, `Date of Visit`, `E-Today`, `E-Total`, and `Remarks` are editable in the web app.
- Filters were removed to keep the dashboard cleaner on desktop and mobile.
- To publish this online, upload these files to any static host such as Netlify, Vercel, GitHub Pages, or your own hosting.

## Enable Google Sheet updates

Browsers cannot directly edit a Google Sheet unless OAuth/API credentials or a Google Apps Script Web App is used. This project includes the Apps Script file at:

```text
C:\Mantu\solar-sheet-webapp\google-apps-script.gs
```

Setup:

1. Open the Google Sheet.
2. Go to Extensions > Apps Script.
3. Paste the code from `google-apps-script.gs`.
4. Click Deploy > New deployment.
5. Choose type: Web app.
6. Execute as: Me.
7. Who has access: Anyone with the link.
8. Deploy, authorize it, and copy the Web App URL.
9. Paste that URL into the app under Google Sheet Sync, then click Save Sync URL.

After that, edits made in the web app are sent back to the Google Sheet.

If you change `google-apps-script.gs`, open Apps Script and deploy a new version from Manage deployments so the live `/exec` URL uses the latest code. The current script file includes support for updating the report month in cell `A1`.

Current default sync URL:

```text
https://script.google.com/macros/s/AKfycby7tpRVaE1nhcezxtskP0R_6GUzx3NQi6V_ILqopCj3CsPw8qbAiSiyng9qbUb3YiKp/exec
```
