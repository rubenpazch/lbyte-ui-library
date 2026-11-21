---
"@rubenpazch/timeline": minor
"@rubenpazch/description-list": minor
"@rubenpazch/file-upload": minor
"@rubenpazch/loading-spinner": minor
"@rubenpazch/ui": minor
---

Componentes genéricos para la migración de hal-docs (criterio 0010 de lbyte-contexto):

- `Timeline`: historial en orden con estado, fecha (`<time>`) y descripción; resalta el evento actual.
- `DescriptionList`: pares etiqueta/valor (`<dl>`) en 1–3 columnas, con valor por defecto para vacíos.
- `FileUpload`: uno o varios archivos con arrastrar y soltar, validación de tipo, tamaño, cantidad y duplicados, y lista para quitarlos (`ImageUpload` sigue para una sola imagen).
- `LoadingSpinner`: `color="primary"` (por defecto) con el nombre correcto; `"blue"` sigue como alias (ya usaba el color de la marca).
