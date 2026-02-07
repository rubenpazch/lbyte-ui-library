import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Button from "@rubenpazch/button";
import CheckboxInput from "./CheckboxInput";

const meta: Meta<typeof CheckboxInput> = {
  title: "Components/Forms/CheckboxInput",
  component: CheckboxInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A reusable checkbox input component with support for labels, descriptions, error states, disabled states, multiple sizes, and color variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "The label text for the checkbox",
      table: {
        type: { summary: "string" },
      },
    },
    checked: {
      control: "boolean",
      description: "Whether the checkbox is checked",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the checkbox is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    required: {
      control: "boolean",
      description: "Whether the checkbox is required (shows asterisk)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the checkbox and label",
      table: {
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "'md'" },
      },
    },
    variant: {
      control: "select",
      options: ["default", "primary", "success", "warning", "danger"],
      description: "Color variant of the checkbox",
      table: {
        type: {
          summary: "'default' | 'primary' | 'success' | 'warning' | 'danger'",
        },
        defaultValue: { summary: "'default'" },
      },
    },
    description: {
      control: "text",
      description: "Optional description text below the label",
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
      description: "Additional CSS classes for the wrapper",
      table: {
        type: { summary: "string" },
      },
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the checkbox state changes",
      table: {
        type: { summary: "(checked: boolean) => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckboxInput>;

// Basic Stories
export const Default: Story = {
  args: {
    label: "Accept terms and conditions",
  },
};

export const Checked: Story = {
  args: {
    label: "I agree to the terms",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Partially selected",
    indeterminate: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive email notifications about your account activity",
  },
};

export const Required: Story = {
  args: {
    label: "Accept privacy policy",
    required: true,
    description: "You must accept the privacy policy to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "This option is not available",
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "This option is locked",
    checked: true,
    disabled: true,
    description: "This option cannot be changed",
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms to continue",
    required: true,
  },
};

// Interactive Stories
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-4">
        <CheckboxInput
          label="Toggle me"
          checked={checked}
          onChange={setChecked}
          description={
            checked ? "Checkbox is checked" : "Checkbox is unchecked"
          }
        />
        <p className="text-sm text-gray-600">
          Current state: <strong>{checked ? "Checked" : "Unchecked"}</strong>
        </p>
      </div>
    );
  },
};

export const MultipleCheckboxes: Story = {
  render: () => {
    const [preferences, setPreferences] = useState({
      email: true,
      sms: false,
      push: false,
    });

    return (
      <div className="space-y-4 w-96">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <CheckboxInput
          label="Email notifications"
          checked={preferences.email}
          onChange={(checked) =>
            setPreferences({ ...preferences, email: checked })
          }
          description="Receive updates via email"
        />
        <CheckboxInput
          label="SMS notifications"
          checked={preferences.sms}
          onChange={(checked) =>
            setPreferences({ ...preferences, sms: checked })
          }
          description="Receive updates via text message"
        />
        <CheckboxInput
          label="Push notifications"
          checked={preferences.push}
          onChange={(checked) =>
            setPreferences({ ...preferences, push: checked })
          }
          description="Receive updates in your browser"
        />
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm font-medium text-gray-700">
            Selected preferences:
          </p>
          <ul className="mt-2 text-sm text-gray-600">
            {preferences.email && <li>✓ Email</li>}
            {preferences.sms && <li>✓ SMS</li>}
            {preferences.push && <li>✓ Push</li>}
            {!preferences.email && !preferences.sms && !preferences.push && (
              <li className="text-gray-400">None selected</li>
            )}
          </ul>
        </div>
      </div>
    );
  },
};

export const FilterExample: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      completed: true,
      inProgress: false,
      pending: false,
      cancelled: false,
    });

    const handleFilterChange = (key: keyof typeof filters) => {
      setFilters({ ...filters, [key]: !filters[key] });
    };

    const activeCount = Object.values(filters).filter(Boolean).length;

    return (
      <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Filter Status</h3>
          {activeCount > 0 && (
            <span className="px-2 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
              {activeCount} active
            </span>
          )}
        </div>
        <div className="space-y-3">
          <CheckboxInput
            label="Completed"
            checked={filters.completed}
            onChange={() => handleFilterChange("completed")}
          />
          <CheckboxInput
            label="In Progress"
            checked={filters.inProgress}
            onChange={() => handleFilterChange("inProgress")}
          />
          <CheckboxInput
            label="Pending"
            checked={filters.pending}
            onChange={() => handleFilterChange("pending")}
          />
          <CheckboxInput
            label="Cancelled"
            checked={filters.cancelled}
            onChange={() => handleFilterChange("cancelled")}
          />
        </div>
      </div>
    );
  },
};

