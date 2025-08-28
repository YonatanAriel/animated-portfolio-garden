# Animated Portfolio Garden

Animated Portfolio Garden is a React + TypeScript single-page application built with Vite, featuring an animated portfolio website with a neon green cyberpunk theme. The project uses Tailwind CSS for styling, shadcn/ui for components, and Framer Motion for animations.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap and Setup
Run these commands in order to set up the development environment:
- `npm install` -- takes ~40 seconds. NEVER CANCEL. Set timeout to 90+ seconds.

### Build Process
- `npm run build` -- Production build, takes ~5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.
- `npm run build:dev` -- Development build, takes ~5 seconds. NEVER CANCEL. Set timeout to 30+ seconds.

### Development Server
- `npm start` -- Starts development server on port 8080, ready in ~300ms. NEVER CANCEL. Set timeout to 30+ seconds.
- Development server URL: `http://localhost:8080/`
- Hot reload is enabled via Vite

### Preview Production Build
- `npm run preview` -- Starts preview server on port 4173 after building. NEVER CANCEL. Set timeout to 30+ seconds.
- Must run `npm run build` first

### Linting
- `npm run lint` -- ESLint check, takes ~2 seconds. Set timeout to 30+ seconds.
- NOTE: There are existing lint warnings in shadcn/ui components that are not critical:
  - TypeScript warnings about empty interfaces
  - React refresh warnings about component exports
  - require() style import warning in tailwind.config.ts

## Validation
- **CRITICAL**: Always manually validate changes by running the development server and testing in browser
- **Test the complete user experience**: Navigate through all portfolio sections (Hero, About, Skills, Projects, Contact)
- **Test interactive elements**: Click contact buttons to verify email links work (`mailto:yonatanariel1000@gmail.com`)
- **Visual validation**: Ensure neon green theme, animations, and responsive design work correctly
- Always run `npm run lint` before committing (ignore existing warnings mentioned above)
- Always run `npm run build` to ensure production build works

## Common Tasks

### Adding New Components
- Use shadcn CLI: `npx shadcn@latest add [component-name]`
- Components are installed to `src/components/ui/`
- Follow existing patterns in `src/components/` for custom components

### Project Structure
```
src/
├── App.tsx              # Main app with routing
├── main.tsx            # Entry point
├── index.css           # Global styles with Tailwind
├── components/         # Custom components
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section
│   ├── Skills.tsx      # Skills section  
│   ├── Projects.tsx    # Projects showcase
│   ├── Contact.tsx     # Contact section
│   ├── ThemeToggle.tsx # Theme switcher
│   └── ui/             # shadcn/ui components
├── pages/
│   └── Index.tsx       # Main page layout
├── hooks/              # Custom React hooks
└── lib/                # Utilities
```

### Key Configuration Files
- `package.json` -- Project dependencies and scripts
- `vite.config.ts` -- Vite configuration (port 8080, path aliases)
- `tailwind.config.ts` -- Tailwind with custom neon green theme
- `components.json` -- shadcn/ui configuration
- `tsconfig.json` -- TypeScript configuration

### Styling System
- **Primary Framework**: Tailwind CSS with custom theme
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Animations**: Framer Motion for complex animations, CSS animations for simple effects
- **Theme**: Dark background with neon green accents (#39FF14, #00FF41)
- **Typography**: Inter font family

### Common Patterns
- All animations use Framer Motion with `initial`, `whileInView`, `viewport` props
- Components use TypeScript with proper type definitions
- Responsive design with Tailwind breakpoints (md:, lg:)
- Dark theme with custom CSS variables defined in `src/index.css`

## Troubleshooting

### Build Issues
- If build fails, check for TypeScript errors: `npx tsc --noEmit`
- Ensure all imports use proper path aliases (`@/components`, `@/lib`, etc.)

### Development Server Issues  
- Server runs on port 8080 by default
- If port conflict, Vite will suggest alternative port
- Hot reload should work automatically

### Lint Warnings
- Ignore existing shadcn/ui component warnings (documented above)
- Focus on new code lint issues only
- Use `npx eslint . --fix` to auto-fix common issues

### Package Manager
- Use npm only (package-lock.json present)
- Do not use yarn, pnpm, or bun unless specifically needed

## Development Workflow
1. Always run `npm install` first in a fresh environment
2. Start development with `npm start`
3. Make changes and test in browser at `http://localhost:8080/`
4. Validate animations, styling, and responsive behavior
5. Test contact functionality (email links)
6. Run `npm run lint` to check code quality
7. Run `npm run build` to ensure production build works
8. For final testing, run `npm run preview` to test production build

## Repository Information
- **Framework**: React 18 + TypeScript + Vite
- **UI Library**: shadcn/ui (Radix UI primitives)
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Package Manager**: npm
- **Node Version**: Compatible with latest LTS
- **Build Tool**: Vite
- **Development Port**: 8080
- **Preview Port**: 4173