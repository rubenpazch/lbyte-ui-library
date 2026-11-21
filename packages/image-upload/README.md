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

El `ref` apunta al `<input type="file">`.

| Prop              | Tipo                            | Req. | Por defecto                                    | Descripción                                    |
| ----------------- | ------------------------------- | ---- | ---------------------------------------------- | ---------------------------------------------- |
| `onUpload`        | `(file: File) => Promise<void>` | sí   |                                                |                                                |
| `acceptedFormats` | `string[]`                      |      | `["image/jpeg", "image/png", "image/svg+xml"]` |                                                |
| `className`       | `string`                        |      | ``                                             |                                                |
| `currentImageUrl` | `string`                        |      |                                                |                                                |
| `disabled`        | `boolean`                       |      | `false`                                        |                                                |
| `error`           | `string`                        |      |                                                | Error externo (validación del formulario).     |
| `hint`            | `string`                        |      |                                                | Texto de ayuda bajo el campo.                  |
| `id`              | `string`                        |      |                                                |                                                |
| `label`           | `string`                        |      |                                                |                                                |
| `labels`          | `Partial<ImageUploadLabels>`    |      |                                                | Textos de la interfaz; por defecto en español. |
| `maxSizeMB`       | `number`                        |      | `5`                                            |                                                |
| `name`            | `string`                        |      |                                                |                                                |
| `onRemove`        | `() => Promise<void>`           |      |                                                |                                                |
| `previewHeight`   | `number`                        |      | `200`                                          |                                                |
| `previewWidth`    | `number`                        |      | `200`                                          |                                                |
| `required`        | `boolean`                       |      | `false`                                        |                                                |

## DEFAULT_IMAGE_UPLOAD_LABELS

_Sin props documentadas._

Tipos: `ImageUploadProps`, `ImageUploadLabels`.

<!-- catalogo:fin -->
