import type { Meta, StoryObj } from "@storybook/react";
import PrescriptionCard, {
  PrescriptionCardLabels,
  PrescriptionCardStatusLabels,
} from "./PrescriptionCard";

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

const meta = {
  title: "Components/PrescriptionCard",
  component: PrescriptionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PrescriptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockPrescription = {
  id: 1,
  order_number: "29102025-001",
  system_identifier: "29102025-001",
  exam_date: "2025-07-30",
  expected_delivery_date: "2025-08-29",
  created_at: "2025-10-29",
  observations: "Progressive lenses with blue light protection",
  patient_id: 1,
  status: "in_progress",
  total_cost: 500,
  deposit_paid: 200,
  balance_due: 300,
  user: {
    id: 1,
    email: "admin@optica.com",
  },
  prescription_eyes: [
    {
      id: 1,
      eye_type: "OD",
      sphere: -2.0,
      cylinder: -0.5,
      add: 1.5,
      dnp: 62.0,
    },
    {
      id: 2,
      eye_type: "OS",
      sphere: -2.5,
      cylinder: -0.75,
      add: 1.5,
      dnp: 62.0,
    },
  ],
};

const baseArgs = {
  labels,
  statusLabels,
  formatDateLong,
};

// Status Variants
export const InProgress: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "in_progress",
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

export const Pending: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "pending",
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const Completed: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "completed",
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const Delivered: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "delivered",
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const Cancelled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "cancelled",
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const OpticalInformationComplete: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "optical_information_complete",
    },
    patientId: "1",
    canEdit: false,
    ...baseArgs,
  },
};

export const OnHold: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "on_hold",
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const Archived: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      status: "archived",
    },
    patientId: "1",
    ...baseArgs,
  },
};

// Base Prescription
export const Default: Story = {
  args: {
    prescription: mockPrescription,
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// With Callbacks
export const WithCallbacks: Story = {
  args: {
    prescription: mockPrescription,
    patientId: "1",
    canEdit: true,
    onEdit: () => alert("Edit clicked"),
    onView: () => alert("View clicked"),
    onViewDetails: () => alert("View Details clicked"),
    ...baseArgs,
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    prescription: mockPrescription,
    patientId: "1",
    canEdit: false,
    ...baseArgs,
  },
};

// Without Observations
export const NoObservations: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      observations: "",
    },
    patientId: "1",
    ...baseArgs,
  },
};

// Without Delivery Date
export const NoDeliveryDate: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      expected_delivery_date: "",
    },
    patientId: "1",
    ...baseArgs,
  },
};

// Custom Status Color
export const CustomStatusColor: Story = {
  args: {
    prescription: mockPrescription,
    patientId: "1",
    statusColors: {
      color: "custom-card",
      badgeColor: "custom-badge",
    },
    ...baseArgs,
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`.custom-card { background: #f5e6ff; border-color: #d8b4fe; color: #6b21a8; } .custom-badge { border: 1px solid #d8b4fe; }`}</style>
        <Story />
      </div>
    ),
  ],
};

// Multiple Cards
export const MultipleStates: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <PrescriptionCard
        prescription={{ ...mockPrescription, status: "pending" }}
        patientId="1"
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{ ...mockPrescription, status: "in_progress" }}
        patientId="1"
        canEdit={true}
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{ ...mockPrescription, status: "completed" }}
        patientId="1"
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{ ...mockPrescription, status: "delivered" }}
        patientId="1"
        {...baseArgs}
      />
    </div>
  ),
  args: {
    prescription: mockPrescription,
    patientId: "1",
    ...baseArgs,
  },
} as Story;

// User Email Variants
export const WithUserEmail: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      user: {
        id: 1,
        email: "admin@optica.com",
      },
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const WithDifferentUserEmail: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      user: {
        id: 5,
        email: "doctor@clinic.com",
      },
    },
    patientId: "1",
    ...baseArgs,
  },
};

export const WithoutUserEmail: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      user: undefined,
    },
    patientId: "1",
    ...baseArgs,
  },
};

// Vision Type Variants
export const BothVisionType: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      vision_type: "both",
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

export const DistanceVisionType: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      vision_type: "distance",
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

export const NearVisionType: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      vision_type: "near",
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// Paired Prescriptions
export const PairedDistancePrescription: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      vision_type: "distance",
      prescription_group_id: "d4eeeb8c-7d2a-4adf-a296-6ce8e05b5738",
      status: "optical_information_complete",
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

