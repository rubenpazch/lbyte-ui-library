#!/bin/bash

# Component migration script
REPO_ROOT="/Users/rubenpaz/personal/lbyte-ui-library"
SRC_DIR="$REPO_ROOT/src/components"
PACKAGES_DIR="$REPO_ROOT/packages"
BUTTON_TEMPLATE="$PACKAGES_DIR/button"

# Components to migrate (lowercase for package names)
COMPONENTS=(
  "Link:link"
  "InputButton:input-button"
  "IconButton:icon-button"
  "SquareButton:square-button"
  "Navbar:navbar"
  "Menu:menu"
  "MenuMobile:menu-mobile"
  "Drawer:drawer"
  "DrawerMenuMobile:drawer-menu-mobile"
  "TextInput:text-input"
  "TextArea:text-area"
  "Page:page"
  "Background:background"
)

for component in "${COMPONENTS[@]}"; do
  IFS=':' read -r SOURCE_NAME PKG_NAME <<< "$component"

  echo "Migrating $SOURCE_NAME to @rubenpazch/$PKG_NAME..."

  # Create package directory
  PKG_DIR="$PACKAGES_DIR/$PKG_NAME"
  mkdir -p "$PKG_DIR/src"

  # Copy source files
  cp -r "$SRC_DIR/$SOURCE_NAME"/* "$PKG_DIR/src/" 2>/dev/null || echo "Warning: Could not copy $SOURCE_NAME"

  # Copy build configs
  cp "$BUTTON_TEMPLATE/rollup.config.mjs" "$PKG_DIR/"
  cp "$BUTTON_TEMPLATE/tsconfig.json" "$PKG_DIR/"
  cp "$BUTTON_TEMPLATE/jest.config.js" "$PKG_DIR/" 2>/dev/null

  # Create package.json from template
  cat > "$PKG_DIR/package.json" <<EOF
{
  "name": "@rubenpazch/$PKG_NAME",
  "version": "1.0.0",
  "description": "$SOURCE_NAME component for Lbyte UI library",
  "main": "dist/index.cjs.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.cjs.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist"
  ],
  "scripts": {
    "build": "rollup -c",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .ts,.tsx",
    "clean": "rm -rf dist"
  },
  "peerDependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "dependencies": {
    "@rubenpazch/shared": "workspace:*"
  },
  "devDependencies": {
    "@rubenpazch/eslint-config": "workspace:*",
    "@rubenpazch/typescript-config": "workspace:*",
    "@rollup/plugin-commonjs": "^28.0.2",
    "@rollup/plugin-node-resolve": "^16.0.0",
    "@rollup/plugin-terser": "^0.4.3",
    "@rollup/plugin-typescript": "^12.1.2",
    "@testing-library/react": "^16.1.0",
    "@types/jest": "^29.5.1",
    "@types/react": "^19.0.2",
    "@types/react-dom": "^19.0.2",
    "autoprefixer": "^10.4.14",
    "eslint": "^9.16.0",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.5.0",
    "jest-environment-jsdom": "^29.5.0",
    "postcss": "^8.4.23",
    "prettier": "^3.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "rollup": "^4.29.1",
    "rollup-plugin-dts": "^6.1.0",
    "rollup-plugin-postcss": "^4.0.2",
    "rollup-plugin-typescript2": "^0.36.0",
    "tslib": "^2.5.2",
    "typescript": "^5.0.4"
  },
  "publishConfig": {
    "access": "public"
  }
}
EOF

  echo "✓ Created @rubenpazch/$PKG_NAME"
done

echo ""
echo "Migration complete! Don't forget to:"
echo "1. Update import statements from 'classnames' to '@rubenpazch/shared'"
echo "2. Add dependencies between packages where needed"
echo "3. Run 'pnpm install' to link workspaces"
