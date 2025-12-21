import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NumericUpPicker, { type NumericUpPickerProps } from "./NumericUpPicker";
import {
  NumericUpPickerWithState,
  NumericUpPickerWithErrorValidation,
  NumericUpPickerWithWarning,
  NumericUpPickerInteractive,
  PrescriptionForm,
  NumericUpPickerWithErrorRecovery,
  NumericUpPickerShowSign,
  NumericUpPickerAlwaysNegative,
  NumericUpPickerIntegerOnly,
} from "./NumericUpPicker.stories.helpers";

const meta: Meta<NumericUpPickerProps> = {
  component: NumericUpPicker,
  title: "Components/NumericUpPicker",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
A versatile numeric input component with increment/decrement buttons and comprehensive validation.

**Key Features:**
- 🎯 Increment/Decrement buttons for easy value adjustment
- ⌨️ Keyboard arrow keys (↑/↓) support for quick adjustments
- 🔢 Auto-formatting to 2 decimal places (configurable with integerOnly)
- 📏 Min/max constraints with visual feedback
- ✅ Required field support with validation
- 🎨 Error, warning, and hint message display
- ➕ Always show sign mode (for positive/negative values)
- ➖ Always negative mode (for cylinder values)
- 🔢 Integer-only mode (no decimals)
- 🎯 Use min as default mode (auto-adjust below minimum)
- ❌ Clearable option with close button
- ♿ Full accessibility support with ARIA labels
- 🎨 Disabled state with proper visual feedback
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current numeric value (string or number)",
      table: { type: { summary: "string | number" } },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when value changes",
      table: { type: { summary: "(value: string) => void" } },
    },
    label: {
      control: "text",
      description: "Label text displayed above the input",
      table: { type: { summary: "string" } },
    },
    min: {
      control: "number",
      description: "Minimum allowed value",
      table: { type: { summary: "number" } },
    },
    max: {
      control: "number",
      description: "Maximum allowed value",
      table: { type: { summary: "number" } },
    },
    step: {
      control: "number",
      description: "Step value for increment/decrement",
      table: { type: { summary: "number" }, defaultValue: { summary: "0.01" } },
    },
    required: {
      control: "boolean",
      description: "Whether the field is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the field is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    integerOnly: {
      control: "boolean",
      description: "Only allow integer values (no decimals)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showSign: {
      control: "boolean",
      description: "Always show +/- sign for values",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    alwaysNegative: {
      control: "boolean",
      description: "Always display values as negative (for cylinder)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    useMinAsDefault: {
      control: "boolean",
      description: "Auto-adjust values below min to min value",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      control: "text",
      description: "Error message to display",
      table: { type: { summary: "string" } },
    },
    warning: {
      control: "text",
      description: "Warning message to display",
      table: { type: { summary: "string" } },
    },
    hint: {
      control: "text",
      description: "Hint message to display",
      table: { type: { summary: "string" } },
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
      table: { type: { summary: "string" } },
    },
    clearable: {
      control: "boolean",
      description: "Show clear button when value exists",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClear: {
      action: "cleared",
      description: "Callback fired when clear button is clicked",
      table: { type: { summary: "() => void" } },
    },
    defaultToZero: {
      control: "boolean",
      description: "Start at 0 instead of min/max when empty",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// BASIC EXAMPLES
// ============================================================================

/**
 * Default numeric up picker with basic configuration.
 * Click +/- buttons or use arrow keys when focused.
 */
export const Default: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="0" {...args} />,
  args: {
    label: "Numeric Value",
    placeholder: "0.00",
    step: 0.01,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic numeric input with increment/decrement buttons. Values are formatted to 2 decimal places on blur.",
      },
    },
  },
};

/**
 * With minimum and maximum value constraints.
 * Buttons disable at boundaries.
 */
export const WithRange: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="50" {...args} />,
  args: {
    label: "Value in Range",
    min: 0,
    max: 100,
    step: 5,
    placeholder: "0",
    hint: "Range: 0 to 100",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates min/max constraints. Increment button disables at max (100), decrement button disables at min (0).",
      },
    },
  },
};

/**
 * Required field with asterisk indicator.
 */
export const Required: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="10" {...args} />,
  args: {
    label: "Required Value",
    required: true,
    min: 0,
    max: 50,
    step: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows required field with red asterisk. Empty values will be reset to minimum on blur.",
      },
    },
  },
};

/**
 * With hint text
 */
export const WithHint: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="60" {...args} />,
  args: {
    label: "Distance (mm)",
    min: 50,
    max: 70,
    step: 0.1,
    hint: "Typical range: 50mm to 70mm",
  },
};

/**
 * With error state
 */