export const PairedNearPrescription: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      vision_type: "near",
      prescription_group_id: "d4eeeb8c-7d2a-4adf-a296-6ce8e05b5738",
      status: "optical_information_complete",
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// All Vision Types Showcase
export const AllVisionTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <PrescriptionCard
        prescription={{ ...mockPrescription, vision_type: "both" }}
        patientId="1"
        canEdit={true}
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{ ...mockPrescription, vision_type: "distance" }}
        patientId="1"
        canEdit={true}
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{ ...mockPrescription, vision_type: "near" }}
        patientId="1"
        canEdit={true}
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{
          ...mockPrescription,
          vision_type: "distance",
          prescription_group_id: "group-123",
        }}
        patientId="1"
        canEdit={true}
        {...baseArgs}
      />
      <PrescriptionCard
        prescription={{
          ...mockPrescription,
          vision_type: "near",
          prescription_group_id: "group-123",
        }}
        patientId="1"
        canEdit={true}
        {...baseArgs}
      />
    </div>
  ),
  args: {
    prescription: mockPrescription,
    patientId: "1",
    ...baseArgs,
  },
} as Story;

// Complete Prescription with All Fields
export const CompleteWithAllFields: Story = {
  args: {
    prescription: {
      id: 42,
      order_number: "07122025-008",
      system_identifier: "07122025-008",
      manual_identifier: "OT-2025-1234",
      exam_date: "2025-12-07",
      expected_delivery_date: "2025-12-21",
      created_at: "2025-12-07T10:30:00Z",
      status: "optical_information_complete",
      total_cost: 1250.0,
      deposit_paid: 500.0,
      balance_due: 750.0,
      observations:
        "Paciente requiere lentes progresivos de alta gama con tratamiento anti-reflejo y protección contra luz azul. Montura de titanio ligera recomendada para uso prolongado.",
      vision_type: "distance",
      prescription_group_id: "f693f8ed-44a6-4b1d-99b5-d03ca36d1257",
      user: {
        id: 1,
        email: "admin@optica.com",
      },
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -3.25,
          cylinder: -1.5,
          axis: 180,
          add: 2.0,
          intermediate_add: 1.25,
          prism: 1.5,
          prism_base: "UP",
          dnp: 32,
          height: 22,
          notes: "Ojo dominante, requiere precisión extra en centrado",
        },
        {
          eye_type: "OI",
          sphere: -2.75,
          cylinder: -1.25,
          axis: 175,
          add: 2.0,
          intermediate_add: 1.25,
          prism: 1.0,
          prism_base: "NASAL",
          dnp: 31,
          height: 22,
          notes: "Paciente reporta sensibilidad a luces brillantes",
        },
      ],
    },
    patientId: "27",
    patientName: "Juan Carlos Pérez",
    canEdit: true,
    ...baseArgs,
  },
};

// Complete Prescription - Both Vision Type
export const CompleteWithBothVision: Story = {
  args: {
    prescription: {
      id: 100,
      order_number: "07122025-100",
      system_identifier: "07122025-100",
      manual_identifier: "OT-2025-5678",
      exam_date: "2025-12-05",
      expected_delivery_date: "2025-12-20",
      created_at: "2025-12-05T14:15:00Z",
      status: "in_progress",
      total_cost: 850.0,
      deposit_paid: 425.0,
      balance_due: 425.0,
      observations: "Lentes bifocales con transición fotocromática",
      vision_type: "both",
      user: {
        id: 3,
        email: "doctor@optica.com",
      },
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -1.5,
          cylinder: -0.75,
          axis: 90,
          add: 1.75,
          intermediate_add: 0.75,
          dnp: 30,
          height: 20,
        },
        {
          eye_type: "OI",
          sphere: -1.75,
          cylinder: -0.5,
          axis: 85,
          add: 1.75,
          intermediate_add: 0.75,
          dnp: 30,
          height: 20,
        },
      ],
    },
    patientId: "15",
    patientName: "María González",
    canEdit: true,
    ...baseArgs,
  },
};

