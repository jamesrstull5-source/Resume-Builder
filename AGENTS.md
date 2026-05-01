This file was generated mostly by AI. I fed some code from previous assignments into it and asked it to make a set of guidelines based on it.

# Project Constraints & Style Guide

## 1. Core Tech Stack
  - Frontend: Vanilla HTML, CSS, and JavaScript ONLY. Do not use React, Vue, Angular, or any other frontend frameworks.
  - Please refrain from using custom CSS as much as possible. 
  - Styling: Use locally hosted Bootstrap CSS/JS files. NO CDNs.

## 2. Naming Conventions (Hungarian Notation)
You MUST prefix all variables, database tables, and HTML IDs to indicate their type or element.
  - Strings: `str` (e.g., `strSender`, `strQuery`)
  - Numbers/Decimals/Integers: `dec` or `int` (e.g., `decAmount`, `intNonce`)
  - Booleans: `bln` (e.g., `blnError`)
  - Objects: `obj` (e.g., `objNewTransaction`)
  - Arrays: `arr` (e.g., `arrChain`)
  - Dates: `dat` (e.g., `datInitTime`)
  - HTML Inputs: `txt` (e.g., `txtTransAmount`)
  - HTML Buttons: `btn` (e.g., `btnMineBlock`)
  - HTML Divs/Containers: `div` (e.g., `divChainOutput`)
  - HTML Tables: `tbl` (e.g., `tblChain`)

## 3. Frontend Architecture & Logic
  - The application must be a Single Page Application (SPA) using a single `index.html` file. Handle views by updating the DOM.
  - DOM Selection: Use `document.querySelector()` exclusively. Do not use `getElementById`.
  - Event Listeners: Attach events directly using `.addEventListener()` (e.g., `document.querySelector('#btnID').addEventListener('click', () => {...})`).
  - API Calls: Use the standard `fetch()` API with Promise chaining (`.then().catch()`). Do NOT use `async/await` for frontend requests.
  - UI Feedback: Use the SweetAlert2 library (`Swal.fire`) for success and error popups instead of standard browser alerts.

## 4. Code Formatting
  - Semicolons: Omit semicolons at the end of lines; rely on Automatic Semicolon Insertion (ASI).
  - Quotes: Default to single quotes (`'`) for JavaScript strings.