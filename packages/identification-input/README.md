# IdentificationInput

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Tipo y número de documento peruano (DNI, CE, pasaporte) con validación de longitud y formato.

- **Usar cuando:** Registrar el documento de identidad de una persona en Perú.
- **Evitar cuando:** Otros países o identificadores que no son documentos de identidad.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/identification-input
```

## IdentificationInput

El `ref` apunta al campo del número de documento.

| Prop                           | Tipo                                             | Req. | Por defecto | Descripción                                              |
| ------------------------------ | ------------------------------------------------ | ---- | ----------- | -------------------------------------------------------- |
| `documentType`                 | `null \| "dni" \| "ce" \| "passport"`            | sí   |             |                                                          |
| `identificationNumber`         | `string`                                         | sí   |             |                                                          |
| `onDocumentTypeChange`         | `(type: PeruIdentificationType \| null) => void` | sí   |             |                                                          |
| `onIdentificationNumberChange` | `(value: string) => void`                        | sí   |             |                                                          |
| `className`                    | `string`                                         |      | ``          |                                                          |
| `disabled`                     | `boolean`                                        |      | `false`     |                                                          |
| `documentTypeError`            | `string`                                         |      |             |                                                          |
| `id`                           | `string`                                         |      |             | Prefijo de los ids de ambos campos.                      |
| `identificationNumberError`    | `string`                                         |      |             |                                                          |
| `labels`                       | `Partial<IdentificationInputLabels>`             |      |             | Textos de la interfaz; por defecto en español.           |
| `name`                         | `string`                                         |      |             | `name` del campo de número (el tipo usa `${name}-tipo`). |
| `required`                     | `boolean`                                        |      | `false`     |                                                          |

## DEFAULT_IDENTIFICATION_LABELS

_Sin props documentadas._

<!-- catalogo:fin -->
