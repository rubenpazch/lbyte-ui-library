import type { Meta, StoryObj } from "@storybook/react";

import IconButton from "./IconButton";
import { MenuIcon, MenuGridIcon } from "../Icons";

import React from "react";

type Story = StoryObj<typeof IconButton>;

/**
 * IconButton component
 */
export default {
  component: IconButton,
  tags: ["autodocs"],
} satisfies Meta<typeof IconButton>;

export const StyledIconButton: Story = {
  render: () => {
    return (
      <div>
        <IconButton
          color="primary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="success"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="danger"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="warning"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="info"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="light"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <IconButton
          color="dark"
          size="medium"
          icon={<MenuIcon width={32} height={32} />}
        />
      </div>
    );
  },
};

export const SizeIconButton: Story = {
  render: () => {
    return (
      <div>
        <IconButton
          color="primary"
          size="small"
          icon={<MenuGridIcon size="small" />}
        />
        <IconButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon size="medium" />}
        />
        <IconButton
          color="success"
          size="large"
          icon={<MenuGridIcon size="large" />}
        />
        <IconButton
          color="danger"
          size="x-large"
          icon={<MenuGridIcon size="x-large" />}
        />
      </div>
    );
  },
};

export const ButtonOutlines: Story = {
  render: () => {
    return (
      <div>
        <IconButton
          color="primary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="success"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="danger"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="warning"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="info"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="light"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <IconButton
          color="dark"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
      </div>
    );
  },
};

export const ButtonQuiet: Story = {
  render: () => {
    return (
      <div>
        <IconButton
          color="primary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="success"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="danger"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="warning"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="info"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="light"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <IconButton
          color="dark"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
      </div>
    );
  },
};
