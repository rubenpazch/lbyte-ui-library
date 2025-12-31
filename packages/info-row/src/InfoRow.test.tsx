import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoRow from "./InfoRow";
import { EmailIcon, PhoneIcon, LocationIcon } from "@rubenpazch/icons";

describe("InfoRow", () => {
  it("renders with icon, label and value", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders email icon correctly", () => {
    const { container } = render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders phone icon correctly", () => {
    const { container } = render(
      <InfoRow
        icon={<PhoneIcon size="md" />}
        label="Phone"
        value="+51 999 888 777"
      />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("renders location icon correctly", () => {
    const { container } = render(
      <InfoRow
        icon={<LocationIcon size="md" />}
        label="Address"
        value="Av. Principal 123"
      />,
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies correct text styling to label", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    const label = screen.getByText("Email");
    expect(label).toHaveClass("text-sm", "text-gray-500");
  });

  it("applies correct text styling to value", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    const value = screen.getByText("test@example.com");
    expect(value).toHaveClass("text-sm", "font-medium", "text-gray-900");
  });

  it("handles long values without breaking layout", () => {
    const longValue =
      "Avenida José Pardo 123, Urbanización Los Jardines del Golf, Distrito de San Isidro, Lima 15046, Peru";
    render(
      <InfoRow
        icon={<LocationIcon size="md" />}
        label="Address"
        value={longValue}
      />,
    );
    expect(screen.getByText(longValue)).toBeInTheDocument();
  });

  it("handles empty value gracefully", () => {
    render(<InfoRow icon={<EmailIcon size="md" />} label="Email" value="" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });
});
