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

Diálogo de confirmación (alertdialog) sobre Modal: foco retenido, Escape para cancelar y
el foco inicial en "Cancelar", la opción segura.

| Prop          | Tipo         | Req. | Por defecto | Descripción                                                          |
| ------------- | ------------ | ---- | ----------- | -------------------------------------------------------------------- |
| `isOpen`      | `boolean`    | sí   |             | Si el diálogo está abierto.                                          |
| `message`     | `ReactNode`  | sí   |             | Explicación de la consecuencia.                                      |
| `onCancel`    | `() => void` | sí   |             | Al cancelar, pulsar Escape o hacer clic fuera (si no está cargando). |
| `onConfirm`   | `() => void` | sí   |             | Al confirmar.                                                        |
| `title`       | `string`     | sí   |             | Pregunta o título: "¿Eliminar la convocatoria?".                     |
| `cancelText`  | `string`     |      | `Cancelar`  | Texto del botón de cancelar (por defecto "Cancelar").                |
| `children`    | `ReactNode`  |      |             | Contenido extra bajo el mensaje (p. ej. un campo "motivo").          |
| `confirmText` | `string`     |      | `Confirmar` | Texto del botón de confirmar (por defecto "Confirmar").              |
| `isDangerous` | `boolean`    |      | `false`     | Acción destructiva: botón rojo.                                      |
| `isLoading`   | `boolean`    |      | `false`     | Muestra el botón de confirmar cargando y bloquea los botones.        |

Tipos: `ConfirmationDialogProps`.

<!-- catalogo:fin -->
