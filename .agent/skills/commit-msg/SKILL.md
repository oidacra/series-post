---
name: commit-msg
description: Instructions for writing commit messages following Conventional Commits, enforced by Husky and Commitlint.
---

# Commit Message Skill

This project uses **Husky** and **Commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).

## Format

```text
type(scope?): subject
```

## Rules

- **type**: Must be one of the following:

  - `feat`: A new feature
  - `fix`: A bug fix
  - `docs`: Documentation only changes
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `perf`: A code change that improves performance
  - `test`: Adding missing tests or correcting existing tests
  - `build`: Changes that affect the build system or external dependencies
  - `ci`: Changes to our CI configuration files and scripts
  - `chore`: Other changes that don't modify src or test files
  - `revert`: Reverts a previous commit

- **scope** (optional): A noun describing a section of the codebase (e.g., `header`, `auth`, `api`).
- **subject**: Short description of the change.
  - Use imperative, present tense: "change" not "changed" nor "changes"
  - Don't capitalize the first letter
  - No dot (.) at the end
- **header**: Must not be longer than 100 characters.

## Examples

- `feat(auth): add login component`
- `fix(search): resolve z-index issue on header`
- `chore: update dependencies`

## Validation

Husky will automatically run `commitlint` when you try to commit. If your message does not follow the rules, the commit will be rejected.

Additionally, a **pre-commit** hook will run to ensure code quality:

- `yarn nx format:write`: Formats modified files.
- `yarn nx affected -t lint,test`: Runs linting and tests for affected projects.
