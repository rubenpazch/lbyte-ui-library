---
"@rubenpazch/icons": minor
"@rubenpazch/prescription-card": patch
"@rubenpazch/select": patch
"@rubenpazch/overlay-loader": patch
"@rubenpazch/ui": minor
---

- Iconos: metadatos para la IA (`ICONOS`, `docs/ICONOS.md`), galería única en Storybook y nuevo `ReceiptIcon`.
- Iconos: se publican como un archivo por icono (`preserveModules`, `sideEffects: false`); importar uno pasa de ~22 KB a ~1,3 KB.
- Iconos decorativos por defecto (`aria-hidden`): se quitan los `aria-label` fijos en inglés que se sumaban al nombre de los botones.
- `pnpm icono:nuevo` crea un icono desde un `.svg`.
- Historias de `Select` y `OverlayLoader`; títulos de Storybook unificados por categoría en español.
