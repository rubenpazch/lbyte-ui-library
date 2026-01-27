import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Avatar, { type AvatarProps } from "./Avatar";
import AvatarGroup from "./AvatarGroup";

const meta: Meta<AvatarProps> = {
  title: "Components/Avatar",
  component: Avatar as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<AvatarProps>;

// Image Avatars
export const ImageAvatar: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "John Doe",
  },
};

export const ImageAvatarWithSrcSet: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=2",
    srcSet: "https://i.pravatar.cc/300?img=2 2x",
    alt: "Jane Smith",
  },
};

// Letter Avatars
export const LetterAvatar: Story = {
  args: {
    children: "H",
  },
};

export const LetterAvatarFromAlt: Story = {
  args: {
    alt: "Kent Dodds",
  },
};

export const MultiLetterAvatar: Story = {
  args: {
    children: "OP",
  },
};

// Icon Avatars
const FolderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const IconAvatar: Story = {
  args: {
    children: <FolderIcon />,
  },
};

// Sizes
export const SizeExtraSmall: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "XS Avatar",
    size: "xs",
  },
};

export const SizeSmall: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=4",
    alt: "Small Avatar",
    size: "sm",
  },
};

export const SizeMedium: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
    alt: "Medium Avatar",
    size: "md",
  },
};

export const SizeLarge: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=6",
    alt: "Large Avatar",
    size: "lg",
  },
};

export const SizeExtraLarge: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=7",
    alt: "XL Avatar",
    size: "xl",
  },
};

// Variants
export const VariantCircular: Story = {
  args: {
    children: "N",
    variant: "circular",
  },
};

export const VariantRounded: Story = {
  args: {
    children: <FolderIcon />,
    variant: "rounded",
  },
};

export const VariantSquare: Story = {
  args: {
    children: "S",
    variant: "square",
  },
};

// Fallbacks
export const FallbackWithChildren: Story = {
  args: {
    src: "/broken-image.jpg",
    alt: "Broken Image",
    children: "B",
  },
};

export const FallbackFromAlt: Story = {
  args: {
    src: "/broken-image.jpg",
    alt: "Remy Sharp",
  },
};

export const FallbackGenericIcon: Story = {
  args: {
    src: "/broken-image.jpg",
  },
};

// Showcase Stories
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar size="xs" src="https://i.pravatar.cc/150?img=8" alt="XS" />
      <Avatar size="sm" src="https://i.pravatar.cc/150?img=9" alt="SM" />
      <Avatar size="md" src="https://i.pravatar.cc/150?img=10" alt="MD" />
      <Avatar size="lg" src="https://i.pravatar.cc/150?img=11" alt="LG" />
      <Avatar size="xl" src="https://i.pravatar.cc/150?img=12" alt="XL" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar variant="circular" alt="Kent Dodds" />
      <Avatar variant="rounded" alt="Jed Watson" />
      <Avatar variant="square" alt="Tim Neutkens" />
    </div>
  ),
};

export const LetterAvatarsShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar alt="Kent Dodds" />
      <Avatar alt="Jed Watson" />
      <Avatar alt="Tim Neutkens" />
      <Avatar alt="Maria Garcia" />
      <Avatar alt="Alex Johnson" />
    </div>
  ),
};

// Avatar Group Stories
export const GroupBasic: Story = {
  render: () => (
    <AvatarGroup max={4}>
      <Avatar src="https://i.pravatar.cc/150?img=13" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=14" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=15" alt="User 3" />
      <Avatar src="https://i.pravatar.cc/150?img=16" alt="User 4" />
      <Avatar src="https://i.pravatar.cc/150?img=17" alt="User 5" />
    </AvatarGroup>
  ),
};

export const GroupWithTotal: Story = {
  render: () => (
    <AvatarGroup total={24}>
      <Avatar src="https://i.pravatar.cc/150?img=18" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=19" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=20" alt="User 3" />
      <Avatar src="https://i.pravatar.cc/150?img=21" alt="User 4" />
    </AvatarGroup>
  ),
};

export const GroupWithCustomSurplus: Story = {
  render: () => (
    <AvatarGroup
      renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
      total={4251}
    >
      <Avatar src="https://i.pravatar.cc/150?img=22" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=23" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=24" alt="User 3" />
      <Avatar src="https://i.pravatar.cc/150?img=25" alt="User 4" />
    </AvatarGroup>
  ),
};

export const GroupSpacingSmall: Story = {
  render: () => (
    <AvatarGroup spacing="small">
      <Avatar src="https://i.pravatar.cc/150?img=26" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=27" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=28" alt="User 3" />
    </AvatarGroup>
  ),
};

export const GroupSpacingMedium: Story = {
  render: () => (
    <AvatarGroup spacing="medium">
      <Avatar src="https://i.pravatar.cc/150?img=29" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=30" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=31" alt="User 3" />
    </AvatarGroup>
  ),
};

export const GroupSpacingCustom: Story = {
  render: () => (
    <AvatarGroup spacing={24}>
      <Avatar src="https://i.pravatar.cc/150?img=32" alt="User 1" />
      <Avatar src="https://i.pravatar.cc/150?img=33" alt="User 2" />
      <Avatar src="https://i.pravatar.cc/150?img=34" alt="User 3" />
    </AvatarGroup>
  ),
};

// Complete Showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        padding: "1rem",
      }}
    >
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Image Avatars</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Avatar src="https://i.pravatar.cc/150?img=35" alt="User 1" />
          <Avatar src="https://i.pravatar.cc/150?img=36" alt="User 2" />
          <Avatar src="https://i.pravatar.cc/150?img=37" alt="User 3" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Letter Avatars</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Avatar alt="Kent Dodds" />
          <Avatar alt="Jed Watson" />
          <Avatar alt="Tim Neutkens" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Icon Avatars</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Avatar>
            <FolderIcon />
          </Avatar>
          <Avatar>
            <UserIcon />
          </Avatar>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Avatar size="xs" src="https://i.pravatar.cc/150?img=38" />
          <Avatar size="sm" src="https://i.pravatar.cc/150?img=39" />
          <Avatar size="md" src="https://i.pravatar.cc/150?img=40" />
          <Avatar size="lg" src="https://i.pravatar.cc/150?img=41" />
          <Avatar size="xl" src="https://i.pravatar.cc/150?img=42" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Variants</h3>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Avatar variant="circular" alt="Circular" />
          <Avatar variant="rounded" alt="Rounded" />
          <Avatar variant="square" alt="Square" />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Avatar Groups</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <AvatarGroup max={3}>
            <Avatar src="https://i.pravatar.cc/150?img=43" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/150?img=44" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/150?img=45" alt="User 3" />
            <Avatar src="https://i.pravatar.cc/150?img=46" alt="User 4" />
            <Avatar src="https://i.pravatar.cc/150?img=47" alt="User 5" />
          </AvatarGroup>

          <AvatarGroup total={24} spacing="small">
            <Avatar src="https://i.pravatar.cc/150?img=48" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/150?img=49" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/150?img=50" alt="User 3" />
          </AvatarGroup>
        </div>
      </div>
    </div>
  ),
};
