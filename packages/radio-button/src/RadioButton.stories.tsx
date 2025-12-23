import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import RadioButton, { type RadioButtonProps } from "./RadioButton";

const meta: Meta<RadioButtonProps> = {
  title: "Components/Forms/RadioButton",
  component: RadioButton as any,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A reusable radio button input component with support for labels, descriptions, error states, disabled states, multiple sizes, and color variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name attribute for grouping radio buttons",
      table: {
        type: { summary: "string" },
      },
    },
    label: {
      control: "text",
      description: "The label text for the radio button",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: "text",
      description: "The value of the radio button",
      table: {
        type: { summary: "string" },
      },
    },
    checked: {
      control: "boolean",
      description: "Whether the radio button is checked",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the radio button is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the radio button is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the radio button and label",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger"],
      description: "Color variant of the radio button",
      table: {
        type: {
          summary: "'default' | 'primary' | 'success' | 'warning' | 'danger'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    description: {
      control: "text",
      description: "Helper text displayed below the label",
      table: {
        type: { summary: "string" },
      },
    },
    error: {
      control: "text",
      description: "Error message to display",
      table: {
        type: { summary: "string" },
      },
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioButtonProps>;

// Basic Stories
export const Default: Story = {
  args: {
    name: "default",
    label: "Default Radio Button",
    value: "default",
  },
};

export const Checked: Story = {
  args: {
    name: "checked",
    label: "Checked Radio Button",
    value: "checked",
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    label: "Disabled Radio Button",
    value: "disabled",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    name: "disabled-checked",
    label: "Disabled Checked Radio Button",
    value: "disabled-checked",
    checked: true,
    disabled: true,
  },
};

export const WithDescription: Story = {
  args: {
    name: "with-description",
    label: "Radio with Description",
    value: "description",
    description: "This is a helpful description text",
  },
};

export const WithError: Story = {
  args: {
    name: "with-error",
    label: "Radio with Error",
    value: "error",
    error: "This field is required",
  },
};

export const Required: Story = {
  args: {
    name: "required",
    label: "Required Radio Button",
    value: "required",
    required: true,
  },
};

// Size Stories
export const SmallSize: Story = {
  args: {
    name: "small",
    label: "Small Radio Button",
    value: "small",
    size: "sm",
    description: "This is a small radio button",
  },
};

export const MediumSize: Story = {
  args: {
    name: "medium",
    label: "Medium Radio Button",
    value: "medium",
    size: "md",
    description: "This is a medium radio button",
  },
};

export const LargeSize: Story = {
  args: {
    name: "large",
    label: "Large Radio Button",
    value: "large",
    size: "lg",
    description: "This is a large radio button",
  },
};

// Variant Stories
export const DefaultVariant: Story = {
  args: {
    name: "default-variant",
    label: "Default Variant",
    value: "default",
    variant: "default",
    checked: true,
  },
};

export const PrimaryVariant: Story = {
  args: {
    name: "primary-variant",
    label: "Primary Variant",
    value: "primary",
    variant: "primary",
    checked: true,
  },
};

export const SuccessVariant: Story = {
  args: {
    name: "success-variant",
    label: "Success Variant",
    value: "success",
    variant: "success",
    checked: true,
  },
};

export const WarningVariant: Story = {
  args: {
    name: "warning-variant",
    label: "Warning Variant",
    value: "warning",
    variant: "warning",
    checked: true,
  },
};

export const DangerVariant: Story = {
  args: {
    name: "danger-variant",
    label: "Danger Variant",
    value: "danger",
    variant: "danger",
    checked: true,
  },
};

// Interactive Examples
export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");

    return (
      <div className="space-y-3">
        <div className="font-semibold text-gray-900 mb-2">
          Choose an option:
        </div>
        <RadioButton
          name="radio-group"
          label="Option 1"
          value="option1"
          checked={selected === "option1"}
          onChange={setSelected}
          description="First option description"
        />
        <RadioButton
          name="radio-group"
          label="Option 2"
          value="option2"
          checked={selected === "option2"}
          onChange={setSelected}
          description="Second option description"
        />
        <RadioButton
          name="radio-group"
          label="Option 3"
          value="option3"
          checked={selected === "option3"}
          onChange={setSelected}
          description="Third option description"
        />
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Selected:</strong> {selected}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a radio button group with controlled state.",
      },
    },
  },
};

