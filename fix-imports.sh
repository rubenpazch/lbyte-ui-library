#!/bin/bash

# Fix classnames imports across all packages
PACKAGES_DIR="/Users/rubenpaz/personal/lbyte-ui-library/packages"

echo "Fixing classnames imports in all packages..."

# Find all .tsx and .ts files (excluding node_modules, dist, etc.)
find "$PACKAGES_DIR" -type f \( -name "*.tsx" -o -name "*.ts" \) \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/__snapshots__/*" \
  -exec sed -i '' 's/import classList from "classnames";/import { classList } from "@rubenpazch\/shared";/g' {} \;

echo "✓ Fixed classnames imports"
echo "Run 'pnpm install' to install dependencies"
