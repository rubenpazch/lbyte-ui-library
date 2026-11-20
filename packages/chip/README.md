# Chip

A flexible and accessible Chip component inspired by Material UI.

## Installation

```bash
pnpm add @rubenpazch/chip
```

## Usage

```tsx
import Chip from "@rubenpazch/chip";

function MyComponent() {
  return <Chip label="Active" color="primary" />;
}
```

## Props

- **label**: React.ReactNode - Content displayed inside the chip
- **variant**: "filled" | "outlined" | "soft" - Visual style
- **color**: "default" | "primary" | "success" | "warning" | "error" | "info" - Color theme
- **size**: "sm" | "md" - Size of the chip
- **icon**: React.ReactNode - Icon rendered before the label
- **avatar**: React.ReactNode - Avatar or custom element shown at the start
- **onDelete**: (event) => void - Callback fired when delete icon is clicked
- **deleteIcon**: React.ReactNode - Custom delete icon element
- **clickable**: boolean - Whether the chip behaves like a button
- **disabled**: boolean - Disabled state
- **selected**: boolean - Selected/pressed state

## Examples

### Basic Chip

```tsx
<Chip label="Active" />
```

### Deletable Chip

```tsx
<Chip label="React" onDelete={() => {}} />
```

### Clickable Chip

```tsx
<Chip label="Click me" clickable onClick={() => alert("Clicked!")} />
```

### With Icon

```tsx
import { CheckIcon } from "@rubenpazch/icons";
<Chip label="Completed" icon={<CheckIcon />} color="success" />;
```

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Chip/etiqueta con variantes, icono y acción de borrar.

- **Usar cuando:** Estados, etiquetas, filtros activos o valores seleccionados que se pueden quitar.
- **Evitar cuando:** Acciones principales: usa Button.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/chip
```

## Chip

| Prop              | Tipo                                                                    | Req. | Por defecto | Descripción                                    |
| ----------------- | ----------------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------- |
| `avatar`          | `ReactNode`                                                             |      |             | Avatar or custom element shown at the start    |
| `clickable`       | `boolean`                                                               |      | `false`     | Whether the chip behaves like a button         |
| `color`           | `"default" \| "primary" \| "success" \| "warning" \| "error" \| "info"` |      | `default`   | Color theme for the chip                       |
| `component`       | `ElementType<any, keyof IntrinsicElements>`                             |      |             | Override root component                        |
| `deleteAriaLabel` | `string`                                                                |      | `Quitar`    | Accessible label for the delete button         |
| `deleteIcon`      | `ReactNode`                                                             |      |             | Custom delete icon element                     |
| `disabled`        | `boolean`                                                               |      | `false`     | Disabled state                                 |
| `icon`            | `ReactNode`                                                             |      |             | Leading icon rendered before the label         |
| `label`           | `ReactNode`                                                             |      |             | Content shown inside the chip                  |
| `onDelete`        | `(event: MouseEvent<HTMLButtonElement, MouseEvent>) => void`            |      |             | Callback fired when the delete icon is clicked |
| `selected`        | `boolean`                                                               |      | `false`     | Selected/pressed state for toggleable chips    |
| `size`            | `"sm" \| "md"`                                                          |      | `md`        | Chip size                                      |
| `variant`         | `"filled" \| "outlined" \| "soft"`                                      |      | `filled`    | Visual style for the chip                      |

Tipos: `ChipVariant`, `ChipColor`, `ChipSize`, `ChipProps`.

<!-- catalogo:fin -->
