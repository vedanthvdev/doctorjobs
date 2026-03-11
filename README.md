# Hospital Jobs (ihospitaljobs.com)

A job board platform for medical professionals to find and post hospital job opportunities. Built with React and deployed on Netlify.

## Tech Stack

- **Frontend**: React 18, React Router 6, Axios
- **Styling**: CSS with dark/light theme support (react-switch)
- **Effects**: tsparticles (background particles), Three.js
- **Auth**: JWT-based authentication, social login (Facebook)
- **Testing**: Jest + React Testing Library (unit), Cypress + Cucumber (E2E), Selenium + Cucumber (E2E)
- **CI/CD**: GitHub Actions, Netlify
- **Backend**: Hosted separately — Express.js server on Render

## Getting Started

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Create production build |
| `npm test` | Run unit tests |
| `npm run e2e` | Run Cypress E2E tests |
| `npm run e2e:parallel` | Run Cypress tests in parallel |
| `npm run sel` | Run Selenium + Cucumber tests |

To run a specific Selenium feature, edit the tag in `cucumber-config.js`.
