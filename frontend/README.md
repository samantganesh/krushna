# Frontend

Minimal Vite + React + TypeScript frontend for the experimentation platform.

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript with strict mode enabled
- **Material UI (MUI)** - Component library and styling
- **ESLint** - Linting with `strictTypeChecked` configuration
- **Prettier** - Code formatting

## Project Structure

```
src/
├── features/           # Isolated feature modules
│   └── home/          # Home page feature
│       └── HomePage.tsx
├── App.tsx            # Root app component
└── main.tsx           # Entry point
```

### Feature Isolation

Each feature is a self-contained module in `src/features/`. Features should:

- Be located in their own subdirectory under `src/features/`
- Not import from other feature directories
- Only import from React, Material UI, or shared utilities

This structure enables future extraction of features as libraries.

## Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

## Type Safety

This project uses TypeScript with strict type checking:

- `strict: true` - All strict type-checking options enabled
- `strictNullChecks` - Null and undefined checking
- `noUncheckedIndexedAccess` - Indexed access returns possibly undefined

ESLint is configured with `tseslint.configs.strictTypeChecked` for type-aware linting rules.

## Code Quality

- **ESLint**: Enforces code quality and catches type-related issues
- **Prettier**: Ensures consistent code formatting
- **TypeScript strict mode**: Catches bugs at compile time

Run `npm run lint` and `npm run format:check` before committing changes.
