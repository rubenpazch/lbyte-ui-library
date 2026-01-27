# Button Component - MUI-Aligned Improvements

## Summary of Changes

The Button component has been refactored to align with Material-UI's Button API, making it more standardized and easier to use for developers familiar with MUI.

## Key Improvements

### 1. **Standardized Variants**

- **Before**: Custom variants like `default`, `secondary`, `black`, `gradient-green`, etc.
- **After**: MUI-standard variants:
  - `text` - Text buttons (low emphasis)
  - `contained` - Filled buttons with elevation (high emphasis)
  - `outlined` - Outlined buttons (medium emphasis)

### 2. **Separated Color System**

- **Before**: Colors were mixed into variant names
- **After**: Dedicated `color` prop with standard semantic colors:
  - `primary` - Primary brand color
  - `secondary` - Secondary brand color
  - `success` - Success state (green)
  - `error` - Error/danger state (red)
  - `warning` - Warning state (orange)
  - `info` - Info state (blue)

### 3. **Simplified Size Names**

- **Before**: `sm`, `md`, `lg`
- **After**: `small`, `medium`, `large` (MUI convention)

### 4. **Component Polymorphism**

- **Added**: Support for rendering as link with `href` prop
- **Added**: `component` prop for custom element type
- Example: `<Button href="/home">Go Home</Button>` renders as `<a>` tag

### 5. **Removed Non-Standard Props**

Removed custom props that don't align with standard UI patterns:

- ❌ `filled` - Use `variant="contained"` instead
- ❌ `quiet` - Use `variant="text"` instead
- ❌ `circled` - Use IconButton component instead
- ❌ `inverted` - Use theming instead
- ❌ `focusStyleType` - Handled automatically
- ❌ `focusTriggerType` - Not standard

### 6. **Improved Loading State**

- Loading state now preserves button size (content becomes invisible but maintains layout)
- Spinner is positioned absolutely to prevent layout shift
- Icons are hidden during loading state

### 7. **MUI-Style Elevation**

- Contained buttons now have elevation (box-shadow)
- Added `disableElevation` prop to remove shadows
- Elevation increases on hover and active states

## Migration Guide

### Basic Usage

```tsx
// Before
<Button variant="default" size="md" filled>
  Click Me
</Button>

// After
<Button variant="contained" color="primary" size="medium">
  Click Me
</Button>
```

### Colors

```tsx
// Before
<Button variant="solid-green">Success</Button>
<Button variant="warning">Warning</Button>

// After
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="warning">Warning</Button>
```

### Text/Quiet Buttons

```tsx
// Before
<Button quiet>Click</Button>

// After
<Button variant="text">Click</Button>
```

### Outlined Buttons

```tsx
// Before
<Button variant="default">Click</Button>

// After
<Button variant="outlined" color="primary">Click</Button>
```

### Sizes

```tsx
// Before
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// After
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

### Link Buttons

```tsx
// New feature!
<Button href="https://example.com" target="_blank">
  Visit Site
</Button>
```

## API Reference

### Props

| Prop               | Type                                                                      | Default     | Description                                        |
| ------------------ | ------------------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `variant`          | `"text" \| "contained" \| "outlined"`                                     | `"text"`    | The visual style of the button                     |
| `color`            | `"primary" \| "secondary" \| "success" \| "error" \| "warning" \| "info"` | `"primary"` | The color theme                                    |
| `size`             | `"small" \| "medium" \| "large"`                                          | `"medium"`  | The size of the button                             |
| `disabled`         | `boolean`                                                                 | `false`     | If true, the button is disabled                    |
| `loading`          | `boolean`                                                                 | `false`     | If true, shows loading spinner and disables button |
| `fullWidth`        | `boolean`                                                                 | `false`     | If true, button takes full width of container      |
| `disableElevation` | `boolean`                                                                 | `false`     | If true, removes box-shadow from contained variant |
| `startIcon`        | `ReactNode`                                                               | -           | Icon element to display before text                |
| `endIcon`          | `ReactNode`                                                               | -           | Icon element to display after text                 |
| `href`             | `string`                                                                  | -           | If provided, renders as `<a>` tag                  |
| `component`        | `"button" \| "a"`                                                         | Auto        | Override the root element type                     |

## Examples

### All Variants

```tsx
<Button variant="text">Text</Button>
<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
```

### All Colors (Contained)

```tsx
<Button variant="contained" color="primary">Primary</Button>
<Button variant="contained" color="secondary">Secondary</Button>
<Button variant="contained" color="success">Success</Button>
<Button variant="contained" color="error">Error</Button>
<Button variant="contained" color="warning">Warning</Button>
<Button variant="contained" color="info">Info</Button>
```

### With Icons

```tsx
import { DeleteIcon, SendIcon } from '@rubenpazch/icons';

<Button startIcon={<DeleteIcon />}>Delete</Button>
<Button endIcon={<SendIcon />}>Send</Button>
```

### Loading State

```tsx
<Button loading>Loading...</Button>
<Button loading startIcon={<SendIcon />}>Submitting</Button>
```

### Full Width

```tsx
<Button variant="contained" fullWidth>
  Full Width Button
</Button>
```

### As Link

```tsx
<Button href="/dashboard">Dashboard</Button>
<Button href="https://example.com" target="_blank" rel="noopener">
  External Link
</Button>
```

## Benefits of These Changes

1. **Familiarity**: Developers familiar with MUI will immediately understand the API
2. **Consistency**: Aligns with industry-standard component patterns
3. **Flexibility**: Color and variant are independent, creating more combinations
4. **Accessibility**: Better semantic HTML with link support
5. **Maintainability**: Simpler, more predictable codebase
6. **Documentation**: Easier to document with standard terminology

## Backward Compatibility

⚠️ **Breaking Changes**: This is a major version update (4.0.0) with breaking API changes. Please update your code according to the migration guide above.
