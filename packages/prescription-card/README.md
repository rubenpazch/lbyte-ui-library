# PrescriptionCard

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Tarjeta de receta óptica completa (OD/OI: esfera, cilindro, eje, adición, DNP, prisma, altura) con estado y observaciones.

- **Usar cuando:** Mostrar recetas ópticas en apps de óptica.
- **Evitar cuando:** Cualquier dato que no sea una receta óptica.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/prescription-card
```

## PrescriptionCard

| Prop             | Tipo                                     | Req. | Por defecto | Descripción |
| ---------------- | ---------------------------------------- | ---- | ----------- | ----------- |
| `formatDateLong` | `(dateIso: string) => string`            | sí   |             |             |
| `labels`         | `PrescriptionCardLabels`                 | sí   |             |             |
| `patientId`      | `string \| number`                       | sí   |             |             |
| `prescription`   | `Prescription`                           | sí   |             |             |
| `canEdit`        | `boolean`                                |      | `false`     |             |
| `onEdit`         | `() => void`                             |      |             |             |
| `onOrderFormat`  | `() => void`                             |      |             |             |
| `onPrintFormat`  | `() => void`                             |      |             |             |
| `onView`         | `() => void`                             |      |             |             |
| `onViewDetails`  | `() => void`                             |      |             |             |
| `onWorkOrder`    | `() => void`                             |      |             |             |
| `patientName`    | `string`                                 |      | ``          |             |
| `statusColors`   | `{ color: string; badgeColor: string; }` |      |             |             |
| `statusLabels`   | `PrescriptionCardStatusLabels`           |      |             |             |

<!-- catalogo:fin -->
