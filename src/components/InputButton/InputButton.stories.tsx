import type { Meta, StoryObj } from "@storybook/react";

import InputButton from "./InputButton";
import React from "react";

type Story = StoryObj<typeof InputButton>;

/**
 * Button component
 * by default the button is primary and medium size
 */
export default {
  component: InputButton,
  tags: ["autodocs"],
} satisfies Meta<typeof InputButton>;

export const Default: Story = {
  args: {
    value: "default",
    onClick: () => {
      console.log("testing");
    },
  },
};

export const StyledButton: Story = {
  render: () => {
    return (
      <div>
        <InputButton
          color="primary"
          size="medium"
          value="Primary"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="secondary"
          size="medium"
          value="Secondary"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="success"
          size="medium"
          value="Success"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="danger"
          size="medium"
          value="Danger"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="warning"
          size="medium"
          value="Warning"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="info"
          size="medium"
          value="Info"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="light"
          size="medium"
          value="Light"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="dark"
          size="medium"
          value="Dark"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
        <InputButton
          color="link"
          size="medium"
          value="Link"
          type="button"
          onClick={() => {
            console.log("testing");
          }}
          id="inputField"
        />
      </div>
    );
  },
};

export const InputButtonTypes: Story = {
  render: () => {
    return (
      <div>
        <InputButton
          color="primary"
          size="medium"
          type="button"
          value="button"
          id="inputField"
        />
        <InputButton
          color="primary"
          size="medium"
          type="submit"
          value="submit"
          id="inputField"
        />
        <InputButton
          color="primary"
          size="medium"
          type="reset"
          value="reset"
          id="inputField"
        />
      </div>
    );
  },
};

export const IconButtonOutlines: Story = {
  render: () => {
    return (
      <div>
        <InputButton
          color="primary"
          size="medium"
          value="Primary"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="secondary"
          size="medium"
          value="Secondary"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="success"
          size="medium"
          value="Success"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="danger"
          size="medium"
          value="Danger"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="warning"
          size="medium"
          value="Warning"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="info"
          size="medium"
          value="Info"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="light"
          size="medium"
          value="Light"
          type="button"
          outline
          id="inputField"
        />
        <InputButton
          color="dark"
          size="medium"
          value="Dark"
          type="button"
          outline
          id="inputField"
        />
      </div>
    );
  },
};

export const IconButtonSizes: Story = {
  render: () => {
    return (
      <div>
        <InputButton
          color="primary"
          size="small"
          value="Small"
          type="button"
          id="inputField"
        />
        <InputButton
          color="secondary"
          size="medium"
          value="Medium"
          type="button"
          id="inputField"
        />
        <InputButton
          color="success"
          size="large"
          value="Large"
          type="button"
          id="inputField"
        />
      </div>
    );
  },
};

export const LongTextNoWrap: Story = {
  args: {
    value: "really long text not to be wrapped",
    color: "secondary",
    size: "medium",
    id: "testing",
  },
};

export const LongTextWrapped: Story = {
  args: {
    value: "really long text not to be wrapped",
    color: "secondary",
    size: "medium",
    wrap: true,
    id: "testing",
  },
};

export const LinkButton: Story = {
  args: {
    value: "Link",
    color: "link",
    size: "medium",
    id: "testing",
  },
};

export const Outline: Story = {
  args: {
    value: "outline",
    color: "primary",
    size: "medium",
    outline: true,
    id: "testing",
  },
};
