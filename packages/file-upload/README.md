# @rubenpazch/file-upload

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Zona para subir uno o varios archivos (arrastrar y soltar o elegir), con validación de tipo, tamaño y cantidad, y lista para quitarlos.

- **Usar cuando:** Adjuntar documentos o archivos en un formulario.
- **Evitar cuando:** Una sola imagen con vista previa (logo, foto): usa ImageUpload.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/file-upload
```

## FileUpload

Zona para subir uno o varios archivos: arrastrar y soltar o "Elegir archivos" (teclado).
Valida tipo, tamaño, cantidad y duplicados; los rechazados se informan en la zona y por `onReject`.
No sube nada: entrega los `File` a la app, que decide cuándo y cómo enviarlos.

| Prop        | Tipo                                    | Req. | Por defecto | Descripción                                                                           |
| ----------- | --------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------- |
| `onChange`  | `(files: File[]) => void`               | sí   |             | Nueva lista de archivos (agregados o quitados).                                       |
| `value`     | `File[]`                                | sí   |             | Archivos elegidos (controlado).                                                       |
| `accept`    | `string`                                |      |             | Tipos aceptados como en `<input accept>`: ".pdf,.docx", "image/*", "application/pdf". |
| `className` | `string`                                |      |             |                                                                                       |
| `disabled`  | `boolean`                               |      | `false`     |                                                                                       |
| `error`     | `string`                                |      |             | Error externo (validación del formulario).                                            |
| `hint`      | `string`                                |      |             |                                                                                       |
| `id`        | `string`                                |      |             |                                                                                       |
| `label`     | `string`                                |      |             |                                                                                       |
| `labels`    | `Partial<FileUploadLabels>`             |      |             |                                                                                       |
| `maxFiles`  | `number`                                |      |             | Máximo de archivos (por defecto sin límite).                                          |
| `maxSizeMB` | `number`                                |      |             | Tamaño máximo por archivo en MB.                                                      |
| `multiple`  | `boolean`                               |      | `true`      | Permitir varios archivos (por defecto sí).                                            |
| `name`      | `string`                                |      |             |                                                                                       |
| `onReject`  | `(rejections: FileRejection[]) => void` |      |             | Archivos que no se aceptaron y por qué (para avisar o registrar).                     |
| `required`  | `boolean`                               |      | `false`     |                                                                                       |

## DEFAULT_FILE_UPLOAD_LABELS

_Sin props documentadas._

Otras exportaciones: `aceptaArchivo`.

Tipos: `FileRejection`, `FileUploadLabels`, `FileUploadProps`.

<!-- catalogo:fin -->
