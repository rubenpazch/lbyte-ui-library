# @rubenpazch/alert

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Aviso dentro de la página (info, success, warning, danger) con título, acción y cierre opcional.

- **Usar cuando:** Mensajes que deben quedar visibles en la página: errores de carga, advertencias de un formulario, avisos de estado.
- **Evitar cuando:** Confirmaciones pasajeras ("Guardado"): usa Toast. Pedir una decisión: usa ConfirmationDialog.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/alert
```

## Alert

Aviso dentro de la página (no flotante): información, éxito, advertencia o error.
`warning` y `danger` se anuncian de inmediato (role="alert"); el resto como estado.

| Prop         | Tipo                                           | Req. | Por defecto    | Descripción                                                          |
| ------------ | ---------------------------------------------- | ---- | -------------- | -------------------------------------------------------------------- |
| `action`     | `ReactNode`                                    |      |                | Acción a la derecha o abajo (p. ej. un Button "Reintentar").         |
| `children`   | `ReactNode`                                    |      |                | Texto del aviso.                                                     |
| `className`  | `string`                                       |      |                | Clase extra.                                                         |
| `closeLabel` | `string`                                       |      | `Cerrar aviso` | Texto accesible del botón ×.                                         |
| `icon`       | `ReactNode`                                    |      |                | Icono propio; `false` para ocultarlo. Por defecto uno según el tipo. |
| `onClose`    | `() => void`                                   |      |                | Si se pasa, muestra el botón × y se llama al cerrarlo.               |
| `title`      | `ReactNode`                                    |      |                | Título en negrita (opcional).                                        |
| `variant`    | `"info" \| "success" \| "warning" \| "danger"` |      | `info`         | Tipo de mensaje: info (por defecto), success, warning o danger.      |

Tipos: `AlertProps`, `AlertVariant`.

<!-- catalogo:fin -->
