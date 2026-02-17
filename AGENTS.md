# tsmono

Trial TypeScript monorepo proving out the structure from
[inspect_scout/design/plans/monorepo.md](https://github.com/meridianlabs-ai/inspect_scout/blob/main/design/plans/monorepo.md).
The goal is to eliminate TypeScript code duplication between inspect_ai and
inspect_scout by sharing code in a monorepo with shared tooling.

## Repository Structure

```
tsmono/
├── apps/scout/          scout               — Full copy of inspect_scout www/
├── packages/util/     @tsmono/util      — Shared utilities (from www/src/utils/)
└── tooling/
    ├── eslint-config/   @tsmono/eslint-config  — Base + React ESLint configs
    ├── prettier-config/ @tsmono/prettier-config — Shared Prettier config
    └── tsconfig/        @tsmono/tsconfig        — Base + React tsconfig
```

## Principles

- Tooling defaults are **fully strict** — new packages get the strictest rules
- Legacy code gets **local overrides** (apps/scout and packages/util relax
  `no-unsafe-*`, `no-explicit-any`, etc.)
- Use `@tsmono/` scope (not `@meridian/`) — this is a trial repo

## Scripts

All commands run from the repo root.

| Command              | Description                        |
| -------------------- | ---------------------------------- |
| `pnpm install`       | Install all workspace dependencies |
| `pnpm build`         | Build all packages (via Turborepo) |
| `pnpm lint`          | Lint all packages                  |
| `pnpm typecheck`     | Type-check all packages            |
| `pnpm test`          | Run all tests (via Turborepo)      |
| `pnpm check`         | Lint + typecheck + format check    |
| `pnpm manypkg:check` | Validate workspace consistency     |

Turbo orchestrates all task parallelism — workspace scripts are single-concern
leaf commands. See [scripts.md](scripts.md) for the full policy.

## Key Conventions

- **Package manager**: pnpm (v10.29.3). Never use npm or yarn.
- **Node**: >=22
- **Workspace deps**: Use `"workspace:*"` protocol
- **Imports**: `@tsmono/util` is a barrel export — import from the package,
  not from individual files
- **ESLint configs**: Consumers import `@tsmono/eslint-config/base` or
  `@tsmono/eslint-config/react`, then add local `languageOptions` with
  `parserOptions.projectService` and `tsconfigRootDir`
- **TSConfig**: Consumers extend `@tsmono/tsconfig/base.json` or
  `@tsmono/tsconfig/react.json`

## Migration Notes

This is a trial repo. [MIGRATION_NOTES.md](MIGRATION_NOTES.md) tracks source
changes and gotchas that must be applied when creating the real monorepo. Keep
it up to date as you discover new issues.

## What Came From Where

- `apps/scout/` — copied from `inspect_scout/src/inspect_scout/_view/www/`
  with `src/utils/` removed
- `packages/util/src/` — the 29 utility files from `www/src/utils/`
- `chatMessage.ts` and `react-query.ts` have local type definitions for
  `ChatMessage` and `ApiError` (originally imported from app code)
- 122 imports across scout were rewritten from `../utils/X` to `@tsmono/util`
