# Tray Commercial Broker FZ-LLC — Site Reconstruction

React + Vite rebuild of [tcbuae.com](https://www.tcbuae.com/), matching the live site’s pages, content, and styling.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

To test the contact form locally (PHP), in a second terminal:

```bash
php -S 127.0.0.1:8765 -t public
```

Vite proxies `POST /contact.php` to that server.

**Local form without real email** — On a Mac, PHP cannot send mail by default. Submissions are stored in `.contact-dev.log` at the project root.

**Send real email while developing** (pick one):

1. Copy `.env.example` → `.env.local` and uncomment:
   `VITE_CONTACT_ENDPOINT=https://www.tcbuae.com/contact.php`  
   Restart `npm run dev`. The form hits the live handler (each test emails support@).

2. Copy `public/contact.config.php.example` → `public/contact.config.php`, set SMTP host/user/password for `support@tcbuae.com` (from your hosting or email provider). Restart the PHP server.

**Production** — Deploy `dist/` plus `contact.php`, `contact-mail.php`, and optional `contact.config.php`. Live [tcbuae.com](https://www.tcbuae.com/) already sends with PHP `mail()`.

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder together with `public/` assets (`favicon.png`, `assets/`, `docs/`, `contact.php`).

## Project layout

- `src/pages/` — Home, About, Services, service detail, Licenses, Contact
- `src/components/` — Header, footer, WhatsApp button, UI helpers
- `src/config.js` — Company contact details and branding
- `src/services.js` — Service categories and license metadata
- `public/contact.php` — Contact form handler (requires PHP mail on the server)

## Customize

- Update business details in `src/config.js`
- Add social profile URLs under `site.socials`
- Replace images in `public/assets/`
