# Toast

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Notificaciones temporales (Toast) y avisos fijos (ToastBanner) con tipos y acciones.

- **Usar cuando:** Confirmar que algo se guardó o avisar un error sin interrumpir.
- **Evitar cuando:** Pedir una decisión: usa ConfirmationDialog.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/toast
```

## ToastBanner

| Prop             | Tipo                   | Req. | Por defecto           | Descripción |
| ---------------- | ---------------------- | ---- | --------------------- | ----------- |
| `onClose`        | `(id: string) => void` | sí   |                       |             |
| `toasts`         | `ToastItem[]`          | sí   |                       |             |
| `className`      | `string`               |      |                       |             |
| `closeAriaLabel` | `string`               |      | `Cerrar notificación` |             |

Tipos: `ToastAction`, `ToastBannerProps`, `ToastItem`, `ToastType`.

<!-- catalogo:fin -->
