#!/bin/bash

ROOT="/Users/rubenpaz/personal/lbyte-ui-library"
PKG_DIR="$ROOT/packages"

REPLACEMENTS=(
  "../Button|@rubenpazch/button"
  "../Button/Button|@rubenpazch/button"
  "../IconButton/IconButton|@rubenpazch/icon-button"
  "../IconButton|@rubenpazch/icon-button"
  "../InputButton|@rubenpazch/input-button"
  "../SquareButton|@rubenpazch/square-button"
  "../Link|@rubenpazch/link"
  "../Icons|@rubenpazch/icons"
  "../Menu|@rubenpazch/menu"
  "../MenuMobile|@rubenpazch/menu-mobile"
  "../Drawer|@rubenpazch/drawer"
  "../DrawerMenuMobile|@rubenpazch/drawer-menu-mobile"
  "../Navbar|@rubenpazch/navbar"
  "../TextInput|@rubenpazch/text-input"
  "../TextArea|@rubenpazch/text-area"
  "../Page|@rubenpazch/page"
  "../Background|@rubenpazch/background"
)

echo "Rewriting sibling imports to package imports..."

for pair in "${REPLACEMENTS[@]}"; do
  key="${pair%%|*}"
  val="${pair##*|}"
  echo "Replacing $key -> $val"
  find "$PKG_DIR" -type f \( -name "*.ts" -o -name "*.tsx" \) \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/__snapshots__/*" \
    -exec sed -i '' "s|from \"$key\"|from \"$val\"|g" {} \;
done

echo "Rewrite complete."
