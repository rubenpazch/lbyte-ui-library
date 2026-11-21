# @rubenpazch/identification-input

## 2.1.0

### Minor Changes

- 4a35192: - `Select`, `RadioGroup`/`RadioButton`, `IdentificationInput` e `ImageUpload` exponen `ref` y aceptan las props comunes de campo (`label`, `hint`, `error`, `required`, `id`, `name`), con `aria-describedby`/`aria-invalid`.
  - `IdentificationInput` e `ImageUpload`: `labels` pasa a ser opcional, con textos en español por defecto (`DEFAULT_IDENTIFICATION_LABELS`, `DEFAULT_IMAGE_UPLOAD_LABELS`).
  - `RadioGroup`: textos por defecto en español ("Seleccionado:", "Ninguno").
  - `DateInput`/`DatePicker`: el campo usa `role="combobox"`, que es lo que permite `aria-expanded` (lo detectó axe).
  - Pruebas automáticas de accesibilidad con jest-axe en 42 componentes.

### Patch Changes

- @rubenpazch/autocomplete@5.1.1
  - @rubenpazch/text-input@6.2.1

## 2.0.3

### Patch Changes

- c2188cd: Nuevo paquete `@rubenpazch/ui` que reexporta todos los componentes (marcado `"use client"`) e incluye su documentación para personas y agentes de IA (`AGENTS.md`, `docs/COMPONENTES.md`, `docs/catalogo.json`). `@rubenpazch/tokens` agrega `tailwind.css` (puente de los tokens hacia Tailwind 4). Cada paquete trae un README con su uso y sus props, generado por `pnpm catalogo`.
- Updated dependencies [c2188cd]
  - @rubenpazch/autocomplete@5.0.1
  - @rubenpazch/text-input@6.1.1

## 2.0.2

### Patch Changes

- Updated dependencies
  - @rubenpazch/autocomplete@5.0.0
  - @rubenpazch/text-input@6.1.0

## 2.0.1

### Patch Changes

- Updated dependencies
  - @rubenpazch/autocomplete@4.0.0
  - @rubenpazch/text-input@6.0.0

## 2.0.0

### Major Changes

- dd69442: new components

### Patch Changes

- Updated dependencies [dd69442]
  - @rubenpazch/text-input@5.0.0
  - @rubenpazch/autocomplete@3.0.3
