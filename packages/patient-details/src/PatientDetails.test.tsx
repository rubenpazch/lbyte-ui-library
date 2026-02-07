import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import PatientDetails, {
  type PatientDetailsLabels,
  type PatientDetailsPatient,
} from "./PatientDetails";
import styles from "./PatientDetails.module.css";

const labels: PatientDetailsLabels = {
  patientId: "Patient ID",
  patientGroup: "Patient Group",
  sequenceLabel: "Sequence",
  activeStatus: "● Active",
  inactiveStatus: "○ Inactive",
  contactInformation: "Contact Information",
  additionalInformation: "Additional Information",
  email: "Email",
  phone: "Phone",
  address: "Address",
  dni: "DNI",
  clinicalHistoryNumber: "Historic Clinic Number",
  patientSince: "Patient Since",
  moreInformation: "More Information",
  emergencyContact: "Emergency Contact",
  emergencyContactName: "Emergency Contact Name",
  emergencyPhone: "Emergency Phone",
  locationDetails: "Location Details",
  department: "Department",
  province: "Province",
  district: "District",
  notes: "Notes",
  accountInformation: "Account Information",
  createdAt: "Created At",
  updatedAt: "Last Updated",
  editButton: "Edit Patient",
  viewProfileButton: "View Full Profile",
  viewSubscriptionsButton: "View Subscriptions",
};

const mockPatient: PatientDetailsPatient = {
  id: 1,
  first_name: "Juan",
  last_name: "Pérez",
  email: "juan.perez@example.com",
  phone: "+51 987 654 321",
  address: "Av. Principal 123",
  dni: "12345678",
  clinical_history_number: "HC0001",
  patient_group: { name: "Gold" },
  group_sequential_number: "12",
  emergency_contact: "María Pérez",
  emergency_phone: "+51 999 888 777",
  notes: "Patient notes",
  active: true,
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z",
};

const renderPatientDetails = (
  patient: PatientDetailsPatient = mockPatient,
  overrides: Partial<React.ComponentProps<typeof PatientDetails>> = {},
) => {
  const onClose = jest.fn();
  const onViewProfile = jest.fn();
  const onViewSubscriptions = jest.fn();
  const onEdit = jest.fn();

  const renderResult = render(
    <PatientDetails
      patient={patient}
      onClose={onClose}
      labels={labels}
      ubigeoResolved={{
        department: "Lima",
        province: "Lima",
        district: "Miraflores",
      }}
      showViewProfileButton
      showEditButton={false}
      defaultShowMoreInfo={false}
      onViewProfile={onViewProfile}
      onViewSubscriptions={onViewSubscriptions}
      onEdit={onEdit}
      formatDate={() => "15/01/2024"}
      formatDateTime={() => "15/01/2024 10:30"}
      {...overrides}
    />,
  );

  return {
    ...renderResult,
    onClose,
    onViewProfile,
    onViewSubscriptions,
    onEdit,
  };
};

