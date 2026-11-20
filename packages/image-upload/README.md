# ImageUpload

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Subida de imagen o PDF con vista previa, arrastrar y soltar, validación de tipo y tamaño.

- **Usar cuando:** Fotos de perfil, comprobantes, documentos adjuntos (suele enviar a archivos-api).
- **Evitar cuando:** Muchos archivos a la vez sin vista previa.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/image-upload
```

## ImageUpload

| Prop              | Tipo                            | Req. | Por defecto                                    | Descripción |
| ----------------- | ------------------------------- | ---- | ---------------------------------------------- | ----------- |
| `labels`          | `ImageUploadLabels`             | sí   |                                                |             |
| `onUpload`        | `(file: File) => Promise<void>` | sí   |                                                |             |
| `acceptedFormats` | `string[]`                      |      | `["image/jpeg", "image/png", "image/svg+xml"]` |             |
| `className`       | `string`                        |      | ``                                             |             |
| `currentImageUrl` | `string`                        |      |                                                |             |
| `disabled`        | `boolean`                       |      | `false`                                        |             |
| `label`           | `string`                        |      |                                                |             |
| `maxSizeMB`       | `number`                        |      | `5`                                            |             |
| `onRemove`        | `() => Promise<void>`           |      |                                                |             |
| `previewHeight`   | `number`                        |      | `200`                                          |             |
| `previewWidth`    | `number`                        |      | `200`                                          |             |

<!-- catalogo:fin -->
