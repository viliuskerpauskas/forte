# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Plan & Review

### Before starting work

— Write a plan to .claude/tasks/TASK_NAME.md.
— The plan should be a detailed implementation
plan and the reasoning behind it, as well as
tasks broken down.
— Don't over plan it, always think MVP.
— Once you write the plan, first ask me to
review it. Do not continue until I approve the
plan.
While implementing
— You should update the plan as you work.
After you complete tasks in the plan, you should
update and append detailed descriptions of the
changes you made, so following tasks can be easily
handed over to other engineers.

## Project Overview

This is "Forte", a modern Angular application built with Angular 20.1.0 using the new zoneless change detection and standalone components architecture.

## Development Commands

### Start Development Server

```bash
ng serve
# or
npm start
```

Runs the development server at http://localhost:4200 with hot reloading.

### Build

```bash
ng build
# or
npm run build
```

Creates production build in `dist/` directory. Development build with source maps:

```bash
ng build --configuration development
# or
npm run watch
```

### Testing

```bash
ng test
# or
npm test
```

Runs unit tests using Karma and Jasmine test framework.

### Code Generation

```bash
ng generate component component-name
ng generate --help  # See all available schematics
```

## Architecture

### Modern Angular Features

- **Zoneless Change Detection**: Uses `provideZonelessChangeDetection()` instead of Zone.js
- **Standalone Components**: All components use standalone architecture with imports array
- **Signals**: Uses Angular signals for reactive state management (see `App` component)
- **New Control Flow**: Template syntax uses @if, @for, @switch instead of structural directives

### Project Structure

```
src/
├── app/
│   ├── app.ts          # Root component with signal-based state
│   ├── app.config.ts   # Application configuration and providers
│   ├── app.routes.ts   # Routing configuration (currently empty)
│   ├── app.html        # Root template
│   └── app.css         # Root styles
├── main.ts             # Application bootstrap
├── index.html          # Main HTML file
└── styles.css          # Global styles
```

### Configuration Files

- `angular.json` - Angular CLI workspace configuration
- `tsconfig.app.json` - TypeScript config for app
- `tsconfig.spec.json` - TypeScript config for tests
- Bundle size limits: 500kB warning, 1MB error for initial bundle

### Key Dependencies

- **Angular 20.1.0** (core, common, forms, router, build, CLI)
- **RxJS 7.8.0** for reactive programming
- **TypeScript 5.8.2** for type safety
- **Tailwind CSS 4.1.11** for utility-first styling
- **PrimeNG 20.0.0** for UI components and design system
- **PrimeIcons 7.0.0** for iconography
- **@primeuix/themes 1.2.1** for theming system
- **@fontsource/geist-sans 5.2.5** for typography
- **tailwindcss-primeui 0.6.1** for PrimeNG-Tailwind integration
- **Karma 6.4.0 + Jasmine 5.8.0** for testing

## Development Notes

When creating new components, use standalone component syntax:

```typescript
@Component({
  selector: 'app-example',
  imports: [/* dependencies */],
  templateUrl: './example.html',
  styleUrl: './example.css'
})
```

Use signals for reactive state management instead of traditional Angular change detection patterns.

### Styling Guidelines

- Use Tailwind CSS utility classes for styling
- Leverage PrimeNG components for complex UI elements
- Follow utility-first approach with Tailwind for custom styling

### Localization

- All end-user facing text, labels, messages, and UI content should be in Lithuanian language
- Use proper Lithuanian grammar and spelling
- Component properties, variable names, and function names should remain in English for code consistency
- Claude should communicate with developers in English, only generate Lithuanian content for the application UI
