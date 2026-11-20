# Autocomplete

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Selector con búsqueda sobre una lista de opciones (con descripción, carga y opción de limpiar).

- **Usar cuando:** Elegir un valor entre muchas opciones (más de ~8) o cuando el usuario necesita filtrar escribiendo.
- **Evitar cuando:** Pocas opciones fijas: usa Select o RadioGroup.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/autocomplete
```

## Autocomplete

| Prop              | Tipo                                                                                  | Req. | Por defecto           | Descripción |
| ----------------- | ------------------------------------------------------------------------------------- | ---- | --------------------- | ----------- |
| `onChange`        | `(value: string \| number \| null, option?: AutocompleteOption \| undefined) => void` | sí   |                       |             |
| `value`           | `null \| string \| number`                                                            | sí   |                       |             |
| `className`       | `string`                                                                              |      | ``                    |             |
| `clearable`       | `boolean`                                                                             |      | `true`                |             |
| `createLabel`     | `string`                                                                              |      | `Create`              |             |
| `debounceMs`      | `number`                                                                              |      | `300`                 |             |
| `disabled`        | `boolean`                                                                             |      | `false`               |             |
| `error`           | `string`                                                                              |      |                       |             |
| `highlightMatch`  | `boolean`                                                                             |      | `true`                |             |
| `hint`            | `string`                                                                              |      |                       |             |
| `icon`            | `ReactNode`                                                                           |      |                       |             |
| `keepListOpen`    | `boolean`                                                                             |      | `false`               |             |
| `label`           | `string`                                                                              |      |                       |             |
| `loading`         | `boolean`                                                                             |      | `false`               |             |
| `loadingText`     | `string`                                                                              |      | `Loading...`          |             |
| `maxHeight`       | `string`                                                                              |      | `300px`               |             |
| `minSearchLength` | `number`                                                                              |      | `0`                   |             |
| `noResultsText`   | `string`                                                                              |      | `No results found`    |             |
| `onBlur`          | `() => void`                                                                          |      |                       |             |
| `onCreate`        | `(searchTerm: string) => void`                                                        |      |                       |             |
| `onFocus`         | `() => void`                                                                          |      |                       |             |
| `onSearch`        | `(searchTerm: string) => void`                                                        |      |                       |             |
| `options`         | `AutocompleteOption[]`                                                                |      | `[]`                  |             |
| `placeholder`     | `string`                                                                              |      | `Search or select...` |             |
| `position`        | `"bottom" \| "top"`                                                                   |      | `bottom`              |             |
| `readOnly`        | `boolean`                                                                             |      | `false`               |             |
| `renderOption`    | `(option: AutocompleteOption, isSelected: boolean) => ReactNode`                      |      |                       |             |
| `required`        | `boolean`                                                                             |      | `false`               |             |
| `searchable`      | `boolean`                                                                             |      | `true`                |             |
| `warning`         | `string`                                                                              |      |                       |             |

<!-- catalogo:fin -->
