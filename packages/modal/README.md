# @rubenpazch/modal

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Ventana modal accesible: portal, foco retenido, Escape y clic fuera para cerrar, bloqueo del scroll, título y descripción anunciados.

- **Usar cuando:** Formularios cortos o detalles que requieren atención sin cambiar de página (editar un registro, ver un detalle).
- **Evitar cuando:** Confirmar una acción: usa ConfirmationDialog. Formularios largos o navegación lateral: usa Drawer.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/modal
```

## Modal

Ventana modal accesible: se monta en un portal, retiene el foco, bloquea el scroll de la
página y se cierra con Escape. Para confirmar acciones usa ConfirmationDialog.

| Prop                  | Tipo                                     | Req. | Por defecto | Descripción                                                                       |
| --------------------- | ---------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------- |
| `onClose`             | `() => void`                             | sí   |             | Se llama al pedir cierre: botón ×, Escape o clic en el fondo.                     |
| `open`                | `boolean`                                | sí   |             | Si el modal está abierto.                                                         |
| `children`            | `ReactNode`                              |      |             | Contenido del modal.                                                              |
| `className`           | `string`                                 |      |             | Clase extra para la caja del modal.                                               |
| `closeLabel`          | `string`                                 |      | `Cerrar`    | Texto accesible del botón ×.                                                      |
| `closeOnEscape`       | `boolean`                                |      | `true`      | Cerrar con Escape (por defecto sí).                                               |
| `closeOnOverlayClick` | `boolean`                                |      | `true`      | Cerrar al hacer clic en el fondo (por defecto sí).                                |
| `description`         | `ReactNode`                              |      |             | Texto bajo el título (se anuncia como descripción).                               |
| `footer`              | `ReactNode`                              |      |             | Pie: normalmente los botones de acción.                                           |
| `role`                | `"dialog" \| "alertdialog"`              |      | `dialog`    | Rol del diálogo: `alertdialog` para confirmaciones que exigen respuesta.          |
| `showCloseButton`     | `boolean`                                |      | `true`      | Mostrar el botón × (por defecto sí).                                              |
| `size`                | `"sm" \| "md" \| "lg" \| "xl" \| "full"` |      | `md`        | Ancho máximo: sm (400px), md (520px, por defecto), lg (720px), xl (960px) o full. |
| `title`               | `ReactNode`                              |      |             | Título (se anuncia como nombre del diálogo).                                      |

Tipos: `ModalProps`, `ModalSize`.

<!-- catalogo:fin -->
