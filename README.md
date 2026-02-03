# Safarni — React + TypeScript + Vite

A Vite + React + TypeScript starter configured with Tailwind, ESLint, and common conventions used in this repository.

---

## 🚀 Quick Start

demo : (https://safarni-wza1.vercel.app/GetStarted)

Prerequisites:

- Node.js LTS (>= 18) and npm (or pnpm/yarn)

Installation:

```bash
npm install
```

Run locally:

```bash
npm run dev
# check types
npx tsc -b
# build
npm run build
# preview the production build
npm run preview
# lint
npm run lint
```

---

## ✅ Best Practices

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

---

### Assets & images

- Reference `public/` images by root path: `/images/foo.png`.
- Import `src/assets` files when bundling and hashing is desired.
- Avoid spaces and special characters in filenames when possible to reduce cross-platform issues.

### Linting & formatting

- Use ESLint with type-aware rules (configure to use `tsconfig.app.json`).
- Add Prettier and set up Husky + lint-staged to auto-format and lint before commits.

### Testing

- Add unit & integration tests (Vitest or Jest + Testing Library recommended).
- Make tests fast and isolated; mock network requests.

### Accessibility

- Integrate accessibility checks (axe) and use semantic HTML and accessible form controls.

### Performance

- Use dynamic `import()` to code-split large routes.
- Analyze bundle size and keep chunks small. Consider lazy-loading heavy libraries.

### Security

- Never commit `.env` files with secrets. Use environment variables and secure deployment secrets.
- Sanitize/validate user input on client and server sides.

---

## 🛠 Troubleshooting

- "Cannot find module '\*.png' or its corresponding type declarations":
  - Ensure `src/types/images.d.ts` exists and `tsconfig.app.json` includes `src`.

- Image not found at runtime:
  - Files in `public/` are served at `/`, e.g. `/images/foo.png`.
  - Bundled images from `src/assets` must be imported (e.g., `import logo from '@/assets/logo.png'`).

- Leaflet map styling issues:
  - Import `leaflet/dist/leaflet.css` in the map component.

- Build warnings about large chunks:
  - Use dynamic imports and manual chunking to improve bundle size.

---

## 🔁 Git & PR workflow

- Branch naming: `feature/`, `fix/`, `chore/`.
- Use clear commit messages (Conventional Commits recommended).
- PR checklist:
  - Types and build pass (`npx tsc -b`).
  - Linting passes (`npm run lint`).
  - Tests pass (if present).
  - Include screenshots / steps to test UI changes.

---

## 📦 CI & Deployment

- Add CI to run `npm ci`, `npx tsc -b`, `npm run lint`, and `npm run build` on PRs.
- Deploy `dist/` to hosts like Vercel, Netlify, or S3.

---

## 🙌 Contributing

Contributions are welcome — open an issue or PR. Keep changes small and clearly described.

---

If you'd like, I can add a sample GitHub Actions workflow, Prettier & Husky setup, or a `CONTRIBUTING.md` with these conventions. ✨
