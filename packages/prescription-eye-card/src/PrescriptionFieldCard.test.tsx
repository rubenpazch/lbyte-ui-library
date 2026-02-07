import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PrescriptionFieldCard } from "./PrescriptionFieldCard";
import styles from "./PrescriptionFieldCard.module.css";

describe("PrescriptionFieldCard", () => {
  describe("Basic rendering", () => {
    it("renders label and value", () => {
      render(<PrescriptionFieldCard label="Test Label" value="Test Value" />);

      expect(screen.getByText("Test Label")).toBeInTheDocument();
      expect(screen.getByText("Test Value")).toBeInTheDocument();
    });

    it("renders with numeric value", () => {
      render(<PrescriptionFieldCard label="Sphere" value={-2.5} />);

      expect(screen.getByText("Sphere")).toBeInTheDocument();
      expect(screen.getByText("-2.5")).toBeInTheDocument();
    });

    it("renders with string value", () => {
      render(<PrescriptionFieldCard label="Cylinder" value="+1.25" />);

      expect(screen.getByText("Cylinder")).toBeInTheDocument();
      expect(screen.getByText("+1.25")).toBeInTheDocument();
    });
  });

  describe("Range display", () => {
    it("renders range when provided", () => {
      render(
        <PrescriptionFieldCard
          label="Sphere"
          value="-2.00"
          range="Rango: -20.00 D a +20.00 D"
        />,
      );

      expect(
        screen.getByText("Rango: -20.00 D a +20.00 D"),
      ).toBeInTheDocument();
    });

    it("does not render range when not provided", () => {
      const { container } = render(
        <PrescriptionFieldCard label="Sphere" value="-2.00" />,
      );

      const rangeElement = container.querySelector(`.${styles.range}`);
      expect(rangeElement).not.toBeInTheDocument();
    });
  });

  describe("Unit display", () => {
    it("renders unit when provided", () => {
      render(<PrescriptionFieldCard label="DNP" value="32" unit="mm" />);

      expect(screen.getByText("32 mm")).toBeInTheDocument();
    });

    it("renders degree symbol as unit", () => {
      render(<PrescriptionFieldCard label="Axis" value="90" unit="°" />);

      expect(screen.getByText("90 °")).toBeInTheDocument();
    });

    it("renders delta symbol as unit", () => {
      render(<PrescriptionFieldCard label="Prism" value="2" unit="Δ" />);

      expect(screen.getByText("2 Δ")).toBeInTheDocument();
    });

    it("does not render unit when not provided", () => {
      render(<PrescriptionFieldCard label="Sphere" value="-2.00" />);

      const valueText = screen.getByText("-2.00").textContent;
      expect(valueText).toBe("-2.00");
    });
  });

  describe("Required indicator", () => {
    it("shows asterisk when required is true", () => {
      render(<PrescriptionFieldCard label="DNP" value="32" required={true} />);

      const asterisk = screen.getByText("*");
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass(styles.required);
    });

    it("does not show asterisk when required is false", () => {
      render(
        <PrescriptionFieldCard label="Sphere" value="-2.00" required={false} />,
      );

      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("does not show asterisk by default", () => {
      render(<PrescriptionFieldCard label="Sphere" value="-2.00" />);

      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });
  });

  describe("Value formatting", () => {
    it("uses formatValue function when provided", () => {
      const formatValue = (value: string | number) => {
        const num = parseFloat(value.toString());
        return num >= 0 ? `+${num}` : `${num}`;
      };

      render(
        <PrescriptionFieldCard
          label="Sphere"
          value={2.5}
          formatValue={formatValue}
        />,
      );

      expect(screen.getByText("+2.5")).toBeInTheDocument();
    });

    it("formats negative values with formatValue", () => {
      const formatValue = (value: string | number) => {
        const num = parseFloat(value.toString());
        return num >= 0 ? `+${num}` : `${num}`;
      };

      render(
        <PrescriptionFieldCard
          label="Sphere"
          value={-2.5}
          formatValue={formatValue}
        />,
      );

      expect(screen.getByText("-2.5")).toBeInTheDocument();
    });

    it("displays raw value when formatValue is not provided", () => {
      render(<PrescriptionFieldCard label="Sphere" value="0.00" />);

      expect(screen.getByText("0.00")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("applies default variant styles by default", () => {
      const { container } = render(
        <PrescriptionFieldCard label="Sphere" value="-2.00" />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass(styles.variantDefault);
    });

    it("applies default variant styles explicitly", () => {
      const { container } = render(
        <PrescriptionFieldCard
          label="Sphere"
          value="-2.00"
          variant="default"
        />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass(styles.variantDefault);

      const label = screen.getByText("Sphere");
      expect(label).toHaveClass(styles.labelDefault);
    });

    it("applies highlighted variant styles", () => {
      const { container } = render(
        <PrescriptionFieldCard label="DNP" value="32" variant="highlighted" />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass(styles.variantHighlighted);

      const label = screen.getByText("DNP");
      expect(label).toHaveClass(styles.labelHighlighted);
    });

    it("applies success variant styles", () => {
      const { container } = render(
        <PrescriptionFieldCard
          label="Valid Field"
          value="OK"
          variant="success"
        />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass(styles.variantSuccess);

      const label = screen.getByText("Valid Field");
      expect(label).toHaveClass(styles.labelSuccess);
    });

    it("applies warning variant styles", () => {
      const { container } = render(
        <PrescriptionFieldCard
          label="Check Field"
          value="Warning"
          variant="warning"
        />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass(styles.variantWarning);

      const label = screen.getByText("Check Field");
      expect(label).toHaveClass(styles.labelWarning);
    });
  });

  describe("Custom className", () => {
    it("applies custom className", () => {
      const { container } = render(
        <PrescriptionFieldCard
          label="Sphere"
          value="-2.00"
          className="custom-class"
        />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass("custom-class");
    });

    it("preserves base classes with custom className", () => {
      const { container } = render(
        <PrescriptionFieldCard
          label="Sphere"
          value="-2.00"
          className="shadow-lg"
        />,
      );

      const card = container.querySelector(
        '[data-testid="prescription-field-card"]',
      );
      expect(card).toHaveClass(styles.card, styles.variantDefault, "shadow-lg");
    });
  });

  describe("Complex scenarios", () => {
    it("renders sphere field with all features", () => {
      const formatValue = (value: string | number) => {
        const num = parseFloat(value.toString());
        return num >= 0 ? `+${num}` : `${num}`;
      };

      render(
        <PrescriptionFieldCard
          label="ESFERA"
          value={-2.5}
          range="Rango: -20.00 D a +20.00 D"
          formatValue={formatValue}
        />,
      );

      expect(screen.getByText("ESFERA")).toBeInTheDocument();
      expect(screen.getByText("-2.5")).toBeInTheDocument();
      expect(
        screen.getByText("Rango: -20.00 D a +20.00 D"),
      ).toBeInTheDocument();
    });

    it("renders DNP field with highlighted variant, required, and unit", () => {
      render(
        <PrescriptionFieldCard
          label="DNP (Distancia Nasopupilar)"
          value="32"
          range="Rango: 15 mm a 70 mm"
          variant="highlighted"
          required={true}
          unit="mm"
        />,
      );

      expect(
        screen.getByText("DNP (Distancia Nasopupilar)"),
      ).toBeInTheDocument();
      expect(screen.getByText("32 mm")).toBeInTheDocument();
      expect(screen.getByText("Rango: 15 mm a 70 mm")).toBeInTheDocument();
      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("renders axis field with degree unit", () => {
      render(
        <PrescriptionFieldCard
          label="EJE"
          value="90"
          range="Rango: 0° a 180°"
          unit="°"
        />,
      );

      expect(screen.getByText("EJE")).toBeInTheDocument();
      expect(screen.getByText("90 °")).toBeInTheDocument();
      expect(screen.getByText("Rango: 0° a 180°")).toBeInTheDocument();
    });

    it("renders ADD field with formatted value", () => {
      const formatValue = (value: string | number) => `+${value}`;

      render(
        <PrescriptionFieldCard
          label="Adición Cerca (ADD)"
          value="2.00"
          range="Rango: +0.50 D a +5.00 D"
          formatValue={formatValue}
        />,
      );

      expect(screen.getByText("Adición Cerca (ADD)")).toBeInTheDocument();
      expect(screen.getByText("+2.00")).toBeInTheDocument();
      expect(screen.getByText("Rango: +0.50 D a +5.00 D")).toBeInTheDocument();
    });
  });
});
