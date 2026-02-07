import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PrescriptionCard, {
  Prescription,
  PrescriptionCardLabels,
  PrescriptionCardStatusLabels,
} from "./PrescriptionCard";
import styles from "./PrescriptionCard.module.css";

// Mock window.open globally
const mockWindowOpen = jest.fn();
Object.defineProperty(window, "open", {
  value: mockWindowOpen,
  writable: true,
});

const labels: PrescriptionCardLabels = {
  systemIdentifier: "System Identifier",
  manualIdentifier: "Manual Identifier",
  examDate: "Exam Date",
  created: "Created",
  createdBy: "Created by",
  rightEye: "Right Eye",
  leftEye: "Left Eye",
  sphere: "Sphere",
  cylinder: "Cylinder",
  axis: "Axis",
  add: "ADD",
  intermediateAdd: "Intermediate ADD",
  dnp: "DNP",
  height: "Height",
  prism: "Prism",
  prismBase: "Prism Base",
  noData: "No data",
  noOpticalInfo: "No optical information yet",
  observations: "Notes",
  orderNote: "NP",
  workOrder: "OT",
  clinicalHistory: "HC",
  edit: "Edit",
  view: "View",
  viewDetails: "View Details",
  paired: "Paired",
  bothVision: "Ambos",
  farVision: "Lejos",
  nearVision: "Cerca",
  rx: "RX",
  neutro: "Neutro",
  balance: "Balance",
  compensado: "Compensado",
  emptyValue: "—",
  millimetersSuffix: "mm",
  prismSuffix: "Δ",
  axisSuffix: "°",
};

const statusLabels: PrescriptionCardStatusLabels = {
  in_progress: "En Proceso",
  optical_information_complete: "Información óptica completa",
  delivery_pending: "Entrega pendiente",
  completed: "Completado",
  cancelled: "Cancelado",
  pending: "Pendiente",
  delivered: "Entregado",
  archived: "Archivado",
  elaboration_in_progress: "Elaboración en progreso",
};

