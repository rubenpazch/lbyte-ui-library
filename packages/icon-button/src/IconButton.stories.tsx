import type { Meta, StoryObj } from "@storybook/react";
import IconButton from "./IconButton";

const meta = {
  title: "Components/IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const editIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const viewIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const plusIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

// Size Stories
export const Small: Story = {
  args: {
    size: "small",
    variant: "default",
    icon: editIcon,
    children: "Edit",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    children: "Edit",
  },
};

// Icon Only
export const IconOnly: Story = {
  args: {
    size: "small",
    variant: "default",
    icon: viewIcon,
  },
};

export const IconOnlyMedium: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: viewIcon,
  },
};

// Variant Stories
export const DefaultVariant: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    children: "Edit",
  },
};

export const Secondary: Story = {
  args: {
    size: "medium",
    variant: "secondary",
    icon: viewIcon,
    children: "View",
  },
};

export const Black: Story = {
  args: {
    size: "medium",
    variant: "black",
    icon: editIcon,
    children: "Edit",
  },
};

export const Blue: Story = {
  args: {
    size: "medium",
    variant: "blue",
    icon: plusIcon,
    children: "Add",
  },
};

export const Pink: Story = {
  args: {
    size: "medium",
    variant: "pink",
    icon: viewIcon,
    children: "View",
  },
};

export const GradientGreen: Story = {
  args: {
    size: "medium",
    variant: "gradient-green",
    icon: editIcon,
    children: "Save",
  },
};

export const SolidGreen: Story = {
  args: {
    size: "medium",
    variant: "solid-green",
    icon: viewIcon,
    children: "Approve",
  },
};

export const Warning: Story = {
  args: {
    size: "medium",
    variant: "warning",
    icon: editIcon,
    children: "Delete",
  },
};

// Style Stories
export const Filled: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    children: "Edit",
    filled: true,
  },
};

export const Outlined: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    children: "Edit",
    filled: false,
  },
};

export const Quiet: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    children: "Edit",
    quiet: true,
  },
};

export const Inverted: Story = {
  args: {
    size: "medium",
    variant: "blue",
    icon: editIcon,
    children: "Edit",
    inverted: true,
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    children: "Edit",
    disabled: true,
  },
};

// Group Story - All Variants
export const AllVariants: Story = {
  args: {
    icon: editIcon,
  },
  render: () => (
    <div className="space-y-4">
      <div className="space-x-2 flex flex-wrap">
        <IconButton variant="default" icon={editIcon}>
          Default
        </IconButton>
        <IconButton variant="secondary" icon={viewIcon}>
          Secondary
        </IconButton>
        <IconButton variant="black" icon={editIcon}>
          Black
        </IconButton>
        <IconButton variant="blue" icon={plusIcon}>
          Blue
        </IconButton>
        <IconButton variant="pink" icon={viewIcon}>
          Pink
        </IconButton>
      </div>
      <div className="space-x-2 flex flex-wrap">
        <IconButton variant="gradient-green" icon={editIcon}>
          Green
        </IconButton>
        <IconButton variant="solid-green" icon={viewIcon}>
          Solid
        </IconButton>
        <IconButton variant="warning" icon={editIcon}>
          Warning
        </IconButton>
      </div>
    </div>
  ),
} as Story;

// Group Story - Icon Only Buttons
export const IconOnlyButtons: Story = {
  args: {
    icon: editIcon,
  },
  render: () => (
    <div className="space-x-2">
      <IconButton size="small" variant="default" icon={editIcon} />
      <IconButton size="medium" variant="blue" icon={viewIcon} />
      <IconButton size="medium" variant="black" icon={plusIcon} />
    </div>
  ),
} as Story;

// Tooltip Stories
export const TooltipTop: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: editIcon,
    tooltip: "Edit this item",
    tooltipPosition: "top",
  },
};

export const TooltipBottom: Story = {
  args: {
    size: "medium",
    variant: "default",
    icon: viewIcon,
    tooltip: "View details",
    tooltipPosition: "bottom",
  },
};

export const TooltipLeft: Story = {
  args: {
    size: "medium",
    variant: "blue",
    icon: plusIcon,
    tooltip: "Create new",
    tooltipPosition: "left",
  },
};

export const TooltipRight: Story = {
  args: {
    size: "medium",
    variant: "black",
    icon: viewIcon,
    tooltip: "Expand options",
    tooltipPosition: "right",
  },
};