// Complete Paired Prescription Set
export const CompletePairedSet: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          Prescripciones Vinculadas
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Ejemplo de prescripciones de lejos y cerca vinculadas para el mismo
          paciente
        </p>
        <div className="space-y-4">
          <PrescriptionCard
            prescription={{
              id: 30,
              order_number: "07122025-030",
              system_identifier: "07122025-030",
              manual_identifier: "OT-LEJOS-001",
              exam_date: "2025-12-03",
              expected_delivery_date: "2025-12-17",
              created_at: "2025-12-03T09:00:00Z",
              status: "optical_information_complete",
              total_cost: 600.0,
              deposit_paid: 300.0,
              balance_due: 300.0,
              observations:
                "Lentes de lejos para conducir y actividades diarias",
              vision_type: "distance",
              prescription_group_id: "f693f8ed-44a6-4b1d-99b5-d03ca36d1257",
              user: {
                id: 1,
                email: "admin@optica.com",
              },
              prescription_eyes: [
                {
                  eye_type: "OD",
                  sphere: -2.5,
                  cylinder: -1.0,
                  axis: 180,
                  dnp: 32,
                  height: 22,
                },
                {
                  eye_type: "OI",
                  sphere: -2.25,
                  cylinder: -0.75,
                  axis: 175,
                  dnp: 31,
                  height: 22,
                },
              ],
            }}
            patientId="27"
            patientName="Roberto Silva"
            canEdit={true}
            {...baseArgs}
          />
          <PrescriptionCard
            prescription={{
              id: 31,
              order_number: "07122025-031",
              system_identifier: "07122025-031",
              manual_identifier: "OT-CERCA-001",
              exam_date: "2025-12-03",
              expected_delivery_date: "2025-12-17",
              created_at: "2025-12-03T09:15:00Z",
              status: "optical_information_complete",
              total_cost: 550.0,
              deposit_paid: 275.0,
              balance_due: 275.0,
              observations:
                "Lentes de cerca para lectura y trabajo en computadora",
              vision_type: "near",
              prescription_group_id: "f693f8ed-44a6-4b1d-99b5-d03ca36d1257",
              user: {
                id: 1,
                email: "admin@optica.com",
              },
              prescription_eyes: [
                {
                  eye_type: "OD",
                  sphere: 0.5,
                  cylinder: -0.5,
                  add: 2.25,
                  dnp: 28,
                },
                {
                  eye_type: "OI",
                  sphere: 0.75,
                  cylinder: -0.25,
                  add: 2.25,
                  dnp: 28,
                },
              ],
            }}
            patientId="27"
            patientName="Roberto Silva"
            canEdit={true}
            {...baseArgs}
          />
        </div>
      </div>
    </div>
  ),
  args: {
    prescription: mockPrescription,
    patientId: "1",
    ...baseArgs,
  },
} as Story;

// Minimal Prescription (Only Required Fields)
export const MinimalRequiredFields: Story = {
  args: {
    prescription: {
      id: 999,
      order_number: "07122025-999",
      exam_date: "2025-12-07",
      expected_delivery_date: "",
      created_at: "2025-12-07T12:00:00Z",
      status: "in_progress",
      total_cost: 0,
      deposit_paid: 0,
      balance_due: 0,
    },
    patientId: "99",
    canEdit: true,
    ...baseArgs,
  },
};

// Prescription with RX field enabled
export const WithRXEnabled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -2.0,
          cylinder: -0.5,
          add: 1.5,
          dnp: 62.0,
          rx: true,
        },
        {
          eye_type: "OI",
          sphere: -2.5,
          cylinder: -0.75,
          add: 1.5,
          dnp: 62.0,
          rx: true,
        },
      ],
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// Prescription with Neutro field enabled
export const WithNeutroEnabled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: undefined,
          cylinder: undefined,
          add: undefined,
          dnp: 62.0,
          neutro: true,
        },
        {
          eye_type: "OI",
          sphere: undefined,
          cylinder: undefined,
          add: undefined,
          dnp: 62.0,
          neutro: true,
        },
      ],
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// Prescription with Balance field enabled
export const WithBalanceEnabled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -2.0,
          cylinder: -0.5,
          add: 1.5,
          dnp: 62.0,
          balance: true,
        },
        {
          eye_type: "OI",
          sphere: undefined,
          cylinder: undefined,
          add: undefined,
          dnp: 62.0,
          balance: true,
        },
      ],
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// Prescription with Compensado field enabled
export const WithCompensadoEnabled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -1.5,
          cylinder: -0.25,
          add: 1.0,
          dnp: 62.0,
          compensado: true,
        },
        {
          eye_type: "OI",
          sphere: -1.75,
          cylinder: -0.5,
          add: 1.0,
          dnp: 62.0,
          compensado: true,
        },
      ],
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// Prescription with multiple fields enabled
export const WithMultipleFieldsEnabled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -2.0,
          cylinder: -0.5,
          add: 1.5,
          dnp: 62.0,
          rx: true,
          compensado: true,
        },
        {
          eye_type: "OI",
          sphere: undefined,
          cylinder: undefined,
          add: undefined,
          dnp: 62.0,
          neutro: true,
          balance: true,
        },
      ],
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// Prescription with all fields enabled
export const WithAllFieldsEnabled: Story = {
  args: {
    prescription: {
      ...mockPrescription,
      system_identifier: "07122025-001",
      manual_identifier: "OT-2025-001",
      prescription_eyes: [
        {
          eye_type: "OD",
          sphere: -2.0,
          cylinder: -0.5,
          add: 1.5,
          dnp: 62.0,
          rx: true,
          neutro: false,
          balance: true,
          compensado: true,
        },
        {
          eye_type: "OI",
          sphere: -2.5,
          cylinder: -0.75,
          add: 1.5,
          dnp: 62.0,
          rx: true,
          neutro: false,
          balance: true,
          compensado: true,
        },
      ],
    },
    patientId: "1",
    canEdit: true,
    ...baseArgs,
  },
};

