# IconButton

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Botón de solo icono con variantes, formas, tooltip y etiqueta accesible.

- **Usar cuando:** Acciones compactas en tablas, barras de herramientas o tarjetas (editar, borrar, cerrar).
- **Evitar cuando:** Acciones principales con texto: usa Button.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/icon-button
```

## IconButton

| Prop               | Tipo                                                                                                        | Req. | Por defecto | Descripción |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ---- | ----------- | ----------- |
| `icon`             | `ReactNode`                                                                                                 | sí   |             |             |
| `filled`           | `boolean`                                                                                                   |      | `false`     |             |
| `focusStyleType`   | `"filled" \| "outline" \| "underline"`                                                                      |      | `filled`    |             |
| `focusTriggerType` | `"self" \| "sibling" \| "parent" \| "grandparent"`                                                          |      | `self`      |             |
| `iconPosition`     | `"start" \| "end"`                                                                                          |      | `start`     |             |
| `inverted`         | `boolean`                                                                                                   |      | `false`     |             |
| `label`            | `ReactNode`                                                                                                 |      |             |             |
| `labelPosition`    | `"start" \| "end" \| "top" \| "bottom"`                                                                     |      | `end`       |             |
| `linkStyle`        | `boolean`                                                                                                   |      | `false`     |             |
| `quiet`            | `boolean`                                                                                                   |      | `false`     |             |
| `shape`            | `"rounded" \| "square"`                                                                                     |      | `rounded`   |             |
| `size`             | `"small" \| "medium" \| "sm" \| "md"`                                                                       |      | `medium`    |             |
| `tooltip`          | `ReactNode`                                                                                                 |      |             |             |
| `tooltipPosition`  | `"top" \| "bottom" \| "left" \| "right"`                                                                    |      | `top`       |             |
| `variant`          | `"default" \| "secondary" \| "black" \| "gradient-green" \| "solid-green" \| "blue" \| "pink" \| "warning"` |      | `default`   |             |

Tipos: `IconButtonVariant`, `IconButtonSize`, `IconButtonShape`, `IconButtonFocusStyle`, `IconButtonFocusTrigger`, `IconPosition`, `LabelPosition`, `TooltipPosition`, `IconButtonProps`.

<!-- catalogo:fin -->
