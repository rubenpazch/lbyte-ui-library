import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PrescriptionEyeCard, {
  PrescriptionEyeCardLabels,
  PrescriptionEyeInfo,
} from "./PrescriptionEyeCard";
import styles from "./PrescriptionEyeCard.module.css";

const labels: PrescriptionEyeCardLabels = {
  eyeOD: "Right Eye",
  eyeOI: "Left Eye",
  rx: "RX",
  neutro: "Neutro",
  balance: "Balance",
  compensado: "Compensado",
  sphere: "Sphere",
  cylinder: "Cylinder",
  axis: "Axis",
  dnp: "DNP",
  add: "ADD",
  intermediateAdd: "Intermediate Add",
  prism: "Prism",
  prismBase: "Prism Base",
  height: "Height",
  notes: "Notes",
  prismBaseFallback: "-",
  axisUnit: "°",
  millimetersUnit: "mm",
  prismUnit: "Δ",
};

const prismBaseLookup = {
  getNameByKey: (key: string) => (key === "UP" ? "Up" : key),
};

const renderComponent = (overrides: Partial<PrescriptionEyeInfo> = {}) => {
  return render(
    <PrescriptionEyeCard
      eye="OD"
      eyeInfo={{
        sphere: -2.0,
        cylinder: 0.5,
        axis: 180,
        add: 1.25,
        intermediate_add: 0.75,
        prism: 1,
        prism_base: "UP",
        dnp: 62,
        height: 18,
        notes: "Patient notes",
        rx: true,
        neutro: true,
        balance: true,
        compensado: true,
        ...overrides,
      }}
      prismBaseLookup={prismBaseLookup}
      labels={labels}
    />,
  );
};

describe("PrescriptionEyeCard", () => {
  it("renders card container and eye label", () => {
    renderComponent();

    const card = screen.getByTestId("prescription-eye-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass(styles.card);
    expect(screen.getByText(labels.eyeOD)).toBeInTheDocument();
    expect(screen.getByText("OD")).toBeInTheDocument();
  });

  it("renders all eye flags when present", () => {
    renderComponent();

    expect(screen.getByText(labels.rx)).toBeInTheDocument();
    expect(screen.getByText(labels.neutro)).toBeInTheDocument();
    expect(screen.getByText(labels.balance)).toBeInTheDocument();
    expect(screen.getByText(labels.compensado)).toBeInTheDocument();
  });

  it("formats sphere and cylinder with plus sign", () => {
    renderComponent({ sphere: 1.5, cylinder: 0.75 });

    expect(screen.getByText("+1.5")).toBeInTheDocument();
    expect(screen.getByText("+0.75")).toBeInTheDocument();
  });

  it("renders prism base using lookup", () => {
    renderComponent({ prism_base: "UP" });

    expect(screen.getByText("Up")).toBeInTheDocument();
  });

  it("falls back prism base when missing", () => {
    renderComponent({ prism_base: undefined });

    expect(screen.getByText(labels.prismBaseFallback)).toBeInTheDocument();
  });

  it("renders notes when provided", () => {
    renderComponent({ notes: "Use thinner lenses" });

    expect(screen.getByText(labels.notes)).toBeInTheDocument();
    expect(screen.getByText("Use thinner lenses")).toBeInTheDocument();
  });

  it("does not render notes when absent", () => {
    renderComponent({ notes: undefined });

    expect(screen.queryByText(labels.notes)).not.toBeInTheDocument();
  });
});
