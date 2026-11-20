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

| Prop                           | Tipo                                             | Req. | Por defecto | Descripción |
| ------------------------------ | ------------------------------------------------ | ---- | ----------- | ----------- |
| `documentType`                 | `null \| "dni" \| "ce" \| "passport"`            | sí   |             |             |
| `identificationNumber`         | `string`                                         | sí   |             |             |
| `labels`                       | `IdentificationInputLabels`                      | sí   |             |             |
| `onDocumentTypeChange`         | `(type: PeruIdentificationType \| null) => void` | sí   |             |             |
| `onIdentificationNumberChange` | `(value: string) => void`                        | sí   |             |             |
| `className`                    | `string`                                         |      | ``          |             |
| `disabled`                     | `boolean`                                        |      | `false`     |             |
| `documentTypeError`            | `string`                                         |      |             |             |
| `identificationNumberError`    | `string`                                         |      |             |             |
| `required`                     | `boolean`                                        |      | `false`     |             |

<!-- catalogo:fin -->