// Tooltip with Text Button
export const TooltipWithTextButton: Story = {
  args: {
    size: "medium",
    variant: "blue",
    icon: editIcon,
    children: "Edit",
    tooltip: "Modify item details",
    tooltipPosition: "top",
  },
};

// Tooltip Positions Showcase
export const TooltipPositionsShowcase: Story = {
  args: {
    icon: editIcon,
  },
  render: () => (
    <div className="flex flex-col items-center gap-20 p-20">
      {/* Top */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Top Position
        </h3>
        <IconButton
          variant="default"
          icon={editIcon}
          tooltip="Tooltip on top"
          tooltipPosition="top"
        />
      </div>

      {/* Middle Row - Left and Right */}
      <div className="flex gap-32 items-center justify-center w-full">
        {/* Left */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-4">
            Left Position
          </h3>
          <IconButton
            variant="default"
            icon={viewIcon}
            tooltip="Tooltip on left"
            tooltipPosition="left"
          />
        </div>

        {/* Right */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-4">
            Right Position
          </h3>
          <IconButton
            variant="default"
            icon={plusIcon}
            tooltip="Tooltip on right"
            tooltipPosition="right"
          />
        </div>
      </div>

      {/* Bottom */}
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Bottom Position
        </h3>
        <IconButton
          variant="default"
          icon={editIcon}
          tooltip="Tooltip on bottom"
          tooltipPosition="bottom"
        />
      </div>
    </div>
  ),
} as Story;

// Tooltips with Different Variants
export const TooltipVariants: Story = {
  args: {
    icon: editIcon,
  },
  render: () => (
    <div className="space-x-4 flex flex-wrap gap-4">
      <IconButton
        variant="default"
        icon={editIcon}
        tooltip="Default variant"
        tooltipPosition="top"
      />
      <IconButton
        variant="blue"
        icon={viewIcon}
        tooltip="Blue variant"
        tooltipPosition="top"
      />
      <IconButton
        variant="black"
        icon={plusIcon}
        tooltip="Black variant"
        tooltipPosition="top"
      />
      <IconButton
        variant="pink"
        icon={editIcon}
        tooltip="Pink variant"
        tooltipPosition="top"
      />
      <IconButton
        variant="gradient-green"
        icon={viewIcon}
        tooltip="Gradient green"
        tooltipPosition="top"
      />
      <IconButton
        variant="solid-green"
        icon={plusIcon}
        tooltip="Solid green"
        tooltipPosition="top"
      />
      <IconButton
        variant="warning"
        icon={editIcon}
        tooltip="Warning variant"
        tooltipPosition="top"
      />
    </div>
  ),
} as Story;

// Link Style Buttons - Underline on Hover
export const LinkStyle: Story = {
  args: {
    icon: editIcon,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Link Style Icon + Text
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton
            variant="blue"
            icon={viewIcon}
            linkStyle
            quiet
            tooltip="View details"
            tooltipPosition="top"
          >
            View Details
          </IconButton>
          <IconButton
            variant="default"
            icon={editIcon}
            linkStyle
            quiet
            tooltip="Edit item"
            tooltipPosition="top"
          >
            Edit
          </IconButton>
          <IconButton
            variant="warning"
            icon={plusIcon}
            linkStyle
            quiet
            tooltip="Add new"
            tooltipPosition="top"
          >
            Add New
          </IconButton>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Link Style Icon Only
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton
            variant="blue"
            icon={viewIcon}
            quiet
            tooltip="View with link style"
            tooltipPosition="top"
          />
          <IconButton
            variant="black"
            icon={editIcon}
            quiet
            tooltip="Edit with link style"
            tooltipPosition="top"
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-4">
          Link Style Different Variants
        </h3>
        <div className="flex flex-wrap gap-4">
          <IconButton variant="blue" icon={viewIcon} linkStyle quiet>
            Blue Link
          </IconButton>
          <IconButton variant="secondary" icon={editIcon} linkStyle quiet>
            Secondary Link
          </IconButton>
          <IconButton variant="black" icon={plusIcon} linkStyle quiet>
            Black Link
          </IconButton>
          <IconButton variant="pink" icon={viewIcon} linkStyle quiet>
            Pink Link
          </IconButton>
          <IconButton variant="solid-green" icon={editIcon} linkStyle quiet>
            Green Link
          </IconButton>
        </div>
      </div>
    </div>
  ),
} as Story;
