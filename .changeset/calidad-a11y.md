---
"@rubenpazch/select": minor
"@rubenpazch/radio-button": minor
"@rubenpazch/identification-input": minor
"@rubenpazch/image-upload": minor
"@rubenpazch/date-input": patch
"@rubenpazch/date-picker": patch
"@rubenpazch/modal": patch
"@rubenpazch/sidebar": patch
"@rubenpazch/ui": minor
---

- `Select`, `RadioGroup`/`RadioButton`, `IdentificationInput` e `ImageUpload` exponen `ref` y aceptan las props comunes de campo (`label`, `hint`, `error`, `required`, `id`, `name`), con `aria-describedby`/`aria-invalid`.
- `IdentificationInput` e `ImageUpload`: `labels` pasa a ser opcional, con textos en español por defecto (`DEFAULT_IDENTIFICATION_LABELS`, `DEFAULT_IMAGE_UPLOAD_LABELS`).
- `RadioGroup`: textos por defecto en español ("Seleccionado:", "Ninguno").
- `DateInput`/`DatePicker`: el campo usa `role="combobox"`, que es lo que permite `aria-expanded` (lo detectó axe).
- Pruebas automáticas de accesibilidad con jest-axe en 42 componentes.