export const FormValidation: Story = {
  render: () => {
    const [accepted, setAccepted] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit} className="w-96 space-y-6">
        <div className="p-6 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Terms and Conditions
          </h3>
          <CheckboxInput
            label="I accept the terms and conditions"
            checked={accepted}
            onChange={setAccepted}
            required={true}
            error={
              submitted && !accepted
                ? "You must accept the terms to continue"
                : undefined
            }
            description="Please read and accept our terms of service"
          />
          <div className="mt-6">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </div>
          {submitted && accepted && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ Form submitted successfully!
              </p>
            </div>
          )}
        </div>
      </form>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="space-y-8 w-96">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Basic States
        </h4>
        <div className="space-y-3">
          <CheckboxInput label="Unchecked" checked={false} />
          <CheckboxInput label="Checked" checked={true} />
          <CheckboxInput
            label="With description"
            description="Additional information"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Disabled States
        </h4>
        <div className="space-y-3">
          <CheckboxInput
            label="Disabled unchecked"
            disabled={true}
            checked={false}
          />
          <CheckboxInput
            label="Disabled checked"
            disabled={true}
            checked={true}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">
          Error States
        </h4>
        <div className="space-y-3">
          <CheckboxInput label="With error" error="This field is required" />
          <CheckboxInput
            label="Required field"
            required={true}
            error="Please check this box to continue"
          />
        </div>
      </div>
    </div>
  ),
};

// Size Variants
export const SizeSmall: Story = {
  args: {
    label: "Small checkbox",
    size: "sm",
    description: "This is a small checkbox with smaller text",
  },
};

export const SizeMedium: Story = {
  args: {
    label: "Medium checkbox",
    size: "md",
    description: "This is the default medium size",
  },
};

export const SizeLarge: Story = {
  args: {
    label: "Large checkbox",
    size: "lg",
    description: "This is a large checkbox with bigger text",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Size Variants
      </h4>
      <CheckboxInput
        label="Small (sm)"
        size="sm"
        checked={true}
        description="Small size checkbox"
      />
      <CheckboxInput
        label="Medium (md)"
        size="md"
        checked={true}
        description="Medium size checkbox"
      />
      <CheckboxInput
        label="Large (lg)"
        size="lg"
        checked={true}
        description="Large size checkbox"
      />
    </div>
  ),
};

// Color Variants
export const VariantDefault: Story = {
  args: {
    label: "Default variant",
    variant: "default",
    checked: true,
    description: "Blue color scheme (default)",
  },
};

export const VariantPrimary: Story = {
  args: {
    label: "Primary variant",
    variant: "primary",
    checked: true,
    description: "Indigo color scheme",
  },
};

export const VariantSuccess: Story = {
  args: {
    label: "Success variant",
    variant: "success",
    checked: true,
    description: "Green color scheme",
  },
};

export const VariantWarning: Story = {
  args: {
    label: "Warning variant",
    variant: "warning",
    checked: true,
    description: "Yellow color scheme",
  },
};

export const VariantDanger: Story = {
  args: {
    label: "Danger variant",
    variant: "danger",
    checked: true,
    description: "Red color scheme",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Color Variants
      </h4>
      <CheckboxInput
        label="Default"
        variant="default"
        checked={true}
        description="Blue (default)"
      />
      <CheckboxInput
        label="Primary"
        variant="primary"
        checked={true}
        description="Indigo"
      />
      <CheckboxInput
        label="Success"
        variant="success"
        checked={true}
        description="Green"
      />
      <CheckboxInput
        label="Warning"
        variant="warning"
        checked={true}
        description="Yellow"
      />
      <CheckboxInput
        label="Danger"
        variant="danger"
        checked={true}
        description="Red"
      />
    </div>
  ),
};

// Combined Size and Variant
export const LargeSuccess: Story = {
  args: {
    label: "Large Success Checkbox",
    size: "lg",
    variant: "success",
    checked: true,
    description: "Combining large size with success variant",
  },
};