const formatDateLong = (dateIso: string) => {
  if (!dateIso) return labels.emptyValue;
  return new Date(dateIso).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const mockPrescription: Prescription = {
  id: 1,
  exam_date: "2025-07-30",
  order_number: "ORD-0001",
  system_identifier: "29102025-001",
  manual_identifier: "MAN-001",
  status: "in_progress",
  total_cost: 500,
  deposit_paid: 200,
  balance_due: 300,
  expected_delivery_date: "2025-08-29",
  created_at: "2025-10-29",
  observations: "Progressive lenses with blue light protection",
  user: {
    id: 1,
    email: "admin@optica.com",
  },
  prescription_eyes: [
    {
      eye_type: "OD",
      sphere: -2.0,
      cylinder: -0.5,
      axis: 180,
      add: 1.5,
      intermediate_add: 0.75,
      dnp: 62,
      prism: 0,
    },
    {
      eye_type: "OI",
      sphere: -2.5,
      cylinder: -0.75,
      axis: 175,
      add: 1.5,
      intermediate_add: 0.75,
      dnp: 62,
      prism: 0,
    },
  ],
};

const renderComponent = (
  props: Partial<React.ComponentProps<typeof PrescriptionCard>> = {},
) => {
  return render(
    <PrescriptionCard
      prescription={mockPrescription}
      patientId="1"
      labels={labels}
      statusLabels={statusLabels}
      formatDateLong={formatDateLong}
      {...props}
    />,
  );
};

describe("PrescriptionCard Component", () => {
  describe("Basic Rendering", () => {
    it("renders prescription card container", () => {
      const { container } = renderComponent();

      expect(container.querySelector(`.${styles.card}`)).toBeInTheDocument();
    });

    it("renders with correct status color for in_progress", () => {
      const { container } = renderComponent();

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass(styles.statusInProgress);
    });

    it("renders system identifier", () => {
      renderComponent();

      expect(screen.getByText("29102025-001")).toBeInTheDocument();
    });

    it("renders manual identifier when present", () => {
      renderComponent();

      expect(screen.getByText("MAN-001")).toBeInTheDocument();
    });

    it("does not render manual identifier when undefined", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        manual_identifier: undefined,
      };
      renderComponent({ prescription });

      expect(screen.queryByText("MAN-001")).not.toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("renders formatted exam date", () => {
      renderComponent();

      expect(
        screen.getByText(formatDateLong(mockPrescription.exam_date)),
      ).toBeInTheDocument();
    });

    it("renders formatted created date", () => {
      renderComponent();

      expect(
        screen.getByText(formatDateLong(mockPrescription.created_at)),
      ).toBeInTheDocument();
    });
  });

  describe("User Information", () => {
    it("renders user email when present", () => {
      renderComponent();

      expect(screen.getByText("admin@optica.com")).toBeInTheDocument();
    });

    it("does not render user email when user is undefined", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        user: undefined,
      };
      renderComponent({ prescription });

      expect(screen.queryByText("admin@optica.com")).not.toBeInTheDocument();
    });

    it("does not render user email section when email is missing", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        user: {
          id: 1,
          email: "",
        },
      };
      const { container } = renderComponent({ prescription });
      expect(container.textContent).not.toContain(labels.createdBy);
    });

    it("renders different user emails correctly", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        user: {
          id: 5,
          email: "doctor@clinic.com",
        },
      };
      renderComponent({ prescription });

      expect(screen.getByText("doctor@clinic.com")).toBeInTheDocument();
      expect(screen.queryByText("admin@optica.com")).not.toBeInTheDocument();
    });
  });

  describe("Optical Information", () => {
    it("renders OD eye type", () => {
      const { container } = renderComponent();

      expect(container.textContent).toContain("OD");
    });

    it("renders OI eye type", () => {
      const { container } = renderComponent();

      expect(container.textContent).toContain("OI");
    });

    it("renders optical values correctly", () => {
      renderComponent();

      // OD values
      expect(screen.getByText("-2.00")).toBeInTheDocument();
      expect(screen.getByText("-0.50")).toBeInTheDocument();

      // OI values
      expect(screen.getByText("-2.50")).toBeInTheDocument();
      expect(screen.getByText("-0.75")).toBeInTheDocument();
    });

    it("formats positive values with plus sign", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        prescription_eyes: [
          {
            eye_type: "OD",
            sphere: 1.5,
            cylinder: 0.75,
            axis: 180,
            add: 2.0,
            dnp: 62,
            prism: 0,
          },
        ],
      };

      renderComponent({ prescription });

      expect(screen.getByText("+1.50")).toBeInTheDocument();
      expect(screen.getByText("+0.75")).toBeInTheDocument();
      expect(screen.getByText("+2.00")).toBeInTheDocument();
    });

    it("renders intermediate_add with correct format", () => {
      renderComponent();

      const intermediateAddElements = screen.getAllByText("+0.75");
      expect(intermediateAddElements).toHaveLength(2); // OD and OI
      intermediateAddElements.forEach((element) => {
        expect(element).toBeInTheDocument();
      });
    });

    it("displays no optical info message when empty", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        prescription_eyes: [],
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.noOpticalInfo);
    });
  });

  describe("Observations", () => {
    it("renders observations when present", () => {
      renderComponent();

      expect(
        screen.getByText("Progressive lenses with blue light protection"),
      ).toBeInTheDocument();
    });

    it("does not render observations section when undefined", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        observations: undefined,
      };
      renderComponent({ prescription });

      expect(
        screen.queryByText("Progressive lenses with blue light protection"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Status Variants", () => {
    const statusTests = [
      { status: "in_progress", colorClass: styles.statusInProgress },
      {
        status: "optical_information_complete",
        colorClass: styles.statusOpticalInformationComplete,
      },
      { status: "delivery_pending", colorClass: styles.statusDeliveryPending },
      { status: "completed", colorClass: styles.statusCompleted },
      { status: "cancelled", colorClass: styles.statusCancelled },
    ];

    statusTests.forEach(({ status, colorClass }) => {
      it(`applies correct colors for ${status} status`, () => {
        const prescription: Prescription = { ...mockPrescription, status };
        const { container } = renderComponent({ prescription });

        const card = container.firstChild as HTMLElement;
        expect(card).toHaveClass(colorClass);
      });
    });
  });

  describe("Action Buttons", () => {
    it("renders buttons container", () => {
      const { container } = renderComponent();

      const buttons = container.querySelectorAll("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("disables Edit button when canEdit is false", () => {
      const { container } = renderComponent({ canEdit: false });

      const buttons = container.querySelectorAll("button");
      let hasDisabledButton = false;
      buttons.forEach((btn) => {
        if (btn.hasAttribute("disabled")) {
          hasDisabledButton = true;
        }
      });
      expect(hasDisabledButton).toBe(true);
    });

    it("enables buttons when canEdit is true", () => {
      const { container } = renderComponent({ canEdit: true });

      const buttons = container.querySelectorAll("button[disabled]");
      // Should have fewer disabled buttons when canEdit is true
      expect(buttons.length).toBeLessThan(2);
    });
  });

  describe("Callbacks", () => {
    it("calls onEdit callback when available", async () => {
      const onEdit = jest.fn();
      renderComponent({ onEdit, canEdit: true });

      await userEvent.click(screen.getByRole("button", { name: /Edit/ }));
      expect(onEdit).toHaveBeenCalledTimes(1);
    });

    it("calls onView callback when available", async () => {
      const onView = jest.fn();
      renderComponent({ onView, canEdit: true });

      await userEvent.click(screen.getByRole("button", { name: /View/ }));
      expect(onView).toHaveBeenCalledTimes(1);
    });

    it("calls onViewDetails callback when available", async () => {
      const onViewDetails = jest.fn();
      const prescription: Prescription = {
        ...mockPrescription,
        status: "completed",
      };
      renderComponent({ prescription, onViewDetails });

      await userEvent.click(
        screen.getByRole("button", { name: /View Details/ }),
      );
      expect(onViewDetails).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("handles prescription with no eyes", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        prescription_eyes: undefined,
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.noOpticalInfo);
    });

    it("handles prescription with no manual identifier", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        manual_identifier: undefined,
      };
      renderComponent({ prescription });

      expect(screen.queryByText("MAN-")).not.toBeInTheDocument();
    });

    it("handles prescription with no system identifier", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        system_identifier: undefined,
      };
      const { container } = renderComponent({ prescription });

      // Should show fallback format with ID
      expect(container.textContent).toContain("#1");
    });

    it("handles all optional fields missing", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        system_identifier: undefined,
        manual_identifier: undefined,
        observations: undefined,
        prescription_eyes: [],
        exam_date: "",
        expected_delivery_date: "",
        created_at: "",
      };
      renderComponent({ prescription });

      // Should render — for empty dates
      const dateElements = screen.getAllByText(labels.emptyValue);
      expect(dateElements.length).toBeGreaterThan(0);
    });

    it("renders with empty patient name", () => {
      renderComponent({ patientName: "" });

      // Check for specific exam date format
      expect(
        screen.getByText(formatDateLong(mockPrescription.exam_date)),
      ).toBeInTheDocument();
    });

    it("renders with numeric patient ID", () => {
      renderComponent({ patientId: 123 });

      // Check for specific exam date format
      expect(
        screen.getByText(formatDateLong(mockPrescription.exam_date)),
      ).toBeInTheDocument();
    });
  });

  describe("CSS Classes", () => {
    it("applies card class", () => {
      const { container } = renderComponent();

      const card = container.querySelector(`.${styles.card}`);
      expect(card).toBeInTheDocument();
    });

    it("applies status class", () => {
      const { container } = renderComponent();

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass(styles.statusInProgress);
    });
  });

  describe("Accessibility", () => {
    it("renders system identifier as text content", () => {
      renderComponent();

      expect(screen.getByText("29102025-001")).toBeInTheDocument();
    });

    it("renders buttons with proper roles", () => {
      const { container } = renderComponent();

      const buttons = container.querySelectorAll("button");
      buttons.forEach((button) => {
        expect(button.tagName).toBe("BUTTON");
      });
    });

    it("respects disabled attribute for buttons", () => {
      const { container } = renderComponent({ canEdit: false });

      const buttons = container.querySelectorAll("button[disabled]");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Custom Status Colors", () => {
    it("applies custom color props when provided", () => {
      const customColors = {
        color: "custom-card",
        badgeColor: "custom-badge",
      };

      const { container } = renderComponent({ statusColors: customColors });

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("custom-card");

      const badge = screen
        .getByText(statusLabels.in_progress)
        .closest("[data-color]");
      expect(badge).toHaveClass("custom-badge");
    });
  });

  describe("Status Badge", () => {
    it("renders status badge with correct styling", () => {
      renderComponent();

      const badge = screen
        .getByText(statusLabels.in_progress)
        .closest("[data-color]");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute("data-color", "info");
    });

    it("shows prescription status translated in badge", () => {
      renderComponent();

      const badge = screen
        .getByText(statusLabels.in_progress)
        .closest("[data-color]");
      expect(badge?.textContent).toBeTruthy();
    });
  });

  describe("Vision Type Display", () => {
    it("renders both vision type badge", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "both",
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.bothVision);
    });

    it("renders distance vision type badge", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "distance",
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.farVision);
    });

    it("renders near vision type badge", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "near",
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.nearVision);
    });

    it("shows paired indicator for distance prescription with group_id", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "distance",
        prescription_group_id: "group-123",
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.paired);
    });

    it("shows paired indicator for near prescription with group_id", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "near",
        prescription_group_id: "group-456",
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.paired);
    });

    it("does not show paired indicator for both vision type even with group_id", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "both",
        prescription_group_id: "group-789",
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).not.toContain(labels.paired);
    });

    it("does not show paired indicator for distance without group_id", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "distance",
        prescription_group_id: undefined,
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).not.toContain(labels.paired);
    });

    it("does not show paired indicator for near without group_id", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "near",
        prescription_group_id: undefined,
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).not.toContain(labels.paired);
    });

    it("renders vision type badge with proper styling", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "distance",
      };
      renderComponent({ prescription });

      const badge = screen.getByText(labels.farVision).closest("[data-color]");
      expect(badge).toHaveAttribute("data-color", "primary");
    });

    it("renders paired badge with proper styling when prescription is paired", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "near",
        prescription_group_id: "test-group-id",
      };
      renderComponent({ prescription });

      const pairedBadge = screen
        .getByText(labels.paired)
        .closest("[data-color]");
      expect(pairedBadge).toHaveAttribute("data-color", "info");
    });

    it("defaults to both badge when vision_type is not provided", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: undefined,
      };
      const { container } = renderComponent({ prescription });

      expect(container.textContent).toContain(labels.bothVision);
    });

    it("shows link icon in paired badge", () => {
      const prescription: Prescription = {
        ...mockPrescription,
        vision_type: "distance",
        prescription_group_id: "group-123",
      };
      const { container } = renderComponent({ prescription });

      const svg = screen
        .getByText(labels.paired)
        .closest("[data-color]")
        ?.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Print and Order Handlers", () => {
    beforeEach(() => {
      // Clear mock calls
      mockWindowOpen.mockClear();
    });

    it("calls window.open with print format URL when valid IDs", () => {
      renderComponent({ canEdit: true });

      const printButton = screen.getByRole("button", {
        name: `Print ${labels.clinicalHistory}`,
      });

      printButton.click();
      expect(mockWindowOpen).toHaveBeenCalledWith(
        "/prescriptions/print-format?patientId=1&prescriptionId=1",
        "_blank",
      );
    });

    it("does not open print format when prescriptionId is missing", () => {
      const prescription = { ...mockPrescription, id: undefined as any };
      renderComponent({ prescription, canEdit: true });

      const printButton = screen.getByRole("button", {
        name: `Print ${labels.clinicalHistory}`,
      });

      printButton.click();
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("does not open print format when patientId is missing", () => {
      renderComponent({ patientId: undefined as any, canEdit: true });

      const printButton = screen.getByRole("button", {
        name: `Print ${labels.clinicalHistory}`,
      });

      printButton.click();
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("does not open print format when prescriptionId is NaN", () => {
      const prescription = { ...mockPrescription, id: "invalid" as any };
      renderComponent({ prescription, canEdit: true });

      const printButton = screen.getByRole("button", {
        name: `Print ${labels.clinicalHistory}`,
      });

      printButton.click();
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("does not open print format when patientId is NaN", () => {
      renderComponent({ patientId: "invalid", canEdit: true });

      const printButton = screen.getByRole("button", {
        name: `Print ${labels.clinicalHistory}`,
      });

      printButton.click();
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("calls window.open with order format URL when valid ID", () => {
      // Use a completed prescription so the order format button renders
      const completedPrescription = {
        ...mockPrescription,
        status: "completed" as const,
      };
      renderComponent({ prescription: completedPrescription, canEdit: true });

      const orderButton = screen.getByRole("button", {
        name: `Print ${labels.orderNote}`,
      });

      orderButton.click();
      expect(mockWindowOpen).toHaveBeenCalledWith(
        "/prescriptions/order-format?id=1",
        "_blank",
      );
    });

    it("uses onPrintFormat callback when provided", () => {
      const onPrintFormat = jest.fn();
      renderComponent({ onPrintFormat, canEdit: true });

      const printButton = screen.getByRole("button", {
        name: `Print ${labels.clinicalHistory}`,
      });

      printButton.click();
      expect(onPrintFormat).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("uses onOrderFormat callback when provided", () => {
      const onOrderFormat = jest.fn();
      const completedPrescription = {
        ...mockPrescription,
        status: "completed" as const,
      };
      renderComponent({
        prescription: completedPrescription,
        onOrderFormat,
        canEdit: true,
      });

      const orderButton = screen.getByRole("button", {
        name: `Print ${labels.orderNote}`,
      });
      orderButton.click();
      expect(onOrderFormat).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("uses onWorkOrder callback when provided", () => {
      const onWorkOrder = jest.fn();
      const completedPrescription = {
        ...mockPrescription,
        status: "completed" as const,
      };
      renderComponent({
        prescription: completedPrescription,
        onWorkOrder,
        canEdit: true,
      });

      const workOrderButton = screen.getByRole("button", {
        name: `Print ${labels.workOrder}`,
      });
      workOrderButton.click();
      expect(onWorkOrder).toHaveBeenCalledTimes(1);
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("does not open order format when prescriptionId is missing", () => {
      const prescription = { ...mockPrescription, id: undefined as any };
      const completedPrescription = {
        ...prescription,
        status: "completed" as const,
      };
      renderComponent({ prescription: completedPrescription, canEdit: true });

      const orderButton = screen.getByRole("button", {
        name: `Print ${labels.orderNote}`,
      });

      orderButton.click();
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });

    it("does not open order format when prescriptionId is NaN", () => {
      const prescription = { ...mockPrescription, id: "invalid" as any };
      const completedPrescription = {
        ...prescription,
        status: "completed" as const,
      };
      renderComponent({ prescription: completedPrescription, canEdit: true });

      const orderButton = screen.getByRole("button", {
        name: `Print ${labels.orderNote}`,
      });

      orderButton.click();
      expect(mockWindowOpen).not.toHaveBeenCalled();
    });
  });
});