export const RadioGroupWithDisabled: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");

    return (
      <div className="space-y-3">
        <div className="font-semibold text-gray-900 mb-2">
          Choose an option:
        </div>
        <RadioButton
          name="radio-group-disabled"
          label="Available Option 1"
          value="option1"
          checked={selected === "option1"}
          onChange={setSelected}
        />
        <RadioButton
          name="radio-group-disabled"
          label="Disabled Option"
          value="option2"
          checked={selected === "option2"}
          onChange={setSelected}
          disabled={true}
        />
        <RadioButton
          name="radio-group-disabled"
          label="Available Option 2"
          value="option3"
          checked={selected === "option3"}
          onChange={setSelected}
        />
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Selected:</strong> {selected}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Radio button group with one disabled option.",
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => {
    const [selected, setSelected] = useState("medium");

    return (
      <div className="space-y-4">
        <div className="font-semibold text-gray-900 mb-2">Different Sizes:</div>
        <RadioButton
          name="size-comparison"
          label="Small Radio"
          value="small"
          size="sm"
          checked={selected === "small"}
          onChange={setSelected}
          description="Small size description"
        />
        <RadioButton
          name="size-comparison"
          label="Medium Radio"
          value="medium"
          size="md"
          checked={selected === "medium"}
          onChange={setSelected}
          description="Medium size description"
        />
        <RadioButton
          name="size-comparison"
          label="Large Radio"
          value="large"
          size="lg"
          checked={selected === "large"}
          onChange={setSelected}
          description="Large size description"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Comparison of all available sizes.",
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="font-semibold text-gray-900 mb-2">
        All Color Variants:
      </div>
      <RadioButton
        name="variant-showcase"
        label="Default Variant"
        value="default"
        variant="default"
        checked={true}
        onChange={() => {}}
      />
      <RadioButton
        name="variant-showcase"
        label="Primary Variant"
        value="primary"
        variant="primary"
        checked={true}
        onChange={() => {}}
      />
      <RadioButton
        name="variant-showcase"
        label="Success Variant"
        value="success"
        variant="success"
        checked={true}
        onChange={() => {}}
      />
      <RadioButton
        name="variant-showcase"
        label="Warning Variant"
        value="warning"
        variant="warning"
        checked={true}
        onChange={() => {}}
      />
      <RadioButton
        name="variant-showcase"
        label="Danger Variant"
        value="danger"
        variant="danger"
        checked={true}
        onChange={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All available color variants displayed together.",
      },
    },
  },
};

export const ComplexForm: Story = {
  render: () => {
    const [paymentMethod, setPaymentMethod] = useState("");
    const [shippingSpeed, setShippingSpeed] = useState("standard");

    return (
      <div className="max-w-md space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Payment Method
          </h3>
          <div className="space-y-3">
            <RadioButton
              name="payment"
              label="Credit Card"
              value="credit"
              checked={paymentMethod === "credit"}
              onChange={setPaymentMethod}
              description="Pay securely with your credit card"
              variant="primary"
              required={true}
            />
            <RadioButton
              name="payment"
              label="PayPal"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={setPaymentMethod}
              description="Fast and secure PayPal checkout"
              variant="primary"
              required={true}
            />
            <RadioButton
              name="payment"
              label="Bank Transfer"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={setPaymentMethod}
              description="Direct bank transfer (2-3 business days)"
              variant="primary"
              required={true}
            />
          </div>
          {!paymentMethod && (
            <p className="text-sm text-red-600 mt-2">
              Please select a payment method
            </p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Shipping Speed
          </h3>
          <div className="space-y-3">
            <RadioButton
              name="shipping"
              label="Standard Shipping"
              value="standard"
              checked={shippingSpeed === "standard"}
              onChange={setShippingSpeed}
              description="5-7 business days - Free"
              variant="success"
            />
            <RadioButton
              name="shipping"
              label="Express Shipping"
              value="express"
              checked={shippingSpeed === "express"}
              onChange={setShippingSpeed}
              description="2-3 business days - $9.99"
              variant="warning"
            />
            <RadioButton
              name="shipping"
              label="Overnight Shipping"
              value="overnight"
              checked={shippingSpeed === "overnight"}
              onChange={setShippingSpeed}
              description="Next business day - $24.99"
              variant="danger"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2">Order Summary:</h4>
          <div className="text-sm space-y-1">
            <div>
              <strong>Payment:</strong> {paymentMethod || "Not selected"}
            </div>
            <div>
              <strong>Shipping:</strong> {shippingSpeed}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complex form example with multiple radio button groups and variants.",
      },
    },
  },
};

export const HorizontalGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState("option1");

    return (
      <div className="max-w-2xl">
        <div className="font-semibold text-gray-900 mb-3">
          Choose an option:
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          <RadioButton
            name="horizontal-group"
            label="Option 1"
            value="option1"
            checked={selected === "option1"}
            onChange={setSelected}
          />
          <RadioButton
            name="horizontal-group"
            label="Option 2"
            value="option2"
            checked={selected === "option2"}
            onChange={setSelected}
          />
          <RadioButton
            name="horizontal-group"
            label="Option 3"
            value="option3"
            checked={selected === "option3"}
            onChange={setSelected}
          />
        </div>
        <div className="mt-4 p-3 bg-gray-100 rounded">
          <strong>Selected:</strong> {selected}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Radio buttons grouped horizontally with selected label.",
      },
    },
  },
};