describe("PatientDetails", () => {
  it("renders patient name correctly", () => {
    renderPatientDetails();
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });

  it("renders patient ID", () => {
    renderPatientDetails();
    expect(screen.getByText("Patient ID: 1")).toBeInTheDocument();
  });

  it("displays patient initials in avatar", () => {
    renderPatientDetails();
    expect(screen.getByText("JP")).toBeInTheDocument();
  });

  it("shows active status badge for active patient", () => {
    renderPatientDetails();
    const badge = screen.getByText(labels.activeStatus);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(styles.statusActive);
  });

  it("shows inactive status badge for inactive patient", () => {
    const inactivePatient = { ...mockPatient, active: false };
    renderPatientDetails(inactivePatient);
    const badge = screen.getByText(labels.inactiveStatus);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass(styles.statusInactive);
  });

  it("renders email when provided", () => {
    renderPatientDetails();
    expect(screen.getByText(labels.email)).toBeInTheDocument();
    expect(screen.getByText("juan.perez@example.com")).toBeInTheDocument();
  });

  it("renders phone when provided", () => {
    renderPatientDetails();
    expect(screen.getByText(labels.phone)).toBeInTheDocument();
    expect(screen.getByText("+51 987 654 321")).toBeInTheDocument();
  });

  it("renders address when provided", () => {
    renderPatientDetails();
    expect(screen.getByText(labels.address)).toBeInTheDocument();
    expect(screen.getByText("Av. Principal 123")).toBeInTheDocument();
  });

  it("renders patient since date", () => {
    renderPatientDetails();
    expect(screen.getByText(labels.patientSince)).toBeInTheDocument();
    expect(screen.getByText("15/01/2024")).toBeInTheDocument();
  });

  it("does not render email row when email is not provided", () => {
    const patientWithoutEmail = {
      ...mockPatient,
      email: "",
    } as PatientDetailsPatient;
    renderPatientDetails(patientWithoutEmail);
    expect(screen.queryByText(labels.email)).not.toBeInTheDocument();
  });

  it("does not render phone row when phone is not provided", () => {
    const patientWithoutPhone = { ...mockPatient, phone: undefined };
    renderPatientDetails(patientWithoutPhone);
    expect(screen.queryByText(labels.phone)).not.toBeInTheDocument();
  });

  it("does not render address row when address is not provided", () => {
    const patientWithoutAddress = { ...mockPatient, address: undefined };
    renderPatientDetails(patientWithoutAddress);
    expect(screen.queryByText(labels.address)).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    const { getAllByRole, onClose } = renderPatientDetails();

    // Get all buttons and find the close button (first icon-only button in header)
    const buttons = getAllByRole("button");
    const closeButton = buttons[0]; // First button is the close button in the header
    await user.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("navigates to prescriptions when view subscriptions button is clicked", async () => {
    const user = userEvent.setup();
    const { onViewSubscriptions } = renderPatientDetails();

    const viewSubscriptionsButton = screen.getByText(
      labels.viewSubscriptionsButton,
    );
    await user.click(viewSubscriptionsButton);
    expect(onViewSubscriptions).toHaveBeenCalledTimes(1);
  });

  it("renders section headers correctly", () => {
    renderPatientDetails();
    expect(screen.getByText(labels.contactInformation)).toBeInTheDocument();
    expect(screen.getByText(labels.additionalInformation)).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    renderPatientDetails();
    expect(screen.getByText(labels.viewProfileButton)).toBeInTheDocument();
    expect(
      screen.getByText(labels.viewSubscriptionsButton),
    ).toBeInTheDocument();
  });

  it("formats date correctly for different locales", () => {
    renderPatientDetails();
    expect(screen.getByText("15/01/2024")).toBeInTheDocument();
  });

  it("handles long patient names gracefully", () => {
    const longNamePatient = {
      ...mockPatient,
      first_name: "María Fernanda",
      last_name: "Rodríguez García",
    };
    renderPatientDetails(longNamePatient);
    expect(
      screen.getByText("María Fernanda Rodríguez García"),
    ).toBeInTheDocument();
  });

  it("handles long addresses gracefully", () => {
    const longAddressPatient = {
      ...mockPatient,
      address:
        "Avenida José Pardo 123, Urbanización Los Jardines del Golf, Distrito de San Isidro",
    };
    renderPatientDetails(longAddressPatient);
    expect(
      screen.getByText(
        "Avenida José Pardo 123, Urbanización Los Jardines del Golf, Distrito de San Isidro",
      ),
    ).toBeInTheDocument();
  });

  it("renders with minimal patient information", () => {
    const minimalPatient: PatientDetailsPatient = {
      id: 2,
      first_name: "Test",
      last_name: "User",
      email: "test@example.com",
      active: true,
      created_at: "2024-02-20T14:45:00Z",
      updated_at: "2024-02-20T14:45:00Z",
    };

    renderPatientDetails(minimalPatient);
    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.queryByText(labels.phone)).not.toBeInTheDocument();
  });

  it("renders patient group and sequence", () => {
    renderPatientDetails();
    expect(screen.getByText(/Patient Group/)).toBeInTheDocument();
    expect(screen.getByText("Gold")).toBeInTheDocument();
    expect(screen.getByText(/Sequence/)).toBeInTheDocument();
    expect(screen.getByText(/#\s*12/)).toBeInTheDocument();
  });

  it("toggles more information section", async () => {
    const user = userEvent.setup();
    renderPatientDetails();

    const toggle = screen.getByText(labels.moreInformation).closest("button");
    expect(screen.queryByText(labels.emergencyContact)).not.toBeInTheDocument();

    await user.click(toggle!);
    expect(screen.getByText(labels.emergencyContact)).toBeInTheDocument();
    expect(screen.getByText(labels.locationDetails)).toBeInTheDocument();
    expect(screen.getByText(labels.notes)).toBeInTheDocument();
  });

  it("hides location details when ubigeo is empty", async () => {
    const user = userEvent.setup();
    renderPatientDetails(mockPatient, {
      ubigeoResolved: {},
    });

    const toggle = screen.getByText(labels.moreInformation).closest("button");
    await user.click(toggle!);

    expect(screen.queryByText(labels.locationDetails)).not.toBeInTheDocument();
  });

  it("calls action callbacks when buttons are clicked", async () => {
    const user = userEvent.setup();
    const onViewProfile = jest.fn();
    const onViewSubscriptions = jest.fn();
    const onEdit = jest.fn();

    renderPatientDetails(mockPatient, {
      showEditButton: true,
      onViewProfile,
      onViewSubscriptions,
      onEdit,
    });

    await user.click(screen.getByText(labels.editButton));
    await user.click(screen.getByText(labels.viewProfileButton));
    await user.click(screen.getByText(labels.viewSubscriptionsButton));

    expect(onEdit).toHaveBeenCalled();
    expect(onViewProfile).toHaveBeenCalled();
    expect(onViewSubscriptions).toHaveBeenCalled();
  });

  it("respects defaultShowMoreInfo prop", () => {
    renderPatientDetails(mockPatient, { defaultShowMoreInfo: true });
    expect(screen.getByText(labels.emergencyContact)).toBeInTheDocument();
    expect(screen.getByText(labels.accountInformation)).toBeInTheDocument();
  });

  it("can hide optional action buttons", () => {
    renderPatientDetails(mockPatient, {
      showViewProfileButton: false,
      showEditButton: false,
    });

    expect(
      screen.queryByText(labels.viewProfileButton),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(labels.editButton)).not.toBeInTheDocument();
    expect(
      screen.getByText(labels.viewSubscriptionsButton),
    ).toBeInTheDocument();
  });
});
