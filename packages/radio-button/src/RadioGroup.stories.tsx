import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import RadioGroup, { type RadioGroupProps } from "./RadioGroup";

const meta: Meta<RadioGroupProps> = {
  title: "Components/Forms/RadioGroup",
  component: RadioGroup as any,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A radio group component that manages multiple radio buttons with support for vertical/horizontal orientation, selected label display, and all RadioButton features.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "The name attribute for the radio group",
      table: {
        type: { summary: "string" },
      },
    },
    options: {
      control: "object",
      description: "Array of radio options to display",
      table: {
        type: { summary: "RadioOption[]" },
      },
    },
    value: {
      control: "text",
      description: "Currently selected value",
      table: {
        type: { summary: "string" },
      },
    },
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"],
      description: "Layout orientation of the radio group",
      table: {
        type: { summary: "'vertical' | 'horizontal'" },
        defaultValue: { summary: "'vertical'" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of all radio buttons in the group",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger"],
      description: "Color variant of all radio buttons",
      table: {
        type: {
          summary: "'default' | 'primary' | 'success' | 'warning' | 'danger'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether all options are disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the selection is required",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    showSelectedLabel: {
      control: "boolean",
      description: "Whether to show the selected option label",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    selectedLabelText: {
      control: "text",
      description: "Text to display before the selected option",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "'Selected:'" },
      },
    },
    groupLabel: {
      control: "text",
      description: "Label for the entire radio group",
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
    bordered: {
      control: "boolean",
      description: "Whether to wrap the group in a bordered fieldset",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    borderLabel: {
      control: "text",
      description: "Label for the bordered wrapper (legend)",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<RadioGroupProps>;

const basicOptions = [
  {
    label: "Option 1",
    value: "option1",
    description: "First option description",
  },
  {
    label: "Option 2",
    value: "option2",
    description: "Second option description",
  },
  {
    label: "Option 3",
    value: "option3",
    description: "Third option description",
  },
];

// Basic Stories
export const VerticalDefault: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="vertical-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        groupLabel="Choose an option:"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Default vertical radio group with controlled state.",
      },
    },
  },
};

export const HorizontalDefault: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="horizontal-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        orientation="horizontal"
        groupLabel="Choose an option:"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal radio group layout.",
      },
    },
  },
};

export const VerticalWithSelectedLabel: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="vertical-selected"
        options={basicOptions}
        value={value}
        onChange={setValue}
        groupLabel="Choose an option:"
        showSelectedLabel={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical layout with selected option label displayed below.",
      },
    },
  },
};

export const HorizontalWithSelectedLabel: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="horizontal-selected"
        options={basicOptions}
        value={value}
        onChange={setValue}
        orientation="horizontal"
        groupLabel="Choose an option:"
        showSelectedLabel={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal layout with selected option label displayed below.",
      },
    },
  },
};

export const HorizontalWithCustomSelectedLabel: Story = {
  render: () => {
    const [value, setValue] = useState("option2");
    return (
      <RadioGroup
        name="custom-selected"
        options={basicOptions}
        value={value}
        onChange={setValue}
        orientation="horizontal"
        groupLabel="Choose an option:"
        showSelectedLabel={true}
        selectedLabelText="Current choice:"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal layout with custom selected label text.",
      },
    },
  },
};

// Size Variations
export const SmallSize: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="small-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        size="sm"
        groupLabel="Small size options:"
        showSelectedLabel={true}
      />
    );
  },
};

export const LargeSize: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="large-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        size="lg"
        groupLabel="Large size options:"
        showSelectedLabel={true}
      />
    );
  },
};

// Variant Variations
export const PrimaryVariant: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="primary-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        variant="primary"
        groupLabel="Primary variant:"
        showSelectedLabel={true}
      />
    );
  },
};

export const SuccessVariant: Story = {
  render: () => {
    const [value, setValue] = useState("option2");
    return (
      <RadioGroup
        name="success-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        variant="success"
        orientation="horizontal"
        groupLabel="Success variant:"
        showSelectedLabel={true}
      />
    );
  },
};

