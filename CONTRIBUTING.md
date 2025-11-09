# Contributing Guide

Welcome! This guide explains how to set up, contribute code to, test, review, and release so contributions meet our Definition of Done.

## Code of Conduct

- Collaborate respectfully and communicate proactively.

- Reference the Team Charter for team behavior expectations and conflict reporting.

- For major conflicts or code of conduct concerns, contact an instructor/TA

## Getting Started

### Frontend:

- Prerequisites: Node.js and npm
- Setup:
  - Clone the repo with `git clone https://github.com/osu-capstone-46x-group-24/OSU_Capstone_Asset_Checking_System.git`
  - Install dependencies with `npm install`
  - Add environment variables (to be implemented)
  - Run local dev environment with `npm run dev`

## Branching & Workflow

We use GitHub Flow to keep main ready for deployment and features to be developed separately

All development happens on short lived branches with short descriptive names of what they do like `fix-example`, `add-example`, or starting with the section they are in like `frontend-example`.

### Flow example:

- Create a branch from main
- Implement feature/fix
- Push to branch and create PR
- Wait for code review, merge only after at least one review
- Delete created branch, or sync your branch with main and continue development

## Issues & Planning

- We use GitHub Issues for all tasks
- Use labels to define which part of the project the issue is for (Frontend, Backend, etc.), and what kind it is (Bug, enhancement, etc.)
- Assign ownership for each issue
- Reference issue numbers in pull requests using `Fixes` or `Closes`
- Issues are planned out on Mondays and assigned to be completed to each person.

## Commit Messages

- Commits should be clear and concise enough to shortly describe what the commit does.
- Commits should start with what they do, for example:

  - fix ...
  - add ...
  - refactor ...
  - remove ...

- If more detail is necessary, describe it further in the pull request or body of commit.

## Code Style, Linting & Formatting

- Formatter: Prettier
- Linter: ESLint

Workflows will be added in the future to automatically run linting, and PRs will only be merged when they pass.

## Testing

<mark>Awaiting tests being added</mark>

## Pull Requests & Reviews

- Open a PR when your code is ready to be reviewed
- Use the PR template and include a clear description of what was changed and why
- Reference related issues (for example, `Closes #12`).
- Ensure your branch is up-to-date with main before merging.
- At least one team member must review and approve PRs before they merge.

## CI/CD

- Deployment pipeline config at .github/workflows/deploy.yaml

## Security & Secrets

- Never commit secrets, use .env instead

## Documentation Expectations

- Update README or component-level documentation for new features.
- Include inline comments for complex logic.

## Release Process

<mark>TBD when releases start happening</mark>

## Support & Contact

- Questions and clarifications can be posted in the team’s discord server or submitted as a GitHub Issue under the repository.
