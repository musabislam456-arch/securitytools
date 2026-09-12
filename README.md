# SecurityTools

**Live site:** [securitytools.utilix.site](https://securitytools.utilix.site)

Free, 100% client-side cybersecurity utilities. We never store or log passwords.

## Features

- **Password Strength Checker** with real-world crack-time analysis
- **Random Password Generator**
- **Diceware Passphrase Generator**
- Entropy calculation, zero server logging
- Blog for cybersecurity education and SEO

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React + TypeScript
- Tailwind CSS
- Auto-generated `sitemap.xml` and `robots.txt`

## Getting Started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

```bash
bun run build
bun start
```

## Project Structure

```
app/            Routes (tools/*, blog, about, contact, privacy, terms)
components/     Shared UI components (Navbar, Footer, etc.)
lib/            Blog data
```

## License

All rights reserved.
