# @rubenpazch/select

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Lista desplegable simple con etiqueta, placeholder y error.

- **Usar cuando:** Elegir una opción entre una lista corta y conocida.
- **Evitar cuando:** Listas largas o con búsqueda: usa Autocomplete.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/select
```

## Select

| Prop          | Tipo                      | Req. | Por defecto | Descripción |
| ------------- | ------------------------- | ---- | ----------- | ----------- |
| `onChange`    | `(value: string) => void` | sí   |             |             |
| `options`     | `SelectOption[]`          | sí   |             |             |
| `value`       | `string`                  | sí   |             |             |
| `className`   | `string`                  |      |             |             |
| `disabled`    | `boolean`                 |      | `false`     |             |
| `error`       | `string`                  |      |             |             |
| `id`          | `string`                  |      |             |             |
| `label`       | `string`                  |      |             |             |
| `name`        | `string`                  |      |             |             |
| `placeholder` | `string`                  |      |             |             |
| `required`    | `boolean`                 |      | `false`     |             |

Tipos: `SelectOption`, `SelectProps`.

<!-- catalogo:fin -->
