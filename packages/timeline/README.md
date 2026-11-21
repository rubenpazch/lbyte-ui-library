# @rubenpazch/timeline

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Línea de tiempo vertical: historial de un trámite, pedido o expediente (eventos con estado, fecha y descripción).

- **Usar cuando:** Mostrar el historial o seguimiento de algo en orden cronológico.
- **Evitar cuando:** Pasos de un proceso que el usuario recorre ahora: usa Stepper.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/timeline
```

## Timeline

Línea de tiempo vertical: historial de un trámite, pedido o expediente, en orden.
Genérica: el significado de cada estado lo decide la app (p. ej. un envoltorio local que
convierte los estados del trámite en `items`).

| Prop            | Tipo             | Req. | Por defecto            | Descripción                                                         |
| --------------- | ---------------- | ---- | ---------------------- | ------------------------------------------------------------------- |
| `items`         | `TimelineItem[]` | sí   |                        |                                                                     |
| `aria-label`    | `string`         |      |                        | Nombre accesible de la lista, p. ej. "Historial del trámite".       |
| `className`     | `string`         |      |                        |                                                                     |
| `dense`         | `boolean`        |      | `false`                | Más compacto (menos espacio entre eventos).                         |
| `emptyText`     | `ReactNode`      |      | `Sin eventos todavía.` | Texto cuando no hay eventos.                                        |
| `highlightLast` | `boolean`        |      | `false`                | El último evento se marca como el estado actual (anillo y negrita). |

Tipos: `TimelineItem`, `TimelineProps`, `TimelineStatus`.

<!-- catalogo:fin -->