export const WithError: Story = {
  render: (args) => (
    <NumericUpPickerWithErrorValidation
      initialValue="150"
      errorMessage="Value must be between {min} and {max}"
      {...args}
    />
  ),
  args: {
    label: "Invalid Value",
    min: 0,
    max: 100,
    step: 1,
  },
};

/**
 * With warning state
 */
export const WithWarning: Story = {
  render: (args) => (
    <NumericUpPickerWithWarning
      initialValue="95"
      warningThreshold={90}
      warningMessage="This value is near the maximum"
      {...args}
    />
  ),
  args: {
    label: "Check Value",
    min: 0,
    max: 100,
    step: 5,
  },
};

/**
 * Disabled state
 */
export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "42",
    onChange: () => {},
    disabled: true,
    min: 0,
    max: 100,
    step: 1,
  },
};

/**
 * With clearable option - shows close button to clear the value
 */
export const Clearable: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="25.50" {...args} />,
  args: {
    label: "Clearable Value",
    min: 0,
    max: 100,
    step: 0.5,
    clearable: true,
    hint: "Click the close icon to clear the value",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When `clearable` is true, a close icon appears allowing users to quickly clear the input value. The `onClear` callback is triggered when the close button is clicked.",
      },
    },
  },
};

/**
 * Keyboard Controls - Use arrow keys to increment/decrement
 */
export const KeyboardControls: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="50" {...args} />,
  args: {
    label: "Use Arrow Keys ↑↓",
    min: 0,
    max: 100,
    step: 5,
    hint: "Focus the input and press arrow up/down keys to adjust the value",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When the input is focused, you can use the **Arrow Up** key to increment and **Arrow Down** key to decrement the value. The step value is respected, and min/max constraints are enforced.",
      },
    },
  },
};

/**
 * With useMinAsDefault - automatically adjusts low values to minimum
 */
export const UseMinAsDefault: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="0.5" {...args} />,
  args: {
    label: "Addition (Near Vision)",
    min: 0.5,
    max: 4.0,
    step: 0.25,
    useMinAsDefault: true,
    hint: "Values below 0.50 will be adjusted to 0.50",
  },
};

/**
 * Prescription sphere field
 */
export const PrescriptionSphere: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="-2.50" {...args} />,
  args: {
    label: "Sphere (SPH)",
    min: -20.0,
    max: 20.0,
    step: 0.25,
    hint: "Range: -20.00 D to +20.00 D",
  },
};

/**
 * Prescription cylinder field
 */
export const PrescriptionCylinder: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="-1.00" {...args} />,
  args: {
    label: "Cylinder (CYL)",
    min: -6.0,
    max: 6.0,
    step: 0.25,
    hint: "Range: -6.00 D to +6.00 D",
  },
};

/**
 * Prescription axis field
 */
export const PrescriptionAxis: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="90" {...args} />,
  args: {
    label: "Axis",
    min: 0,
    max: 180,
    step: 1,
    hint: "Range: 0° to 180°",
  },
};

/**
 * Prescription Add (near addition) field
 */
export const PrescriptionAdd: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="1.50" {...args} />,
  args: {
    label: "Add (Near)",
    min: 0.5,
    max: 4.0,
    step: 0.25,
    hint: "Range: 0.50 D to 4.00 D",
  },
};

/**
 * Pupillary distance field
 */
export const PupillaryDistance: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="62" {...args} />,
  args: {
    label: "DNP (Pupillary Distance)",
    min: 50,
    max: 70,
    step: 0.1,
    hint: "Range: 50mm to 70mm",
  },
};

/**
 * Small step increments
 */
export const SmallStep: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="1.5" {...args} />,
  args: {
    label: "Precise Value",
    min: 0,
    max: 10,
    step: 0.05,
    hint: "Step: 0.05",
  },
};

/**
 * Large step increments
 */
export const LargeStep: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="50" {...args} />,
  args: {
    label: "Coarse Value",
    min: 0,
    max: 200,
    step: 10,
    hint: "Step: 10",
  },
};

/**
 * Interactive demo with state management
 */
export const Interactive: Story = {
  render: () => (
    <NumericUpPickerInteractive
      initialValue="50"
      label="Interactive Value"
      min={0}
      max={100}
      step={5}
      hint="Change the value using buttons or direct input"
      showFeedback={true}
    />
  ),
};

/**
 * With error and recovery
 */
export const ErrorRecovery: Story = {
  render: () => (
    <NumericUpPickerWithErrorRecovery
      initialValue="150"
      min={0}
      max={100}
      step={10}
    />
  ),
};

/**
 * Prescription form fields comparison
 */
export const PrescriptionFields: Story = {
  render: () => <PrescriptionForm />,
};

