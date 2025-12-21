# Release Process

This document outlines the step-by-step process for releasing packages from the Lbyte UI Library monorepo to npm.

## Git Hooks

The repository uses Husky to run automated checks before commits and pushes:

### Pre-commit Hook

Runs automatically before each commit:

- **Lint-staged**: Lints and formats only staged files
- **ESLint**: Fixes TypeScript/TSX files
- **Prettier**: Formats code, JSON, Markdown, and YAML files

### Pre-push Hook

Runs automatically before pushing to remote:

- **Tests**: Runs all test suites (`pnpm test`)
- **Build**: Builds all packages (`pnpm build`)

### Bypass Hooks (Not Recommended)

If you need to bypass hooks (use sparingly):

```bash
# Skip pre-commit
git commit --no-verify -m "message"

# Skip pre-push
git push --no-verify
```

## Prerequisites

- [ ] All changes are committed to git
- [ ] All tests pass (`pnpm test`)
- [ ] All packages build successfully (`pnpm build`)
- [ ] You are logged in to npm (`npm whoami` shows your username)
- [ ] You have 2FA enabled on your npm account

## Authentication Setup

### First Time Setup

1. **Login to npm:**

   ```bash
   npm login
   ```

   - Follow the browser authentication flow
   - Enter your 2FA code when prompted

2. **Verify authentication:**
   ```bash
   npm whoami
   ```
   Should display: `rubenpazch`

### SSH vs HTTPS (Git)

If you encounter git push permission errors, use HTTPS instead of SSH:

```bash
# Check current remote
git remote -v

# If using SSH and getting permission errors, switch to HTTPS
git remote set-url origin https://github.com/rubenpazch/lbyte-ui-library.git
```

## Release Steps

### 1. Ensure Clean State

```bash
# Run tests
pnpm test

# Build all packages
pnpm build

# Check for uncommitted changes
git status
```

### 2. Create a Changeset

```bash
pnpm changeset
```

**Interactive prompts:**

1. **Select packages:** Use spacebar to select all packages that have changed

   - `@rubenpazch/button`
   - `@rubenpazch/icons`
   - `@rubenpazch/text-input`
   - `@rubenpazch/numeric-picker`
   - `@rubenpazch/numeric-up-picker`
   - `@rubenpazch/shared`
   - etc.

2. **Select version bump type:**

   - **patch** (x.x.X) - Bug fixes, small changes
   - **minor** (x.X.0) - New features, non-breaking changes
   - **major** (X.0.0) - Breaking changes

3. **Write summary:** Describe the changes clearly
   ```
   Examples:
   - "fix: React 19 compatibility updates"
   - "feat: Add new IconGallery component"
   - "fix: Remove unused imports and update build config"
   ```

### 3. Version Packages

```bash
pnpm changeset version
```

This will:

- Update package.json versions
- Update CHANGELOG.md files
- Remove the changeset file

### 4. Commit Version Changes

```bash
git add .
git commit -m "chore: version packages"
```

### 5. Build Packages

```bash
pnpm build
```

Ensure all packages build successfully before publishing.

### 6. Publish to npm

```bash
pnpm release
```

**You will be prompted for:**

1. Your 2FA code from your authenticator app
2. The code will be requested for each package being published

### 7. Push to GitHub

```bash
git push
git push --tags
```

### 8. Verify Publication

Check that packages are live on npm:

```bash
# Check individual packages
npm view @rubenpazch/button
npm view @rubenpazch/icons
npm view @rubenpazch/text-input
npm view @rubenpazch/numeric-picker
npm view @rubenpazch/numeric-up-picker
npm view @rubenpazch/shared
```

Or visit: https://www.npmjs.com/~rubenpazch

## Publishing Individual Packages

To publish only specific packages:

```bash
# Create changeset for specific packages only
pnpm changeset

# Select only the packages you want to publish
# Then follow steps 3-7 above
```

## Troubleshooting

### "Access token expired or revoked"

**Solution:** Login again to npm

```bash
npm login
```

### "Permission denied" on git push

**Solution:** Switch to HTTPS

```bash
git remote set-url origin https://github.com/rubenpazch/lbyte-ui-library.git
```

### Package is marked as "private"

**Solution:** Remove `"private": true` from package.json

