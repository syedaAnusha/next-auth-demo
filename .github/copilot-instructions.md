Tech stack: Next.js (App Router), TypeScript, NextAuth.js, MUI, Zustand, Tailwind CSS, Vitest.

Project focus: Authentication system demo using NextAuth.js for handling user authentication flows.

Coding standards: Strict TypeScript typing. Use interfaces/types for props and state. Follow .eslintrc.json and .prettierrc.json. Prefer functional components with React Hooks. Keep components small and focused on single responsibilities.

Authentication: Use NextAuth.js for authentication. Keep auth-related components in src/components/auth/. Authentication configuration should be maintained in src/auth.ts and auth API routes.

Component organization:

- Auth components go in src/components/auth/
- UI components go in src/components/ui/
- Context providers go in src/components/providers/

State management: Use Zustand for global state, not Redux. Auth state should be managed through NextAuth's built-in hooks and session management.

Testing: Use Vitest for unit/integration tests. Place tests alongside components. Mock API calls, authentication state, and external dependencies. Test both authenticated and unauthenticated states.

Patterns:

- Use React Hook Form for forms, not Formik
- Implement try-catch for async operations
- Use shadcn/ui components from src/components/ui for consistent styling
- Use toasts for user feedback
- Follow Next.js 13+ App Router patterns and conventions

The team uses Github for tracking items of work.

Avoid — whenever possible — embedding text directly in React components. Instead, use the translation function to retrieve text from the translations file. Currently english language translations are stored in src/locales/en/translations.json.

Use react-toastify for notifications.
