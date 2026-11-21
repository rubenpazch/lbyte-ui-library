# Stepper

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Indicador de pasos numerados (opcionalmente clicables) para procesos en etapas.

- **Usar cuando:** Asistentes y formularios de varios pasos.
- **Evitar cuando:** Navegación entre secciones independientes: usa Tabs.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/stepper
```

## Stepper

| Prop            | Tipo                                                     | Req. | Por defecto | Descripción                                                          |
| --------------- | -------------------------------------------------------- | ---- | ----------- | -------------------------------------------------------------------- |
| `currentStep`   | `number`                                                 | sí   |             |                                                                      |
| `steps`         | `Step[]`                                                 | sí   |             |                                                                      |
| `ariaLabel`     | `string`                                                 |      | `Progreso`  | Nombre accesible de la navegación de pasos (por defecto "Progreso"). |
| `className`     | `string`                                                 |      | ``          |                                                                      |
| `onStepChange`  | `(step: number) => void`                                 |      |             |                                                                      |
| `size`          | `"small" \| "medium" \| "large" \| "sm" \| "md" \| "lg"` |      | `medium`    |                                                                      |
| `stepClickable` | `boolean`                                                |      | `false`     |                                                                      |

<!-- catalogo:fin -->