export const WarningVariant: Story = {
  render: () => {
    const [value, setValue] = useState("option2");
    return (
      <RadioGroup
        name="warning-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        variant="warning"
        orientation="horizontal"
        groupLabel="Warning variant:"
        showSelectedLabel={true}
      />
    );
  },
};

export const DangerVariant: Story = {
  render: () => {
    const [value, setValue] = useState("option3");
    return (
      <RadioGroup
        name="danger-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        variant="danger"
        groupLabel="Danger variant:"
        showSelectedLabel={true}
      />
    );
  },
};

// State Variations
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <RadioGroup
        name="error-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        groupLabel="Choose an option:"
        error="Please select an option"
        required={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group with error message.",
      },
    },
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    return (
      <RadioGroup
        name="disabled-group"
        options={basicOptions}
        value={value}
        onChange={setValue}
        groupLabel="Disabled group:"
        disabled={true}
      />
    );
  },
};

export const PartiallyDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("option1");
    const options = [
      {
        label: "Available Option 1",
        value: "option1",
        description: "This is available",
      },
      {
        label: "Disabled Option",
        value: "option2",
        description: "This is disabled",
        disabled: true,
      },
      {
        label: "Available Option 2",
        value: "option3",
        description: "This is also available",
      },
    ];
    return (
      <RadioGroup
        name="partial-disabled"
        options={options}
        value={value}
        onChange={setValue}
        groupLabel="Some options disabled:"
        showSelectedLabel={true}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group with some options disabled.",
      },
    },
  },
};

// Real-world Examples
export const PaymentMethodExample: Story = {
  render: () => {
    const [payment, setPayment] = useState("");
    const paymentOptions = [
      {
        label: "Credit Card",
        value: "credit",
        description: "Pay securely with your credit card",
      },
      {
        label: "PayPal",
        value: "paypal",
        description: "Fast and secure PayPal checkout",
      },
      {
        label: "Bank Transfer",
        value: "bank",
        description: "Direct bank transfer (2-3 business days)",
      },
    ];

    return (
      <div className="max-w-md">
        <RadioGroup
          name="payment"
          options={paymentOptions}
          value={payment}
          onChange={setPayment}
          variant="primary"
          groupLabel="Payment Method"
          error={!payment ? "Please select a payment method" : undefined}
          required={true}
          showSelectedLabel={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Real-world example: payment method selection.",
      },
    },
  },
};

export const ShippingSpeedExample: Story = {
  render: () => {
    const [shipping, setShipping] = useState("standard");
    const shippingOptions = [
      {
        label: "Standard Shipping",
        value: "standard",
        description: "5-7 business days - Free",
      },
      {
        label: "Express Shipping",
        value: "express",
        description: "2-3 business days - $9.99",
      },
      {
        label: "Overnight Shipping",
        value: "overnight",
        description: "Next business day - $24.99",
      },
    ];

    return (
      <div className="max-w-md">
        <RadioGroup
          name="shipping"
          options={shippingOptions}
          value={shipping}
          onChange={setShipping}
          orientation="horizontal"
          variant="success"
          groupLabel="Shipping Speed"
          showSelectedLabel={true}
          selectedLabelText="Selected shipping:"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example: shipping speed selection with horizontal layout.",
      },
    },
  },
};

export const SizeComparisonExample: Story = {
  render: () => {
    const [tshirtSize, setTshirtSize] = useState("M");
    const sizeOptions = [
      { label: "XS", value: "XS" },
      { label: "S", value: "S" },
      { label: "M", value: "M" },
      { label: "L", value: "L" },
      { label: "XL", value: "XL" },
      { label: "XXL", value: "XXL" },
    ];

    return (
      <div className="max-w-2xl">
        <RadioGroup
          name="size"
          options={sizeOptions}
          value={tshirtSize}
          onChange={setTshirtSize}
          orientation="horizontal"
          groupLabel="Select T-Shirt Size"
          showSelectedLabel={true}
          selectedLabelText="Size:"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example: size selection with compact horizontal layout.",
      },
    },
  },
};

