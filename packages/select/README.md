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

| Prop          | Tipo                      | Req. | Por defecto | Descripción                                                                                                  |
| ------------- | ------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `onChange`    | `(value: string) => void` | sí   |             |                                                                                                              |
| `options`     | `SelectOption[]`          | sí   |             |                                                                                                              |
| `value`       | `string`                  | sí   |             |                                                                                                              |
| `className`   | `string`                  |      |             |                                                                                                              |
| `disabled`    | `boolean`                 |      | `false`     |                                                                                                              |
| `error`       | `string`                  |      |             |                                                                                                              |
| `hint`        | `string`                  |      |             | Texto de ayuda bajo el campo.                                                                                |
| `id`          | `string`                  |      |             |                                                                                                              |
| `label`       | `string`                  |      |             |                                                                                                              |
| `labelAction` | `ReactNode`               |      |             | Contenido junto a la etiqueta, a la derecha: un botón de ayuda ("?"), un enlace… No va dentro del `<label>`. |
| `name`        | `string`                  |      |             |                                                                                                              |
| `placeholder` | `string`                  |      |             |                                                                                                              |
| `required`    | `boolean`                 |      | `false`     |                                                                                                              |

Tipos: `SelectOption`, `SelectProps`.

<!-- catalogo:fin -->
