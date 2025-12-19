import type { Meta, StoryObj } from "@storybook/react";

import Link from "./Link";
import React from "react";

type Story = StoryObj<typeof Link>;

/**
 * Link component
 */
export default {
  component: Link,
  tags: ["autodocs"],
} satisfies Meta<typeof Link>;

export const StyledLink: Story = {
  render: () => {
    return (
      <div>
        <Link styleColor="primary" size="medium" href="#">
          {"Primary"}
        </Link>
        <Link styleColor="secondary" size="medium" href="#">
          {"Secondary"}
        </Link>
        <Link styleColor="success" size="medium" href="#">
          {"Success"}
        </Link>
        <Link styleColor="danger" size="medium" href="#">
          {"Danger"}
        </Link>
        <Link styleColor="warning" size="medium" href="#">
          {"Warining"}
        </Link>
        <Link styleColor="info" size="medium" href="#">
          {"Info"}
        </Link>
        <Link styleColor="light" size="medium" href="#">
          {"Light"}
        </Link>
        <Link styleColor="dark" size="medium" href="#">
          {"Dark"}
        </Link>
        <Link styleColor="link" size="medium" href="#">
          {"Link"}
        </Link>
      </div>
    );
  },
};

export const ButtonOutlines: Story = {
  render: () => {
    return (
      <div>
        <Link styleColor="primary" size="medium" outline href="#">
          {"Primary"}
        </Link>
        <Link styleColor="secondary" size="medium" outline href="#">
          {"Secondary"}
        </Link>
        <Link styleColor="success" size="medium" outline href="#">
          {"Success"}
        </Link>
        <Link styleColor="danger" size="medium" outline href="#">
          {"Danger"}
        </Link>
        <Link styleColor="warning" size="medium" outline href="#">
          {"Warning"}
        </Link>
        <Link styleColor="info" size="medium" outline href="#">
          {"Info"}
        </Link>
        <Link styleColor="light" size="medium" outline href="#">
          {"Dark"}
        </Link>
        <Link styleColor="dark" size="medium" outline href="#">
          {"Dark"}
        </Link>
        <Link styleColor="link" size="medium" outline href="#">
          {"Link"}
        </Link>
      </div>
    );
  },
};