export const MultipleGroupsExample: Story = {
  render: () => {
    const [pizzaSize, setPizzaSize] = useState("medium");
    const [crustType, setCrustType] = useState("regular");

    const sizeOptions = [
      { label: 'Small (10")', value: "small", description: "$9.99" },
      { label: 'Medium (12")', value: "medium", description: "$12.99" },
      { label: 'Large (14")', value: "large", description: "$15.99" },
    ];

    const crustOptions = [
      { label: "Regular Crust", value: "regular" },
      { label: "Thin Crust", value: "thin" },
      { label: "Thick Crust", value: "thick" },
      { label: "Gluten-Free", value: "gf", description: "+$2.00" },
    ];

    return (
      <div className="max-w-2xl space-y-6">
        <RadioGroup
          name="pizza-size"
          options={sizeOptions}
          value={pizzaSize}
          onChange={setPizzaSize}
          orientation="horizontal"
          variant="primary"
          groupLabel="Pizza Size"
          showSelectedLabel={true}
        />
        <RadioGroup
          name="crust-type"
          options={crustOptions}
          value={crustType}
          onChange={setCrustType}
          orientation="horizontal"
          variant="default"
          groupLabel="Crust Type"
          showSelectedLabel={true}
        />
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold mb-2">Order Summary:</h4>
          <div className="text-sm space-y-1">
            <div>
              <strong>Size:</strong> {pizzaSize}
            </div>
            <div>
              <strong>Crust:</strong> {crustType}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple radio groups working together in a form.",
      },
    },
  },
};
export const BorderedGroup: Story = {
  render: () => {
    const [notification, setNotification] = useState("email");

    const options = [
      { label: "Email", value: "email", description: "Get notified via email" },
      {
        label: "SMS",
        value: "sms",
        description: "Get notified via text message",
      },
      { label: "Push", value: "push", description: "Get push notifications" },
    ];

    return (
      <div className="max-w-md">
        <RadioGroup
          name="notification"
          options={options}
          value={notification}
          onChange={setNotification}
          bordered={true}
          borderLabel="Notification Preferences"
          variant="primary"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Radio group with a bordered wrapper and label.",
      },
    },
  },
};

export const BorderedWithoutLabel: Story = {
  render: () => {
    const [theme, setTheme] = useState("light");

    const options = [
      { label: "Light", value: "light", description: "Use light theme" },
      { label: "Dark", value: "dark", description: "Use dark theme" },
      {
        label: "System",
        value: "system",
        description: "Match system preference",
      },
    ];

    return (
      <div className="max-w-md">
        <RadioGroup
          name="theme"
          options={options}
          value={theme}
          onChange={setTheme}
          bordered={true}
          groupLabel="Theme Settings"
          variant="default"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Bordered radio group without border label, using groupLabel instead.",
      },
    },
  },
};

export const BorderedHorizontal: Story = {
  render: () => {
    const [priority, setPriority] = useState("medium");

    const options = [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Critical", value: "critical" },
    ];

    return (
      <div className="max-w-2xl">
        <RadioGroup
          name="priority"
          options={options}
          value={priority}
          onChange={setPriority}
          orientation="horizontal"
          bordered={true}
          borderLabel="Priority Level"
          variant="warning"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal bordered radio group for compact layouts.",
      },
    },
  },
};

export const MultipleBorderedGroups: Story = {
  render: () => {
    const [experience, setExperience] = useState("");
    const [availability, setAvailability] = useState("");

    const experienceOptions = [
      { label: "0-2 years", value: "junior" },
      { label: "3-5 years", value: "mid" },
      { label: "5+ years", value: "senior" },
    ];

    const availabilityOptions = [
      { label: "Full-time", value: "fulltime" },
      { label: "Part-time", value: "parttime" },
      { label: "Contract", value: "contract" },
      { label: "Freelance", value: "freelance" },
    ];

    return (
      <div className="max-w-2xl space-y-6">
        <RadioGroup
          name="experience"
          options={experienceOptions}
          value={experience}
          onChange={setExperience}
          bordered={true}
          borderLabel="Experience Level"
          variant="primary"
          required={true}
        />
        <RadioGroup
          name="availability"
          options={availabilityOptions}
          value={availability}
          onChange={setAvailability}
          orientation="horizontal"
          bordered={true}
          borderLabel="Availability"
          variant="success"
          required={true}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Multiple bordered radio groups in a form with different orientations.",
      },
    },
  },
};
