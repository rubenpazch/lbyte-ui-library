import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DrawerMenuMobile, { DrawerMenuMobileProps } from "./DrawerMenuMobile";
import Button from "@rubenpazch/button";
type Story = StoryObj<typeof DrawerMenuMobile>;

/**
 * Modal component
 */
export default {
  component: DrawerMenuMobile,
  tags: ["autodocs"],
} satisfies Meta<typeof DrawerMenuMobile>;

export const Default: Story = {
  render: () => <DrawerMenuMobile />,
};
/**
 * Examples with state
 */
const DrawerMenuMobileWithState = ({ appearFrom }: DrawerMenuMobileProps) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ display: "flex", flexFlow: "row", justifyContent: "flex-end" }}
    >
      <DrawerMenuMobile
        open={open}
        mountOnEnter
        unmountOnExit
        setOpen={setOpen}
        appearFrom={appearFrom}
      />
      <Button
        onClick={() => {
          setOpen(false);
        }}
        color="primary"
      >
        cerrar
      </Button>
      <Button
        onClick={() => {
          setOpen(true);
        }}
        color="secondary"
      >
        abrir
      </Button>
    </div>
  );
};

export const FromLeft: Story = {
  render: () => <DrawerMenuMobileWithState appearFrom="left" />,
};

export const FromRight: Story = {
  render: () => <DrawerMenuMobileWithState appearFrom="right" />,
};

export const FromAbove: Story = {
  render: () => <DrawerMenuMobileWithState appearFrom="above" />,
};

export const FromBelow: Story = {
  render: () => <DrawerMenuMobileWithState appearFrom="below" />,
};