// All Eye Field Variants Showcase
export const AllEyeFieldVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div className="bg-blue-50 p-2 rounded">
        <p className="text-xs font-semibold text-blue-900 mb-2">
          RX Habilitado
        </p>
        <PrescriptionCard
          prescription={{
            ...mockPrescription,
            system_identifier: "07122025-001",
            prescription_eyes: [
              {
                eye_type: "OD",
                sphere: -2.0,
                cylinder: -0.5,
                add: 1.5,
                dnp: 62.0,
                rx: true,
              },
              {
                eye_type: "OI",
                sphere: -2.5,
                cylinder: -0.75,
                add: 1.5,
                dnp: 62.0,
                rx: true,
              },
            ],
          }}
          patientId="1"
          canEdit={true}
          {...baseArgs}
        />
      </div>

      <div className="bg-green-50 p-2 rounded">
        <p className="text-xs font-semibold text-green-900 mb-2">
          Neutro Habilitado
        </p>
        <PrescriptionCard
          prescription={{
            ...mockPrescription,
            system_identifier: "07122025-002",
            prescription_eyes: [
              {
                eye_type: "OD",
                sphere: undefined,
                cylinder: undefined,
                dnp: 62.0,
                neutro: true,
              },
              {
                eye_type: "OI",
                sphere: undefined,
                cylinder: undefined,
                dnp: 62.0,
                neutro: true,
              },
            ],
          }}
          patientId="1"
          canEdit={true}
          {...baseArgs}
        />
      </div>

      <div className="bg-yellow-50 p-2 rounded">
        <p className="text-xs font-semibold text-yellow-900 mb-2">
          Balance y Compensado
        </p>
        <PrescriptionCard
          prescription={{
            ...mockPrescription,
            system_identifier: "07122025-003",
            prescription_eyes: [
              {
                eye_type: "OD",
                sphere: -1.5,
                cylinder: -0.25,
                dnp: 62.0,
                balance: true,
                compensado: true,
              },
              {
                eye_type: "OI",
                sphere: undefined,
                cylinder: undefined,
                dnp: 62.0,
                balance: true,
                compensado: true,
              },
            ],
          }}
          patientId="1"
          canEdit={true}
          {...baseArgs}
        />
      </div>

      <div className="bg-purple-50 p-2 rounded">
        <p className="text-xs font-semibold text-purple-900 mb-2">
          Todos los Campos Habilitados
        </p>
        <PrescriptionCard
          prescription={{
            ...mockPrescription,
            system_identifier: "07122025-004",
            prescription_eyes: [
              {
                eye_type: "OD",
                sphere: -2.0,
                cylinder: -0.5,
                add: 1.5,
                dnp: 62.0,
                rx: true,
                balance: true,
                compensado: true,
              },
              {
                eye_type: "OI",
                sphere: -2.5,
                cylinder: -0.75,
                add: 1.5,
                dnp: 62.0,
                rx: true,
                balance: true,
                compensado: true,
              },
            ],
          }}
          patientId="1"
          canEdit={true}
          {...baseArgs}
        />
      </div>
    </div>
  ),
  args: {
    prescription: mockPrescription,
    patientId: "1",
    ...baseArgs,
  },
} as Story;
