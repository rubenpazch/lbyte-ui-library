import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import InfoRow from "./InfoRow";
import styles from "./InfoRow.module.css";
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
    expect(screen.getByTestId("info-row-label")).toHaveTextContent("Email");
    expect(screen.getByTestId("info-row-value")).toHaveTextContent(
      "test@example.com",
    );
  });

  it("renders email icon correctly", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    expect(screen.getByTestId("info-row-icon")).toBeInTheDocument();
  });

  it("renders phone icon correctly", () => {
    render(
      <InfoRow
        icon={<PhoneIcon size="md" />}
        label="Phone"
        value="+51 999 888 777"
      />,
    );
    expect(screen.getByTestId("info-row-icon")).toBeInTheDocument();
  });

  it("renders location icon correctly", () => {
    render(
      <InfoRow
        icon={<LocationIcon size="md" />}
        label="Address"
        value="Av. Principal 123"
      />,
    );
    expect(screen.getByTestId("info-row-icon")).toBeInTheDocument();
  });

  it("applies correct text styling to label", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    const label = screen.getByTestId("info-row-label");
    expect(label).toHaveClass(
      styles.label,
      styles.labelMd,
      styles.labelColorDefault,
    );
  });

  it("applies correct text styling to value", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
      />,
    );
    const value = screen.getByTestId("info-row-value");
    expect(value).toHaveClass(styles.value, styles.valueMd);
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
    expect(screen.getByTestId("info-row-value")).toHaveTextContent(longValue);
  });

  it("handles empty value gracefully", () => {
    render(<InfoRow icon={<EmailIcon size="md" />} label="Email" value="" />);
    expect(screen.getByTestId("info-row-label")).toHaveTextContent("Email");
  });

  it("applies variant classes correctly", () => {
    const { container } = render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
        variant="blue"
      />,
    );
    const infoRow = screen.getByTestId("info-row");
    expect(infoRow).toHaveAttribute("data-variant", "blue");
    expect(infoRow).toHaveClass(styles.variantBlue);
  });

  it("applies size classes correctly", () => {
    const { container } = render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
        size="lg"
      />,
    );
    const infoRow = screen.getByTestId("info-row");
    expect(infoRow).toHaveAttribute("data-size", "lg");
    expect(infoRow).toHaveClass(styles.spacingLg, styles.paddingLg);
  });

  it("applies layout classes correctly", () => {
    const { container } = render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
        layout="horizontal"
      />,
    );
    const infoRow = screen.getByTestId("info-row");
    expect(infoRow).toHaveAttribute("data-layout", "horizontal");
    expect(infoRow).toHaveClass(styles.layoutHorizontal);
  });

  it("hides icon when hideIcon is true", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
        hideIcon
      />,
    );
    expect(screen.queryByTestId("info-row-icon")).not.toBeInTheDocument();
  });

  it("hides label when hideLabel is true", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
        hideLabel
      />,
    );
    expect(screen.queryByTestId("info-row-label")).not.toBeInTheDocument();
  });

  it("renders action element when provided", () => {
    render(
      <InfoRow
        icon={<EmailIcon size="md" />}
        label="Email"
        value="test@example.com"
        action={<button>Edit</button>}
      />,
    );
    expect(screen.getByTestId("info-row-action")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});
