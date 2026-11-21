# @rubenpazch/switch

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Interruptor encendido/apagado (role="switch") con etiqueta y descripción.

- **Usar cuando:** Opciones que se activan al instante: notificaciones, módulo activo, mostrar en el sitio.
- **Evitar cuando:** Opciones que se guardan con un botón Enviar o selección múltiple en una lista: usa CheckboxInput.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/switch
```

## Switch

Interruptor encendido/apagado (role="switch") para opciones que se aplican al instante.

| Prop          | Tipo                         | Req. | Por defecto | Descripción                      |
| ------------- | ---------------------------- | ---- | ----------- | -------------------------------- |
| `checked`     | `boolean`                    | sí   |             | Encendido o apagado.             |
| `label`       | `ReactNode`                  | sí   |             | Etiqueta visible a la derecha.   |
| `onChange`    | `(checked: boolean) => void` | sí   |             | Recibe el nuevo estado.          |
| `className`   | `string`                     |      |             | Clase extra.                     |
| `description` | `ReactNode`                  |      |             | Texto de ayuda bajo la etiqueta. |
| `disabled`    | `boolean`                    |      | `false`     | Deshabilitado.                   |
| `id`          | `string`                     |      |             | id del interruptor.              |
| `name`        | `string`                     |      |             | name, para formularios.          |
| `size`        | `"sm" \| "md"`               |      | `md`        | sm o md (por defecto).           |

Tipos: `SwitchProps`.

<!-- catalogo:fin -->