export const SmallWarning: Story = {
  args: {
    label: "Small Warning Checkbox",
    size: "sm",
    variant: "warning",
    checked: true,
    description: "Combining small size with warning variant",
  },
};

export const SizeVariantCombinations: Story = {
  render: () => (
    <div className="space-y-8 w-[600px]">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">
        Size & Variant Combinations
      </h4>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">Small</p>
          <CheckboxInput
            label="Default"
            size="sm"
            variant="default"
            checked={true}
          />
          <CheckboxInput
            label="Primary"
            size="sm"
            variant="primary"
            checked={true}
          />
          <CheckboxInput
            label="Success"
            size="sm"
            variant="success"
            checked={true}
          />
          <CheckboxInput
            label="Warning"
            size="sm"
            variant="warning"
            checked={true}
          />
          <CheckboxInput
            label="Danger"
            size="sm"
            variant="danger"
            checked={true}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">Medium</p>
          <CheckboxInput
            label="Default"
            size="md"
            variant="default"
            checked={true}
          />
          <CheckboxInput
            label="Primary"
            size="md"
            variant="primary"
            checked={true}
          />
          <CheckboxInput
            label="Success"
            size="md"
            variant="success"
            checked={true}
          />
          <CheckboxInput
            label="Warning"
            size="md"
            variant="warning"
            checked={true}
          />
          <CheckboxInput
            label="Danger"
            size="md"
            variant="danger"
            checked={true}
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-600 mb-2">Large</p>
          <CheckboxInput
            label="Default"
            size="lg"
            variant="default"
            checked={true}
          />
          <CheckboxInput
            label="Primary"
            size="lg"
            variant="primary"
            checked={true}
          />
          <CheckboxInput
            label="Success"
            size="lg"
            variant="success"
            checked={true}
          />
          <CheckboxInput
            label="Warning"
            size="lg"
            variant="warning"
            checked={true}
          />
          <CheckboxInput
            label="Danger"
            size="lg"
            variant="danger"
            checked={true}
          />
        </div>
      </div>
    </div>
  ),
};

// Real-world Examples with new variants
export const StatusFilters: Story = {
  render: () => {
    const [filters, setFilters] = useState({
      active: true,
      pending: false,
      completed: false,
      failed: false,
    });

    return (
      <div className="w-96 p-6 bg-white border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Filter by Status
        </h3>
        <div className="space-y-3">
          <CheckboxInput
            label="Active"
            variant="primary"
            checked={filters.active}
            onChange={(checked) => setFilters({ ...filters, active: checked })}
          />
          <CheckboxInput
            label="Pending"
            variant="warning"
            checked={filters.pending}
            onChange={(checked) => setFilters({ ...filters, pending: checked })}
          />
          <CheckboxInput
            label="Completed"
            variant="success"
            checked={filters.completed}
            onChange={(checked) =>
              setFilters({ ...filters, completed: checked })
            }
          />
          <CheckboxInput
            label="Failed"
            variant="danger"
            checked={filters.failed}
            onChange={(checked) => setFilters({ ...filters, failed: checked })}
          />
        </div>
      </div>
    );
  },
};

export const CompactList: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["item2"]);

    const toggleItem = (item: string) => {
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
      );
    };

    return (
      <div className="w-96 p-4 bg-white border border-gray-200 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Select Items (Compact)
        </h3>
        <div className="space-y-2">
          <CheckboxInput
            label="Item 1"
            size="sm"
            checked={selected.includes("item1")}
            onChange={() => toggleItem("item1")}
          />
          <CheckboxInput
            label="Item 2"
            size="sm"
            checked={selected.includes("item2")}
            onChange={() => toggleItem("item2")}
          />
          <CheckboxInput
            label="Item 3"
            size="sm"
            checked={selected.includes("item3")}
            onChange={() => toggleItem("item3")}
          />
          <CheckboxInput
            label="Item 4"
            size="sm"
            checked={selected.includes("item4")}
            onChange={() => toggleItem("item4")}
          />
        </div>
        <p className="mt-3 text-xs text-gray-600">
          {selected.length} item{selected.length !== 1 ? "s" : ""} selected
        </p>
      </div>
    );
  },
};
