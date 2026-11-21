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

## ToastProvider

Mensajes del servidor dentro de la app (usuario con sesión). `AppShell` ya lo incluye y los
muestra bajo su cabecera; úsalo directamente solo en un layout propio.

En pantallas públicas (login, registro, recuperación) NO se usa: ahí el mensaje va junto al
formulario. Por eso `useToast()` falla fuera de un proveedor.

| Prop             | Tipo                     | Req. | Por defecto      | Descripción                                                                                                                                                                                             |
| ---------------- | ------------------------ | ---- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `closeAriaLabel` | `string`                 |      | `Cerrar mensaje` | Texto accesible del botón ×.                                                                                                                                                                            |
| `offsetTop`      | `string`                 |      |                  | Distancia desde arriba en modo `floating`.                                                                                                                                                              |
| `placement`      | `"floating" \| "inline"` |      | `floating`       | `floating` (por defecto): flotan arriba a la derecha. `inline`: no se pintan aquí; el layout pone `<ToastRegion />` en su sitio (AppShell lo hace bajo su cabecera, sin tapar el menú ni el contenido). |

## ToastRegion

Pinta los toasts de un `ToastProvider placement="inline"` en el lugar del layout donde se ponga.

| Prop        | Tipo     | Req. | Por defecto | Descripción |
| ----------- | -------- | ---- | ----------- | ----------- |
| `className` | `string` |      |             |             |

Otras exportaciones: `useToast`.

Tipos: `ToastAction`, `ToastBannerProps`, `ToastItem`, `ToastType`, `ToastApi`, `ToastOptions`, `ToastProviderProps`.

<!-- catalogo:fin -->
