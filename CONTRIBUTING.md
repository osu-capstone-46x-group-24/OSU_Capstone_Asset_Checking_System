# Contributing Guide

Welcome! This guide explains how to set up, contribute code to, test, review, and release so contributions meet our Definition of Done.

## Code of Conduct

- Collaborate respectfully and communicate proactively.

- Reference the Team Charter for team behavior expectations and conflict reporting.

- For major conflicts or code of conduct concerns, contact an instructor/TA

## Getting Started

### Frontend:

- Prerequisits: Node.js and npm
- Setup:
  - Clone the repo with `git clone https://github.com/osu-capstone-46x-group-24/OSU_Capstone_Asset_Checking_System.git`
  - Install dependencies with `npm install`
  - Add environment variables (to be implemented)
  - Run local dev environment with `npm run dev`

## Branching & Workflow

We use GitHub Flow to keep main ready for deployment and features to be developed seperately

All development happens on short lived branches with short descriptive names of what they do like `fix-example`, `add-example`, or starting with the section they are in like `frontend-example`.

### Flow example:

- Create a branch from main
- Implement feature/fix
- Push to branch and create PR
- Wait for code review, merge only after at least one review
- Delete created branch, or sync your branch with main and continue development

## Issues & Planning

<mark>Go over this on meeting on 11/3</mark>

## Commit Messages

<mark>Go over this on meeting on 11/3</mark>

## Code Style, Linting & Formatting

- Formatter: Prettier
- Linter: ESLint

Workflows will be added in the future to automatically run linting, and PRs will only be merged when they pass.

## Testing

<mark>Awaiting tests being added</mark>

## Pull Requests & Reviews

<mark>Go over this on meeting on 11/3</mark>

## CI/CD

- Deployment pipeline config at .github/workflows/deploy.yaml

## Security & Secrets

- Never commit secrets, use .env instead

## Documentation Expectations

<mark>Go over this on meeting on 11/3</mark>

## Release Process

<mark>TBD when releases start happening</mark>

## Support & Contact

<mark>TBD</mark>
