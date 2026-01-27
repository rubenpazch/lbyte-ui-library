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
