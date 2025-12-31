import type { Meta, StoryObj } from "@storybook/react";
import InfoRow from "./InfoRow";
import {
  EmailIcon,
  PhoneIcon,
  LocationIcon,
  ClockIcon,
  ZoomInIcon,
  ZoomOutIcon,
  LinkIcon,
  EyeIcon,
  UsersIcon,
  DocumentIcon,
  CalendarIcon,
  CheckIcon,
  PatientsIcon,
  NotificationIcon,
} from "@rubenpazch/icons";

const meta: Meta<typeof InfoRow> = {
  title: "Components/InfoRow",
  component: InfoRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Icon component to display",
    },
    label: {
      control: "text",
      description: "Label text for the info row",
    },
    value: {
      control: "text",
      description: "Value text for the info row",
    },
    variant: {
      control: "select",
      options: [
        "default",
        "blue",
        "yellow",
        "purple",
        "green",
        "red",
        "indigo",
        "gray",
      ],
      description: "Color variant for the background",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the component",
    },
    layout: {
      control: "select",
      options: ["vertical", "horizontal", "inline", "compact"],
      description: "Layout orientation",
    },
    hideIcon: {
      control: "boolean",
      description: "Hide the icon",
    },
    hideLabel: {
      control: "boolean",
      description: "Hide the label",
    },
  },
};
export default meta;
type Story = StoryObj<typeof InfoRow>;

export const Default: Story = {
  args: {
    icon: <EmailIcon size="md" />,
    label: "Email",
    value: "patient@example.com",
    variant: "default",
  },
};
export const EmailExample: Story = {
  args: {
    icon: <EmailIcon size="md" />,
    label: "Email",
    value: "patient@example.com",
  },
};
export const PhoneExample: Story = {
  args: {
    icon: <PhoneIcon size="md" />,
    label: "Phone",
    value: "+51 987 654 321",
  },
};
export const AddressExample: Story = {
  args: {
    icon: <LocationIcon size="md" />,
    label: "Address",
    value: "Av. Principal 123, Lima",
  },
};
export const DateExample: Story = {
  args: {
    icon: <ClockIcon size="md" />,
    label: "Patient Since",
    value: "January 15, 2024",
  },
};
export const BlueVariant: Story = {
  args: {
    icon: <ZoomOutIcon size="md" />,
    label: "Vision Type",
    value: "Far / Distance",
    variant: "blue",
  },
};
export const YellowVariant: Story = {
  args: {
    icon: <ZoomInIcon size="md" />,
    label: "Vision Type",
    value: "Near",
    variant: "yellow",
  },
};
export const PurpleVariant: Story = {
  args: {
    icon: <LinkIcon size="md" />,
    label: "Vision Type",
    value: "Both",
    variant: "purple",
  },
};
export const GreenVariant: Story = {
  args: {
    icon: <EyeIcon size="md" />,
    label: "Status",
    value: "Active",
    variant: "green",
  },
};
export const RedVariant: Story = {
  args: {
    icon: <EyeIcon size="md" />,
    label: "Status",
    value: "Cancelled",
    variant: "red",
  },
};
export const IndigoVariant: Story = {
  args: {
    icon: <EmailIcon size="md" />,
    label: "Priority",
    value: "High",
    variant: "indigo",
  },
};
export const GrayVariant: Story = {
  args: {
    icon: <ClockIcon size="md" />,
    label: "Information",
    value: "Additional Data",
    variant: "gray",
  },
};
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 max-w-md">
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Default (No Background)"
        value="patient@example.com"
      />
      <InfoRow
        icon={<ZoomOutIcon size="md" />}
        label="Blue - Far Vision"
        value="Distance Vision"
        variant="blue"
      />
      <InfoRow
        icon={<ZoomInIcon size="md" />}
        label="Yellow - Near Vision"
        value="Reading Vision"
        variant="yellow"
      />
      <InfoRow
        icon={<LinkIcon size="md" />}
        label="Purple - Both"
        value="Combined Vision"
        variant="purple"
      />
      <InfoRow
        icon={<EyeIcon size="md" />}
        label="Green - Success"
        value="Active Status"
        variant="green"
      />
      <InfoRow
        icon={<EyeIcon size="md" />}
        label="Red - Error/Cancel"
        value="Cancelled"
        variant="red"
      />
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Indigo - Priority"
        value="High Priority"
        variant="indigo"
      />
      <InfoRow
        icon={<ClockIcon size="md" />}
        label="Gray - Neutral"
        value="Standard Info"
        variant="gray"
      />
    </div>
  ),
};
// ...rest of stories as provided...
