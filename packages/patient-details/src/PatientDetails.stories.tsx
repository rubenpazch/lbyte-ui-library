import type { Meta, StoryObj } from "@storybook/react";
import PatientDetails, {
  type PatientDetailsLabels,
  type PatientDetailsPatient,
} from "./PatientDetails";

const meta: Meta<typeof PatientDetails> = {
  title: "Components/PatientDetails",
  component: PatientDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    patient: {
      description: "Patient object with all details",
    },
    onClose: {
      description: "Callback function when close button is clicked",
      action: "closed",
    },
    labels: {
      description: "Text labels for the component",
      control: "object",
    },
    showViewProfileButton: {
      description: "Show or hide the View Full Profile button",
      control: "boolean",
      defaultValue: true,
    },
    showEditButton: {
      description: "Show or hide the Edit button",
      control: "boolean",
      defaultValue: false,
    },
    defaultShowMoreInfo: {
      description: "Show More Information section expanded by default",
      control: "boolean",
      defaultValue: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof PatientDetails>;

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

const formatDate = (dateIso: string) =>
  new Date(dateIso).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const formatDateTime = (dateIso: string) =>
  new Date(dateIso).toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const mockPatient: PatientDetailsPatient = {
  id: 1,
  first_name: "Juan",
  last_name: "Pérez",
  email: "juan.perez@example.com",
  phone: "+51 987 654 321",
  address: "Av. Principal 123",
  dni: "12345678",
  clinical_history_number: "HC0000001",
  emergency_contact: "María Pérez",
  emergency_phone: "+51 999 888 777",
  notes:
    "Patient has a history of myopia. Prefers contact lenses over glasses.",
  active: true,
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z",
  patient_group: { name: "Gold" },
  group_sequential_number: "12",
};

export const Default: Story = {
  args: {
    patient: mockPatient,
    labels,
    ubigeoResolved: {
      department: "Lima",
      province: "Lima",
      district: "Miraflores",
    },
    formatDate,
    formatDateTime,
  },
};

export const ActivePatient: Story = {
  args: {
    patient: {
      ...mockPatient,
      active: true,
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const InactivePatient: Story = {
  args: {
    patient: {
      ...mockPatient,
      active: false,
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const MinimalInformation: Story = {
  args: {
    patient: {
      id: 2,
      first_name: "María",
      last_name: "González",
      dni: "87654321",
      email: "maria@example.com",
      active: true,
      created_at: "2024-02-20T14:45:00Z",
      updated_at: "2024-02-20T14:45:00Z",
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const CompleteInformation: Story = {
  args: {
    patient: {
      ...mockPatient,
      first_name: "Ana",
      last_name: "Torres",
      dni: "98765432",
      clinical_history_number: "HC0000123",
      address: "Avenida Principal 123, Urbanización Los Jardines",
      email: "ana.torres@example.com",
      phone: "+51 999 888 777",
      emergency_contact: "Carlos Torres",
      emergency_phone: "+51 988 777 666",
      notes:
        "Patient requires bifocal lenses. Allergic to certain frame materials. Prefers lightweight frames.",
    },
    labels,
    ubigeoResolved: {
      department: "Lima",
      province: "Lima",
      district: "San Isidro",
    },
    formatDate,
    formatDateTime,
  },
};

export const WithEmergencyContact: Story = {
  args: {
    patient: {
      ...mockPatient,
      emergency_contact: "Rosa Pérez (Sister)",
      emergency_phone: "+51 987 123 456",
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const WithNotes: Story = {
  args: {
    patient: {
      ...mockPatient,
      notes:
        "Patient has sensitive eyes and requires special care when fitting contact lenses. Prefers blue light blocking lenses for computer work.",
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const WithLocationDetails: Story = {
  args: {
    patient: {
      ...mockPatient,
      address: "Calle Las Begonias 456, Piso 3",
    },
    labels,
    ubigeoResolved: {
      department: "Lima",
      province: "Lima",
      district: "San Isidro",
    },
    formatDate,
    formatDateTime,
  },
};

export const NoOptionalFields: Story = {
  args: {
    patient: {
      id: 3,
      first_name: "Pedro",
      last_name: "Ramírez",
      dni: "11223344",
      email: "pedro@example.com",
      active: true,
      created_at: "2024-03-10T09:15:00Z",
      updated_at: "2024-03-10T09:15:00Z",
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const LongName: Story = {
  args: {
    patient: {
      ...mockPatient,
      first_name: "María Fernanda",
      last_name: "Rodríguez García",
      clinical_history_number: "HC0000456",
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const LongAddress: Story = {
  args: {
    patient: {
      ...mockPatient,
      address:
        "Avenida José Pardo 123, Urbanización Los Jardines del Golf, Distrito de San Isidro",
    },
    labels,
    ubigeoResolved: {
      department: "Lima",
      province: "Lima",
      district: "San Isidro",
    },
    formatDate,
    formatDateTime,
  },
};

export const RecentPatient: Story = {
  args: {
    patient: {
      ...mockPatient,
      first_name: "Carlos",
      last_name: "Mendoza",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const OldPatient: Story = {
  args: {
    patient: {
      ...mockPatient,
      first_name: "Roberto",
      last_name: "Silva",
      created_at: "2020-01-01T00:00:00Z",
      updated_at: "2024-11-20T15:30:00Z",
      clinical_history_number: "HC0000789",
      notes: "Long-time patient. Regular check-ups every 6 months.",
    },
    labels,
    formatDate,
    formatDateTime,
  },
};

export const WithEditButton: Story = {
  args: {
    patient: mockPatient,
    showViewProfileButton: false,
    showEditButton: true,
    labels,
    formatDate,
    formatDateTime,
  },
};

export const WithBothButtons: Story = {
  args: {
    patient: mockPatient,
    showViewProfileButton: true,
    showEditButton: true,
    labels,
    formatDate,
    formatDateTime,
  },
};

export const OnlyPrescriptionsButton: Story = {
  args: {
    patient: mockPatient,
    showViewProfileButton: false,
    showEditButton: false,
    labels,
    formatDate,
    formatDateTime,
  },
};

export const FullPageView: Story = {
  args: {
    patient: {
      ...mockPatient,
      emergency_contact: "María Pérez",
      emergency_phone: "+51 999 888 777",
      notes:
        "Patient prefers contact lenses. Allergic to certain frame materials.",
    },
    showViewProfileButton: false,
    showEditButton: true,
    defaultShowMoreInfo: true,
    labels,
    ubigeoResolved: {
      department: "Lima",
      province: "Lima",
      district: "Miraflores",
    },
    formatDate,
    formatDateTime,
  },
};

export const ExpandedByDefault: Story = {
  args: {
    patient: mockPatient,
    defaultShowMoreInfo: true,
    labels,
    formatDate,
    formatDateTime,
  },
};
