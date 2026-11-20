# ConfirmationDialog

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Diálogo modal de confirmación (aceptar/cancelar).

- **Usar cuando:** Confirmar acciones destructivas o irreversibles (eliminar, anular, cerrar periodo).
- **Evitar cuando:** Mostrar formularios o contenido largo: usa Drawer.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/confirmation-dialog
```

## ConfirmationDialog

| Prop          | Tipo         | Req. | Por defecto | Descripción |
| ------------- | ------------ | ---- | ----------- | ----------- |
| `isOpen`      | `boolean`    | sí   |             |             |
| `message`     | `string`     | sí   |             |             |
| `onCancel`    | `() => void` | sí   |             |             |
| `onConfirm`   | `() => void` | sí   |             |             |
| `title`       | `string`     | sí   |             |             |
| `cancelText`  | `string`     |      | `Cancel`    |             |
| `confirmText` | `string`     |      | `Confirm`   |             |
| `isDangerous` | `boolean`    |      | `false`     |             |
| `isLoading`   | `boolean`    |      | `false`     |             |

<!-- catalogo:fin -->
