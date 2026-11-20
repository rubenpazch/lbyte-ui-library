# PatientSearch

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Buscador de pacientes con resultados y selección.

- **Usar cuando:** Elegir un paciente existente en apps clínicas u ópticas.
- **Evitar cuando:** Buscar otro tipo de registros: usa Autocomplete.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/patient-search
```

## PatientSearch

| Prop                 | Tipo                                                                                                             | Req. | Por defecto | Descripción |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------- |
| `labels`             | `PatientSearchLabels`                                                                                            | sí   |             |             |
| `onSelectPatient`    | `(patient: PatientSearchPatient) => void`                                                                        | sí   |             |             |
| `initialSearchTerm`  | `string`                                                                                                         |      | ``          |             |
| `onCreateNewPatient` | `(searchTerm: string) => void`                                                                                   |      |             |             |
| `onSearchPatients`   | `(searchTerm: string) => Promise<{ patients?: PatientSearchPatient[] \| undefined; } \| PatientSearchPatient[]>` |      |             |             |
| `size`               | `"sm" \| "md" \| "lg"`                                                                                           |      | `md`        |             |

<!-- catalogo:fin -->
