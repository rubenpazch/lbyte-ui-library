import type { Meta, StoryObj } from "@storybook/react";

import SquareButton from "./SquareButton";
import { MenuIcon, MenuGridIcon } from "../Icons";

import React from "react";

type Story = StoryObj<typeof SquareButton>;

/**
 * SquareButton component
 */
export default {
  component: SquareButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SquareButton>;

export const StyledSquareButton: Story = {
  render: () => {
    return (
      <div>
        <SquareButton
          color="primary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="success"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="danger"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="warning"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="info"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="light"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
        />
        <SquareButton
          color="dark"
          size="medium"
          icon={<MenuIcon width={32} height={32} />}
        />
      </div>
    );
  },
};

export const SizeSquareButton: Story = {
  render: () => {
    return (
      <div>
        <SquareButton
          color="primary"
          size="small"
          icon={<MenuGridIcon size="small" />}
        />
        <SquareButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon size="medium" />}
        />
        <SquareButton
          color="success"
          size="large"
          icon={<MenuGridIcon size="large" />}
        />
        <SquareButton
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
        <SquareButton
          color="primary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
          color="success"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
          color="danger"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
          color="warning"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
          color="info"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
          color="light"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
        />
        <SquareButton
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
        <SquareButton
          color="primary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
          color="secondary"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
          color="success"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
          color="danger"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
          color="warning"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
          color="info"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
          color="light"
          size="medium"
          icon={<MenuGridIcon width={32} height={32} />}
          outline
          quiet
        />
        <SquareButton
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
