# @rubenpazch/segmented-control

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Botones unidos para elegir una opción entre pocas (radiogroup con flechas del teclado): Personal | Empresa, Mes | Año.

- **Usar cuando:** Cambiar la vista o un filtro con 2 a 5 opciones cortas, siempre visibles.
- **Evitar cuando:** Opciones largas o dentro de un formulario con etiqueta: usa RadioGroup. Muchas opciones: usa Select.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/segmented-control
```

## SegmentedControl

Selector de una opción entre pocas, como botones unidos (role="radiogroup"). Se mueve con
las flechas del teclado. Ej.: Personal | Empresa, Mes | Año.

| Prop         | Tipo                   | Req. | Por defecto | Descripción                                    |
| ------------ | ---------------------- | ---- | ----------- | ---------------------------------------------- |
| `aria-label` | `string`               | sí   |             | Nombre accesible del grupo: "Ámbito", "Vista". |
| `onChange`   | `(value: T) => void`   | sí   |             | Recibe el valor elegido.                       |
| `options`    | `SegmentedOption<T>[]` | sí   |             | Opciones (2 a 5 funcionan mejor).              |
| `value`      | `string`               | sí   |             | Valor seleccionado.                            |
| `className`  | `string`               |      |             | Clase extra.                                   |
| `fullWidth`  | `boolean`              |      | `false`     | Ocupa todo el ancho.                           |
| `size`       | `"sm" \| "md"`         |      | `md`        | sm o md (por defecto).                         |

Tipos: `SegmentedControlProps`, `SegmentedOption`.

<!-- catalogo:fin -->
