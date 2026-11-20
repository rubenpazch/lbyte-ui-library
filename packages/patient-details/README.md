# PatientDetails

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Ficha de paciente: identificación, contacto, contacto de emergencia, ubicación (departamento/provincia/distrito) e historia clínica. Textos por la prop labels.

- **Usar cuando:** Apps clínicas u ópticas que muestran el detalle de un paciente.
- **Evitar cuando:** Personas que no son pacientes: usa InfoRow.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/patient-details
```

## PatientDetails

| Prop                    | Tipo                          | Req. | Por defecto | Descripción |
| ----------------------- | ----------------------------- | ---- | ----------- | ----------- |
| `formatDate`            | `(dateIso: string) => string` | sí   |             |             |
| `formatDateTime`        | `(dateIso: string) => string` | sí   |             |             |
| `labels`                | `PatientDetailsLabels`        | sí   |             |             |
| `onClose`               | `() => void`                  | sí   |             |             |
| `patient`               | `PatientDetailsPatient`       | sí   |             |             |
| `defaultShowMoreInfo`   | `boolean`                     |      | `false`     |             |
| `onEdit`                | `() => void`                  |      |             |             |
| `onViewProfile`         | `() => void`                  |      |             |             |
| `onViewSubscriptions`   | `() => void`                  |      |             |             |
| `showEditButton`        | `boolean`                     |      | `false`     |             |
| `showViewProfileButton` | `boolean`                     |      | `true`      |             |
| `ubigeoResolved`        | `PatientDetailsUbigeo`        |      |             |             |

<!-- catalogo:fin -->