/**
 * Zero value state
 */
export const ZeroValue: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="0" {...args} />,
  args: {
    label: "Starting at Zero",
    min: -10,
    max: 10,
    step: 1,
  },
};

/**
 * Negative values
 */
export const NegativeValues: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="-5" {...args} />,
  args: {
    label: "Negative Range",
    min: -20,
    max: 0,
    step: 1,
  },
};

/**
 * Very large numbers
 */
export const LargeNumbers: Story = {
  render: (args) => (
    <NumericUpPickerWithState initialValue="999999" {...args} />
  ),
  args: {
    label: "Large Value",
    min: 0,
    max: 1000000,
    step: 1000,
  },
};

/**
 * Decimal precision
 */
export const DecimalPrecision: Story = {
  render: (args) => (
    <NumericUpPickerWithState initialValue="3.14159" {...args} />
  ),
  args: {
    label: "High Precision",
    min: 0,
    max: 10,
    step: 0.00001,
  },
};

/**
 * Two Decimal Places Formatting
 * Demonstrates that values are always formatted with exactly 2 decimal places
 */
export const TwoDecimalPlaces: Story = {
  render: () => <NumericUpPickerInteractive />,
  parameters: {
    docs: {
      description: {
        story: `
This story demonstrates the two decimal places formatting requirement:
- Integer values like "1" are formatted as "1.00"
- Single decimal values like "1.5" are formatted as "1.50"
- Two decimal values like "1.25" remain as "1.25"
- Values are formatted on blur or when using increment/decrement buttons
        `,
      },
    },
  },
};

/**
 * Clearable with state management
 * Shows clear button functionality with proper state handling
 */
export const ClearableWithState: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="75.25" {...args} />,
  args: {
    label: "Clearable Field",
    min: 0,
    max: 100,
    step: 0.25,
    clearable: true,
    hint: "Click the × button to clear the value",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates the clearable feature with a circular close button. When clicked, the value is cleared and the onClear callback is triggered.",
      },
    },
  },
};

/**
 * Default to zero mode
 * When empty and buttons are clicked, starts from 0 instead of min/max
 */
export const DefaultToZero: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="" {...args} />,
  args: {
    label: "Default to Zero",
    min: -10,
    max: 10,
    step: 1,
    defaultToZero: true,
    hint: "Click + or - when empty to start from 0, not from min/max",
  },
  parameters: {
    docs: {
      description: {
        story:
          "With defaultToZero enabled, clicking increment or decrement on an empty field starts from 0 instead of the min or max value.",
      },
    },
  },
};

/**
 * Combined features: clearable + integer only
 */
export const ClearableInteger: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="50" {...args} />,
  args: {
    label: "Age",
    min: 0,
    max: 120,
    step: 1,
    clearable: true,
    integerOnly: true,
    hint: "Integer only field with clear button",
  },
};

/**
 * Combined features: clearable + show sign
 */
export const ClearableWithSign: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="5.50" {...args} />,
  args: {
    label: "Temperature Change (°C)",
    min: -50,
    max: 50,
    step: 0.5,
    clearable: true,
    showSign: true,
    hint: "Shows + or - sign with clearable option",
  },
};

/**
 * Required field with validation
 */
export const RequiredField: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="" {...args} />,
  args: {
    label: "Required Amount",
    min: 1,
    max: 1000,
    step: 1,
    required: true,
    hint: "This field is required - must have a value",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required fields show a red asterisk and enforce validation. When left empty and blurred, the field sets to the minimum value.",
      },
    },
  },
};

/**
 * No min/max constraints - free range
 */
export const UnconstrainedRange: Story = {
  render: (args) => <NumericUpPickerWithState initialValue="0" {...args} />,
  args: {
    label: "Free Range Value",
    step: 1,
    hint: "No min/max constraints - any value allowed",
  },
  parameters: {
    docs: {
      description: {
        story:
          "When min and max are not specified, the field allows any numeric value without constraints.",
      },
    },
  },
};

/**
 * Multiple fields in a form
 */
export const MultipleFields: Story = {
  render: () => (
    <div className="space-y-4">
      <NumericUpPickerWithState
        initialValue="25"
        label="Quantity"
        min={1}
        max={100}
        step={1}
        integerOnly={true}
      />
      <NumericUpPickerWithState
        initialValue="19.99"
        label="Price ($)"
        min={0}
        max={9999.99}
        step={0.01}
        clearable={true}
      />
      <NumericUpPickerWithState
        initialValue="15"
        label="Discount (%)"
        min={0}
        max={100}
        step={5}
        integerOnly={true}
        clearable={true}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of multiple NumericUpPicker fields in a form with different configurations.",
      },
    },
  },
};
