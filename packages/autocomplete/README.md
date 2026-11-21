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

Selector con búsqueda (combobox accesible): filtra mientras se escribe, teclado completo.

| Prop              | Tipo                                                                                  | Req. | Por defecto             | Descripción                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------- | ---- | ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| `onChange`        | `(value: string \| number \| null, option?: AutocompleteOption \| undefined) => void` | sí   |                         |                                                                                                              |
| `value`           | `null \| string \| number`                                                            | sí   |                         |                                                                                                              |
| `className`       | `string`                                                                              |      | ``                      |                                                                                                              |
| `clearable`       | `boolean`                                                                             |      | `true`                  |                                                                                                              |
| `createLabel`     | `string`                                                                              |      | `Crear`                 |                                                                                                              |
| `debounceMs`      | `number`                                                                              |      | `300`                   |                                                                                                              |
| `disabled`        | `boolean`                                                                             |      | `false`                 |                                                                                                              |
| `error`           | `string`                                                                              |      |                         |                                                                                                              |
| `highlightMatch`  | `boolean`                                                                             |      | `true`                  |                                                                                                              |
| `hint`            | `string`                                                                              |      |                         |                                                                                                              |
| `icon`            | `ReactNode`                                                                           |      |                         |                                                                                                              |
| `id`              | `string`                                                                              |      |                         | id del input; si no se pasa se genera uno.                                                                   |
| `keepListOpen`    | `boolean`                                                                             |      | `false`                 |                                                                                                              |
| `label`           | `string`                                                                              |      |                         |                                                                                                              |
| `labelAction`     | `ReactNode`                                                                           |      |                         | Contenido junto a la etiqueta, a la derecha: un botón de ayuda ("?"), un enlace… No va dentro del `<label>`. |
| `labels`          | `Partial<{ clear: string; open: string; close: string; }>`                            |      |                         | Textos accesibles de los botones.                                                                            |
| `loading`         | `boolean`                                                                             |      | `false`                 |                                                                                                              |
| `loadingText`     | `string`                                                                              |      | `Cargando…`             |                                                                                                              |
| `maxHeight`       | `string`                                                                              |      | `300px`                 |                                                                                                              |
| `minSearchLength` | `number`                                                                              |      | `0`                     |                                                                                                              |
| `name`            | `string`                                                                              |      |                         | name del input.                                                                                              |
| `noResultsText`   | `string`                                                                              |      | `Sin resultados`        |                                                                                                              |
| `onBlur`          | `() => void`                                                                          |      |                         |                                                                                                              |
| `onCreate`        | `(searchTerm: string) => void`                                                        |      |                         |                                                                                                              |
| `onFocus`         | `() => void`                                                                          |      |                         |                                                                                                              |
| `onSearch`        | `(searchTerm: string) => void`                                                        |      |                         |                                                                                                              |
| `options`         | `AutocompleteOption[]`                                                                |      | `[]`                    |                                                                                                              |
| `placeholder`     | `string`                                                                              |      | `Buscar o seleccionar…` |                                                                                                              |
| `position`        | `"bottom" \| "top"`                                                                   |      | `bottom`                |                                                                                                              |
| `readOnly`        | `boolean`                                                                             |      | `false`                 |                                                                                                              |
| `renderOption`    | `(option: AutocompleteOption, isSelected: boolean) => ReactNode`                      |      |                         |                                                                                                              |
| `required`        | `boolean`                                                                             |      | `false`                 |                                                                                                              |
| `searchable`      | `boolean`                                                                             |      | `true`                  |                                                                                                              |
| `warning`         | `string`                                                                              |      |                         |                                                                                                              |

Tipos: `AutocompleteOption`, `AutocompleteProps`.

<!-- catalogo:fin -->
