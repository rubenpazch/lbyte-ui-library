import type { Meta, StoryObj } from "@storybook/react";
import { useState, useCallback, useRef } from "react";
import Autocomplete, { AutocompleteOption } from "./Autocomplete";
import { UsersIcon } from "@rubenpazch/icons";

const meta = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    warning: { control: "text" },
    hint: { control: "text" },
    required: { control: "boolean" },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    loading: { control: "boolean" },
    clearable: { control: "boolean" },
    searchable: { control: "boolean" },
    highlightMatch: { control: "boolean" },
    keepListOpen: { control: "boolean" },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries: AutocompleteOption[] = [
  { value: "us", label: "United States", description: "North America" },
  { value: "ca", label: "Canada", description: "North America" },
  { value: "mx", label: "Mexico", description: "North America" },
  { value: "br", label: "Brazil", description: "South America" },
  { value: "ar", label: "Argentina", description: "South America" },
  { value: "pe", label: "Peru", description: "South America" },
  { value: "uk", label: "United Kingdom", description: "Europe" },
  { value: "fr", label: "France", description: "Europe" },
  { value: "de", label: "Germany", description: "Europe" },
  { value: "es", label: "Spain", description: "Europe" },
  { value: "it", label: "Italy", description: "Europe" },
  { value: "jp", label: "Japan", description: "Asia" },
  { value: "cn", label: "China", description: "Asia" },
  { value: "in", label: "India", description: "Asia" },
  { value: "au", label: "Australia", description: "Oceania" },
];

const prismBases: AutocompleteOption[] = [
  {
    value: "IN",
    label: "IN (Hacia Adentro)",
    description: "Base interna del prisma",
  },
  {
    value: "OUT",
    label: "OUT (Hacia Afuera)",
    description: "Base externa del prisma",
  },
  {
    value: "UP",
    label: "UP (Hacia Arriba)",
    description: "Base superior del prisma",
  },
  {
    value: "DOWN",
    label: "DOWN (Hacia Abajo)",
    description: "Base inferior del prisma",
  },
];

const frameworks: AutocompleteOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid.js" },
];

const disabledOptions: AutocompleteOption[] = [
  { value: "option1", label: "Available Option 1" },
  { value: "option2", label: "Disabled Option", disabled: true },
  { value: "option3", label: "Available Option 2" },
  { value: "option4", label: "Another Disabled Option", disabled: true },
];

/**
 * Interactive autocomplete with state management.
 * This shows how the autocomplete works in a real scenario.
 */
export const WithState: Story = {
  args: { value: null, onChange: () => {}, options: [] },
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <div className="w-96">
        <Autocomplete
          label="Select Country"
          value={value}
          onChange={setValue}
          options={countries}
          placeholder="Search countries..."
          clearable
          searchable
          highlightMatch
        />
        <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
          <strong>Selected:</strong> {value || "None"}
        </div>
      </div>
    );
  },
};

/**
 * Basic autocomplete with minimal configuration
 */
export const Basic: Story = {
  args: {
    label: "Framework",
    placeholder: "Select a framework...",
    value: null,
    options: frameworks,
    onChange: () => {},
  },
};

/**
 * Autocomplete with descriptions for each option
 */
export const WithDescriptions: Story = {
  args: {
    label: "Prism Base",
    placeholder: "Select prism base...",
    value: null,
    options: prismBases,
    onChange: () => {},
  },
};

/**
 * Autocomplete with search highlighting enabled
 */
export const WithHighlight: Story = {
  args: { value: null, onChange: () => {}, options: [] },
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <div className="w-96">
        <Autocomplete
          label="Country with Highlight"
          value={value}
          onChange={setValue}
          options={countries}
          placeholder="Type to search..."
          highlightMatch
          hint="Search results will be highlighted"
        />
      </div>
    );
  },
};

/**
 * Autocomplete with create new functionality
 */
export const WithCreateNew: Story = {
  args: { value: null, onChange: () => {}, options: [] },
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    const [opts, setOpts] = useState(frameworks);

    const handleCreate = (searchTerm: string) => {
      const newOption: AutocompleteOption = {
        value: searchTerm.toLowerCase().replace(/\s+/g, "-"),
        label: searchTerm,
      };
      setOpts([...opts, newOption]);
      setValue(newOption.value);
    };

    return (
      <div className="w-96">
        <Autocomplete
          label="Framework (with create)"
          value={value}
          onChange={setValue}
          options={opts}
          placeholder="Search or create..."
          onCreate={handleCreate}
          createLabel="Add"
          hint="Type and press Enter to create new option"
        />
      </div>
    );
  },
};

/**
 * Autocomplete in loading state
 */
export const Loading: Story = {
  args: {
    label: "Loading Data",
    placeholder: "Loading...",
    value: null,
    options: [],
    loading: true,
    loadingText: "Fetching data...",
    onChange: () => {},
  },
};

/**
 * Autocomplete with error state
 */
export const WithError: Story = {
  args: {
    label: "Country (Required)",
    placeholder: "Select a country...",
    value: null,
    options: countries,
    required: true,
    error: "Please select a country",
    onChange: () => {},
  },
};

/**
 * Autocomplete with warning state
 */
export const WithWarning: Story = {
  args: {
    label: "Country",
    placeholder: "Select a country...",
    value: "us",
    options: countries,
    warning: "This selection may affect shipping costs",
    onChange: () => {},
  },
};

