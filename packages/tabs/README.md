# Tabs

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Pestañas para alternar entre secciones de una misma vista.

- **Usar cuando:** Separar contenido relacionado en la misma página (datos, historial, archivos).
- **Evitar cuando:** Procesos secuenciales: usa Stepper.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/tabs
```

## Tabs

| Prop               | Tipo                                       | Req. | Por defecto  | Descripción                                                           |
| ------------------ | ------------------------------------------ | ---- | ------------ | --------------------------------------------------------------------- |
| `tabs`             | `Tab[]`                                    | sí   |              |                                                                       |
| `ariaLabel`        | `string`                                   |      | `Pestañas`   | Nombre accesible del grupo de pestañas (por defecto "Pestañas").      |
| `className`        | `string`                                   |      |              |                                                                       |
| `defaultTab`       | `string`                                   |      |              |                                                                       |
| `lazy`             | `boolean`                                  |      | `false`      | Lazy mode - only calls onLoad when tab is first visited               |
| `loading`          | `boolean`                                  |      | `false`      | Loading state for the active tab content                              |
| `loadingComponent` | `ReactNode`                                |      |              | Custom loading component                                              |
| `onChange`         | `(tabId: string) => void`                  |      |              |                                                                       |
| `onLoad`           | `(tabId: string) => void \| Promise<void>` |      |              | Called when a tab is activated. Use for lazy loading data             |
| `orientation`      | `"horizontal" \| "vertical"`               |      | `horizontal` | Orientation of tabs - horizontal (default) or vertical (left-aligned) |
| `renderContent`    | `(tabId: string) => ReactNode`             |      |              | Render function for tab content (alternative to content prop in Tab)  |

<!-- catalogo:fin -->
