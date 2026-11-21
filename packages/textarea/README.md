# @rubenpazch/textarea

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Área de texto con etiqueta, ayuda, advertencia, error, contador de caracteres y crecimiento automático.

- **Usar cuando:** Textos de varias líneas: observaciones, motivos de anulación, descripciones.
- **Evitar cuando:** Una sola línea: usa TextInput. Texto con formato (negritas, enlaces, imágenes): usa RichTextEditor.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/textarea
```

## Textarea

Área de texto con etiqueta, ayuda, error, contador y crecimiento automático.

| Prop         | Tipo                      | Req. | Por defecto | Descripción                                                                  |
| ------------ | ------------------------- | ---- | ----------- | ---------------------------------------------------------------------------- |
| `onChange`   | `(value: string) => void` | sí   |             | Recibe el texto nuevo.                                                       |
| `value`      | `string`                  | sí   |             | Texto actual.                                                                |
| `autoResize` | `boolean`                 |      | `false`     | Crece con el contenido hasta maxRows.                                        |
| `className`  | `string`                  |      |             | Clase extra para el contenedor (márgenes, ancho).                            |
| `disabled`   | `boolean`                 |      | `false`     | Campo deshabilitado.                                                         |
| `error`      | `string`                  |      |             | Mensaje de error; marca el campo como inválido.                              |
| `hint`       | `string`                  |      |             | Texto de ayuda bajo el campo.                                                |
| `id`         | `string`                  |      |             | id del control. Si no se pasa, se genera uno.                                |
| `label`      | `string`                  |      |             | Etiqueta visible del campo (se asocia al control para lectores de pantalla). |
| `maxRows`    | `number`                  |      | `12`        | Máximo de filas al crecer (por defecto 12).                                  |
| `name`       | `string`                  |      |             | name del control (formularios nativos y librerías de formularios).           |
| `required`   | `boolean`                 |      | `false`     | Campo obligatorio: muestra * y marca el control como requerido.              |
| `rows`       | `number`                  |      | `4`         | Filas visibles al inicio (por defecto 4).                                    |
| `showCount`  | `boolean`                 |      | `true`      | Muestra el contador "120/500" cuando hay maxLength.                          |
| `warning`    | `string`                  |      |             | Advertencia (no bloquea).                                                    |

Tipos: `TextareaProps`.

<!-- catalogo:fin -->
