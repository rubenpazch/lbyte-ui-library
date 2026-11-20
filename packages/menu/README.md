# @rubenpazch/menu

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Menú de acciones (role="menu") con botón ⋮ por defecto, opciones con icono, peligrosas o deshabilitadas, teclado completo.

- **Usar cuando:** Acciones secundarias de una fila o tarjeta: Editar, Duplicar, Anular, Eliminar.
- **Evitar cuando:** La acción principal: usa Button. Navegación del sitio: usa AppShell o enlaces.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/menu
```

## Menu

Menú de acciones (role="menu"): ⋮ con Editar, Duplicar, Eliminar… Flechas, Inicio, Fin,
Enter y Escape; se cierra al elegir o al hacer clic fuera.

| Prop      | Tipo               | Req. | Por defecto    | Descripción                                                                    |
| --------- | ------------------ | ---- | -------------- | ------------------------------------------------------------------------------ |
| `items`   | `MenuItem[]`       | sí   |                | Opciones del menú.                                                             |
| `align`   | `"start" \| "end"` |      | `end`          | Alineación del panel respecto al botón: end (por defecto) o start.             |
| `label`   | `string`           |      | `Más opciones` | Texto accesible del botón por defecto (por defecto "Más opciones").            |
| `trigger` | `ReactNode`        |      |                | Botón que lo abre. Por defecto un botón "⋮" con el texto accesible de `label`. |

Tipos: `MenuProps`, `MenuItem`.

<!-- catalogo:fin -->