```json
{
  "name": "@rubenpazch/package-name",
  "version": "1.0.0",
  "private": true,  // ← Remove this line
  ...
}
```

### Build fails before publish

**Solution:** Fix build errors and rebuild

```bash
# Check errors
pnpm build

# Fix the errors
# Then rebuild
pnpm build
```

### 2FA code timeout

**Solution:** Re-run the publish command

```bash
pnpm release
```

The process will resume from where it failed.

## Package Checklist

Before publishing, ensure each package has:

- [ ] `"private": true` removed from package.json
- [ ] Proper version number
- [ ] Valid `main`, `module`, and `types` fields
- [ ] `dist/` directory in `files` array
- [ ] Builds successfully
- [ ] Tests pass (if applicable)
- [ ] README.md with usage examples
- [ ] LICENSE file

## Version Guidelines

### Patch (0.0.X)

- Bug fixes
- Documentation updates
- Internal refactoring
- Dependency updates (non-breaking)

### Minor (0.X.0)

- New features
- New components
- New props/API additions (non-breaking)
- Deprecations (with migration path)

### Major (X.0.0)

- Breaking API changes
- Removing deprecated features
- Major dependency updates
- Component renames
- Required prop changes

## Automated Release (GitHub Actions)

The repository is configured with GitHub Actions for automated releases using **NPM Trusted Publishing** (OIDC-based authentication) for enhanced security.

### How It Works

1. **Create a changeset** on your feature branch:

   ```bash
   pnpm changeset
   ```

2. **Commit and push** your changes including the changeset:

   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push
   ```

3. **Create a Pull Request** to `main`

4. **When merged to main:**

   - GitHub Actions automatically creates a "Version Packages" PR
   - This PR updates all package versions and CHANGELOGs

5. **Review and merge** the "Version Packages" PR:
   - GitHub Actions automatically publishes to npm with provenance
   - Tags are created automatically

### NPM Trusted Publishing Setup

This repository uses NPM's Trusted Publishing (no tokens needed!):

**Benefits:**

- ✅ No need to manage NPM tokens
- ✅ Automatic token rotation
- ✅ Provenance attestation for published packages
- ✅ Enhanced security with OIDC

**One-time Setup on NPM:**

1. Login to npm: https://www.npmjs.com/
2. Go to your package page (or organization)
3. Navigate to **Settings** → **Publishing access**
4. Enable **"Require two-factor authentication for publishing"**
5. That's it! No additional setup needed.

**How it works:**

- GitHub Actions uses OpenID Connect (OIDC) to authenticate with npm
- NPM validates the GitHub workflow identity
- Packages are published with provenance attestation
- Published packages show verified GitHub repository link

### Workflows

**CI Workflow** (`.github/workflows/ci.yml`)

- Runs on all PRs and pushes to main
- Executes: lint, build, test

**Release Workflow** (`.github/workflows/release.yml`)

- Runs only on pushes to main
- Uses Trusted Publishing with `id-token: write` permission
- Creates version PRs or publishes to npm with provenance

### Required Permissions

The release workflow requires these permissions (already configured):

```yaml
permissions:
  contents: write # Create tags and releases
  pull-requests: write # Create version PRs
  id-token: write # OIDC token for npm authentication
```

## Post-Release

1. **Update documentation** if needed
2. **Announce release** in team channels
3. **Update dependent projects** to use new versions
4. **Monitor npm** for download stats and issues

## Rollback

If you need to unpublish a version (within 72 hours):

```bash
npm unpublish @rubenpazch/package-name@version
```

**Note:** Unpublishing is discouraged. Consider publishing a patch version instead.

## Useful Commands

```bash
# Check what would be published
npm pack --dry-run

# View package info on npm
npm view @rubenpazch/package-name

# Check your npm username
npm whoami

# List all your published packages
npm access list packages

# Check package versions locally
pnpm list --recursive --depth 0
```

## Release Checklist

- [ ] Tests passing
- [ ] Build successful
- [ ] Changesets created
- [ ] Versions bumped
- [ ] Changes committed
- [ ] Published to npm
- [ ] Pushed to GitHub
- [ ] Tags pushed
- [ ] Verified on npm
- [ ] Documentation updated