export const HorizontalWithoutSelectedLabel: Story = {
  render: () => {
    const [selected, setSelected] = useState("option2");

    return (
      <div className="max-w-2xl">
        <div className="font-semibold text-gray-900 mb-3">
          Choose your preference:
        </div>
        <div className="flex flex-row flex-wrap gap-4">
          <RadioButton
            name="horizontal-no-label"
            label="Option 1"
            value="option1"
            checked={selected === "option1"}
            onChange={setSelected}
          />
          <RadioButton
            name="horizontal-no-label"
            label="Option 2"
            value="option2"
            checked={selected === "option2"}
            onChange={setSelected}
          />
          <RadioButton
            name="horizontal-no-label"
            label="Option 3"
            value="option3"
            checked={selected === "option3"}
            onChange={setSelected}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Radio buttons grouped horizontally without selected label display.",
      },
    },
  },
};
export const RequiredWithValidation: Story = {
  render: () => {
    const [selected, setSelected] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    const showError = submitted && !selected;

    return (
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div className="font-semibold text-gray-900 mb-2">
          Select your plan (Required):
        </div>
        <div className="space-y-3">
          <RadioButton
            name="plan"
            label="Basic Plan"
            value="basic"
            checked={selected === "basic"}
            onChange={setSelected}
            description="$9.99/month"
            required={true}
            error={showError ? "Please select a plan" : undefined}
          />
          <RadioButton
            name="plan"
            label="Pro Plan"
            value="pro"
            checked={selected === "pro"}
            onChange={setSelected}
            description="$19.99/month"
            required={true}
            error={showError ? "Please select a plan" : undefined}
          />
          <RadioButton
            name="plan"
            label="Enterprise Plan"
            value="enterprise"
            checked={selected === "enterprise"}
            onChange={setSelected}
            description="$49.99/month"
            required={true}
            error={showError ? "Please select a plan" : undefined}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
        {submitted && selected && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-green-800">
            ✓ Selected: {selected}
          </div>
        )}
      </form>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Required radio buttons with form validation. Submit without selection to see error state.",
      },
    },
  },
};

export const RequiredGroupWithState: Story = {
  render: () => {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    const isFormValid = size && color;

    return (
      <div className="max-w-md space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Size (Required)
          </h3>
          <div className="space-y-3">
            <RadioButton
              name="size"
              label="Small"
              value="small"
              checked={size === "small"}
              onChange={setSize}
              required={true}
            />
            <RadioButton
              name="size"
              label="Medium"
              value="medium"
              checked={size === "medium"}
              onChange={setSize}
              required={true}
            />
            <RadioButton
              name="size"
              label="Large"
              value="large"
              checked={size === "large"}
              onChange={setSize}
              required={true}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Color (Required)
          </h3>
          <div className="space-y-3">
            <RadioButton
              name="color"
              label="Red"
              value="red"
              checked={color === "red"}
              onChange={setColor}
              required={true}
              variant="danger"
            />
            <RadioButton
              name="color"
              label="Blue"
              value="blue"
              checked={color === "blue"}
              onChange={setColor}
              required={true}
              variant="primary"
            />
            <RadioButton
              name="color"
              label="Green"
              value="green"
              checked={color === "green"}
              onChange={setColor}
              required={true}
              variant="success"
            />
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2">Selection Status:</h4>
          <div className="text-sm space-y-1">
            <div>
              Size: {size || <span className="text-red-600">Not selected</span>}
            </div>
            <div>
              Color:{" "}
              {color || <span className="text-red-600">Not selected</span>}
            </div>
            <div className="mt-2 pt-2 border-t">
              Form Valid:{" "}
              {isFormValid ? (
                <span className="text-green-600 font-semibold">✓ Yes</span>
              ) : (
                <span className="text-red-600 font-semibold">✗ No</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple required radio button groups with state tracking and validation feedback.",
      },
    },
  },
};