/**
 * Disabled autocomplete
 */
export const Disabled: Story = {
  args: {
    label: "Disabled Autocomplete",
    placeholder: "Cannot interact",
    value: "us",
    options: countries,
    disabled: true,
    onChange: () => {},
  },
};

/**
 * Read-only autocomplete
 */
export const ReadOnly: Story = {
  args: {
    label: "Read-only Autocomplete",
    value: "us",
    options: countries,
    readOnly: true,
    onChange: () => {},
  },
};

/**
 * Autocomplete with icon
 */
export const WithIcon: Story = {
  args: {
    label: "User Selection",
    placeholder: "Select user...",
    value: null,
    options: frameworks,
    icon: <UsersIcon className="w-5 h-5" />,
    onChange: () => {},
  },
};

/**
 * Autocomplete with disabled options
 */
export const WithDisabledOptions: Story = {
  args: {
    label: "Options with Disabled",
    placeholder: "Some options are disabled...",
    value: null,
    options: disabledOptions,
    onChange: () => {},
  },
};

/**
 * Non-searchable autocomplete (traditional select behavior)
 */
export const NonSearchable: Story = {
  args: {
    label: "Traditional Select",
    placeholder: "Click to select...",
    value: null,
    options: frameworks,
    searchable: false,
    onChange: () => {},
  },
};

/**
 * Autocomplete without clear button
 */
export const NotClearable: Story = {
  args: {
    label: "Cannot Clear",
    value: "react",
    options: frameworks,
    clearable: false,
    onChange: () => {},
  },
};

/**
 * Autocomplete with minimum search length
 */
export const MinSearchLength: Story = {
  args: { value: null, onChange: () => {}, options: [] },
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <div className="w-96">
        <Autocomplete
          label="Minimum 2 characters"
          value={value}
          onChange={setValue}
          options={countries}
          placeholder="Type at least 2 characters..."
          minSearchLength={2}
          hint="Start typing to see results (min 2 chars)"
        />
      </div>
    );
  },
};

/**
 * Autocomplete with external search/filtering
 *
 * This example demonstrates how to use the Autocomplete component with an external API.
 *
 * **Key Points:**
 * - Use `onSearch` callback to trigger API calls
 * - Set `loading` prop to `true` during API requests
 * - Use `debounceMs` to avoid excessive API calls (recommended: 300-500ms)
 * - Update `options` prop with results from API
 * - Handle empty search state appropriately
 *
 * **Implementation:**
 * ```tsx
 * const [value, setValue] = useState(null);
 * const [loading, setLoading] = useState(false);
 * const [options, setOptions] = useState([]);
 *
 * const handleSearch = async (searchTerm: string) => {
 *   if (!searchTerm) {
 *     setOptions([]);
 *     return;
 *   }
 *
 *   setLoading(true);
 *   try {
 *     const response = await fetch(`/api/search?q=${searchTerm}`);
 *     const data = await response.json();
 *     setOptions(data);
 *   } catch (error) {
 *     console.error('Search failed:', error);
 *     setOptions([]);
 *   } finally {
 *     setLoading(false);
 *   }
 * };
 *
 * <Autocomplete
 *   value={value}
 *   onChange={setValue}
 *   options={options}
 *   onSearch={handleSearch}
 *   loading={loading}
 *   debounceMs={500}
 * />
 * ```
 */
export const WithExternalSearch: Story = {
  args: { value: null, onChange: () => {}, options: [] },
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    const [loading, setLoading] = useState(false);
    const [filteredOpts, setFilteredOpts] =
      useState<AutocompleteOption[]>(countries);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleSearch = useCallback((searchTerm: string) => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset to all options if search is cleared
      if (!searchTerm) {
        setFilteredOpts(countries);
        setLoading(false);
        return;
      }

      setLoading(true);

      // Simulate API call with 500ms delay
      timeoutRef.current = setTimeout(() => {
        const filtered = countries.filter((country) =>
          country.label.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setFilteredOpts(filtered);
        setLoading(false);
      }, 500);
    }, []);

    return (
      <div className="w-96">
        <Autocomplete
          label="External Search"
          value={value}
          onChange={setValue}
          options={filteredOpts}
          placeholder="Type to search countries..."
          onSearch={handleSearch}
          loading={loading}
          debounceMs={500}
          minSearchLength={1}
          searchable
          hint="Shows all countries initially, then filters via API call with 500ms delay"
        />
      </div>
    );
  },
};

/**
 * Autocomplete with custom max height
 */
export const CustomMaxHeight: Story = {
  args: {
    label: "Custom Dropdown Height",
    placeholder: "Select country...",
    value: null,
    options: countries,
    maxHeight: "150px",
    onChange: () => {},
  },
};

/**
 * Autocomplete with position top
 */
export const PositionTop: Story = {
  args: {
    label: "Dropdown Opens Upward",
    placeholder: "Click to see...",
    value: null,
    options: frameworks,
    position: "top",
    onChange: () => {},
  },
};

/**
 * Keep list open after selection
 */
export const KeepListOpen: Story = {
  args: { value: null, onChange: () => {}, options: [] },
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <div className="w-96">
        <Autocomplete
          label="List Stays Open"
          value={value}
          onChange={setValue}
          options={frameworks}
          placeholder="Select multiple times..."
          keepListOpen
          hint="Dropdown stays open after selection"
        />
      </div>
    );
  },
};
