# reCAPTCHA v3 Token Generator

A simple Node.js web application to generate reCAPTCHA v3 tokens.

## Prerequisites

- Node.js installed on your machine.
- A Google reCAPTCHA v3 Site Key.

## Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd recaptchav3
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables:
    - Copy `.env.example` to `.env`:
      ```bash
      cp .env.example .env
      ```
    - Open `.env` and set your `RECAPTCHA_SITE_KEY`.

## Usage

1.  Start the server:
    ```bash
    node server.js
    ```

2.  Open your browser and navigate to `http://localhost:3000`.

3.  Click the "Get Token" button to generate a reCAPTCHA v3 token.

4.  Click the "Copy Token" button to copy the token to your clipboard.

## Project Structure

- `public/`: Contains static files (HTML, CSS, JS).
- `server.js`: Express server setup.
- `.env`: Environment variables.
