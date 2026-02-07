import type { Meta, StoryObj } from "@storybook/react";
import PatientSearch, {
  PatientSearchLabels,
  PatientSearchPatient,
} from "./PatientSearch";

const labels: PatientSearchLabels = {
  searchPlaceholder: "Search patients",
  resultsTitle: "Patients",
  activeStatus: "Active",
  inactiveStatus: "Inactive",
  noResultsTitle: "No results",
  noResultsHint: "Try a different search",
  createNewPatient: "Create new patient",
  withSearchTerm: "With search term",
  dniLabel: "DNI",
};

const createSearchPatients = (patients: PatientSearchPatient[], delay = 0) => {
  return () =>
    new Promise<{ patients: PatientSearchPatient[] }>((resolve) =>
      setTimeout(() => resolve({ patients }), delay),
    );
};

const meta = {
  title: "Components/PatientSearch",
  component: PatientSearch,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof PatientSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default state of PatientSearch component with an empty search field.
 * Users can start typing to search for patients.
 */
export const Default: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "md",
  },
};

/**
 * Small size variant of PatientSearch.
 * Ideal for compact layouts, sidebars, or embedded contexts.
 */
export const Small: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "sm",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Medium size variant of PatientSearch.
 * Default size, suitable for most contexts.
 */
export const Medium: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "md",
  },
};

/**
 * Large size variant of PatientSearch.
 * Ideal for prominent search contexts or full-width layouts.
 */
export const Large: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "lg",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "800px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * PatientSearch with search results displayed.
 * Shows how the component displays multiple patient results with
 * their information and status badges.
 */
export const WithSearchResults: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan@example.com",
        phone: "987654321",
        dni: "12345678",
        active: true,
      },
      {
        id: 2,
        first_name: "Maria",
        last_name: "García",
        email: "maria@example.com",
        phone: "987654322",
        dni: "87654321",
        active: true,
      },
      {
        id: 3,
        first_name: "Pedro",
        last_name: "López",
        email: "pedro@example.com",
        phone: "987654323",
        dni: "11111111",
        active: false,
      },
    ]),
    labels,
    size: "md",
    initialSearchTerm: "Juan",
  },
};

/**
 * PatientSearch with no results found.
 * Displays the empty state message and "Create New Patient" option
 * when the search term doesn't match any patients.
 */
export const NoResults: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "md",
    initialSearchTerm: "NoMatch",
  },
};

/**
 * PatientSearch in loading state.
 * Shows the loading spinner while fetching search results from the API.
 */
export const Loading: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([], 5000),
    labels,
    size: "md",
    initialSearchTerm: "Loading",
  },
};

/**
 * PatientSearch with a single result.
 * Displays when the search term matches exactly one patient.
 */
export const SingleResult: Story = {
  args: {
    size: "md",
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan@example.com",
        phone: "987654321",
        dni: "12345678",
        active: true,
      },
    ]),
    labels,
    initialSearchTerm: "Juan",
  },
};

/**
 * PatientSearch with highlighted search term.
 * Demonstrates how the search term is highlighted in the results
 * using yellow background to help users identify matches.
 */
export const HighlightedSearchTerm: Story = {
  args: {
    size: "md",
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan@example.com",
        phone: "987654321",
        dni: "12345678",
        active: true,
      },
    ]),
    labels,
    initialSearchTerm: "Juan",
  },
};

/**
 * PatientSearch with inactive patient.
 * Shows how inactive patients are displayed with a gray status badge
 * instead of the green active badge.
 */
export const WithInactivePatient: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan@example.com",
        phone: "987654321",
        dni: "12345678",
        active: false,
      },
    ]),
    labels,
    size: "md",
    initialSearchTerm: "Juan",
  },
};

/**
 * PatientSearch with patient missing optional fields.
 * Shows how the component handles patients with missing email
 * or other optional information gracefully.
 */
export const MissingOptionalFields: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: null,
        phone: "987654321",
        dni: null,
        active: true,
      },
    ]),
    labels,
    size: "md",
    initialSearchTerm: "Juan",
  },
};

/**
 * PatientSearch with special characters in search.
 * Demonstrates searching and highlighting special characters
 * like accents in patient names (e.g., "Pérez").
 */
export const SpecialCharactersInSearch: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan@example.com",
        phone: "987654321",
        dni: "12345678",
        active: true,
      },
      {
        id: 2,
        first_name: "Maria",
        last_name: "Pérez",
        email: "maria@example.com",
        phone: "987654322",
        dni: "87654321",
        active: true,
      },
    ]),
    labels,
    size: "md",
    initialSearchTerm: "Pérez",
  },
};

/**
 * PatientSearch with many results.
 * Shows how the component handles pagination and overflow
 * when there are many search results.
 */
export const ManyResults: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients(
      Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        first_name: `Patient${i + 1}`,
        last_name: `Last${i + 1}`,
        email: `patient${i + 1}@example.com`,
        phone: `98765432${i}`,
        dni: `${String(i + 1).padStart(8, "0")}`,
        active: i % 2 === 0,
      })),
    ),
    labels,
    size: "md",
    initialSearchTerm: "Patient",
  },
};

/**
 * PatientSearch with focused input.
 * Shows the search input with focus state,
 * ready to receive user input.
 */
export const Focused: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The input field is focused and ready for user input. Try typing to see search in action.",
      },
    },
  },
};

/**
 * PatientSearch with create new patient highlighted.
 * Shows the keyboard navigation highlighting the
 * "Create New Patient" button at the bottom of the dropdown.
 */
export const CreateNewPatientHighlighted: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "md",
    initialSearchTerm: "NewPatient",
  },
};

/**
 * PatientSearch accessibility showcase.
 * Demonstrates keyboard navigation:
 * - Arrow Up/Down: Navigate through results
 * - Enter: Select highlighted patient or create new
 * - Escape: Close dropdown
 */
export const KeyboardNavigation: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([
      {
        id: 1,
        first_name: "Juan",
        last_name: "Pérez",
        email: "juan@example.com",
        phone: "987654321",
        dni: "12345678",
        active: true,
      },
      {
        id: 2,
        first_name: "Maria",
        last_name: "García",
        email: "maria@example.com",
        phone: "987654322",
        dni: "87654321",
        active: true,
      },
    ]),
    labels,
    size: "md",
    initialSearchTerm: "Juan",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Keyboard Navigation - Try these shortcuts:\n" +
          "- Arrow Down: Navigate to next result\n" +
          "- Arrow Up: Navigate to previous result\n" +
          "- Enter: Select highlighted result\n" +
          "- Escape: Close dropdown",
      },
    },
  },
};

/**
 * PatientSearch with custom styling example.
 * Shows how the component fits into a larger page context
 * with proper spacing and layout.
 */
export const InPageContext: Story = {
  args: {
    onSelectPatient: (patient) => console.log("Selected patient:", patient),
    onSearchPatients: createSearchPatients([]),
    labels,
    size: "lg",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "100%",
          padding: "40px",
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h1
            style={{
              marginBottom: "24px",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            Find a Patient
          </h1>
          <Story />
        </div>
      </div>
    ),
  ],
};
