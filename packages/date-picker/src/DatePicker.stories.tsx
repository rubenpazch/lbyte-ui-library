import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DatePicker from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default DatePicker
 * Basic date picker without any selected date
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return <DatePicker label="Select Date" value={value} onChange={setValue} />;
  },
};

/**
 * With Selected Date
 * Date picker with a pre-selected date
 */
export const WithSelectedDate: Story = {
  render: () => {
    const [value, setValue] = useState("2025-11-14");
    return (
      <DatePicker label="Appointment Date" value={value} onChange={setValue} />
    );
  },
};

/**
 * Required Field
 * Date picker marked as required with validation
 */
export const Required: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Birth Date"
        value={value}
        onChange={setValue}
        required
        hint="This field is required"
      />
    );
  },
};

/**
 * Required with Missing Value
 * Shows validation highlighting when required field is empty
 */
export const RequiredEmpty: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Exam Date"
        value={value}
        onChange={setValue}
        required
      />
    );
  },
};

/**
 * With Error
 * Date picker displaying an error message
 */
export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Event Date"
        value={value}
        onChange={setValue}
        error="Please select a valid date"
        required
      />
    );
  },
};

/**
 * With Helper Text
 * Date picker with helpful hint text
 */
export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Consultation Date"
        value={value}
        onChange={setValue}
        hint="Select the date of your next consultation"
      />
    );
  },
};

/**
 * Disabled State
 * Date picker that cannot be interacted with
 */
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState("2025-11-14");
    return (
      <DatePicker
        label="Disabled Date"
        value={value}
        onChange={setValue}
        disabled
      />
    );
  },
};

/**
 * Read Only State
 * Date picker that displays a value but cannot be changed
 */
export const ReadOnly: Story = {
  render: () => {
    const [value, setValue] = useState("2025-01-15");
    return (
      <DatePicker
        label="Contract Date"
        value={value}
        onChange={setValue}
        readOnly
        hint="This date cannot be modified"
      />
    );
  },
};

/**
 * With Date Range Restrictions
 * Date picker with minimum and maximum date constraints
 */
export const WithDateRestrictions: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Appointment Date"
        value={value}
        onChange={setValue}
        minDate="2025-11-01"
        maxDate="2025-12-31"
        hint="Only dates in November and December 2025 are available"
      />
    );
  },
};

/**
 * Past Dates Only
 * Date picker allowing only dates up to today
 */
export const PastDatesOnly: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Last Visit Date"
        value={value}
        onChange={setValue}
        maxDate={new Date().toISOString().split("T")[0]}
        hint="Select a date from the past"
      />
    );
  },
};

/**
 * Future Dates Only
 * Date picker allowing only dates from today onwards
 */
export const FutureDatesOnly: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Next Appointment"
        value={value}
        onChange={setValue}
        minDate={new Date().toISOString().split("T")[0]}
        hint="Select a future date"
      />
    );
  },
};

/**
 * Spanish Locale
 * Shows localized labels for Spanish
 */
export const SpanishLocale: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Fecha"
        value={value}
        onChange={setValue}
        locale="es"
        placeholder="DD/MM/AAAA"
      />
    );
  },
};

/**
 * Without Label
 * Date picker without a label, using only placeholder
 */
export const WithoutLabel: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        value={value}
        onChange={setValue}
        placeholder="Select date..."
      />
    );
  },
};

/**
 * Custom Placeholder
 * Date picker with custom placeholder text
 */
export const CustomPlaceholder: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Choose a Date"
        value={value}
        onChange={setValue}
        placeholder="Click to select..."
      />
    );
  },
};

/**
 * Multiple Date Pickers
 * Example showing multiple date pickers in a form
 */
export const MultipleInForm: Story = {
  render: () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    return (
      <div className="space-y-4 w-96">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          required
          hint="Select the start date"
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          minDate={startDate || undefined}
          required
          hint="Select the end date (must be after start date)"
        />
      </div>
    );
  },
};

/**
 * Mobile View
 * Optimized for mobile devices with touch-friendly interactions
 */
export const MobileView: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Appointment Date"
        value={value}
        onChange={setValue}
        hint="Tap to select a date"
      />
    );
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/**
 * All States Showcase
 * Displays all possible states of the date picker
 */
export const AllStates: Story = {
  render: () => {
    const [date1, setDate1] = useState("");
    const [date2, setDate2] = useState("2025-11-14");
    const [date3, setDate3] = useState("");
    const [date4, setDate4] = useState("");

    return (
      <div className="space-y-6 w-96 p-4">
        <DatePicker
          label="Default"
          value={date1}
          onChange={setDate1}
          hint="Basic date picker"
        />
        <DatePicker
          label="With Selected Date"
          value={date2}
          onChange={setDate2}
          hint="A date is already selected"
        />
        <DatePicker
          label="Required (Empty)"
          value={date3}
          onChange={setDate3}
          required
        />
        <DatePicker
          label="With Error"
          value={date4}
          onChange={setDate4}
          required
          error="This field is required"
        />
        <DatePicker
          label="Disabled"
          value="2025-11-14"
          onChange={() => {}}
          disabled
        />
        <DatePicker
          label="Read Only"
          value="2025-11-14"
          onChange={() => {}}
          readOnly
        />
      </div>
    );
  },
};

/**
 * Year and Month Selection
 * Demonstrates the year and month picker functionality
 */
export const YearMonthSelection: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <DatePicker
        label="Birth Date"
        value={value}
        onChange={setValue}
        hint="Click on the month or year to change them directly"
        minDate="1920-01-01"
        maxDate={new Date().toISOString().split("T")[0]}
      />
    );
  },
};

/**
 * Dark Background
 * Date picker on a dark background
 */
export const DarkBackground: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="bg-gray-900 p-8 rounded-lg">
        <DatePicker
          label="Select Date"
          value={value}
          onChange={setValue}
          hint="Choose your preferred date"
        />
      </div>
    );
  },
};

/**
 * Compact Layout
 * Date picker in a compact form layout
 */
export const CompactLayout: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <div className="w-64">
        <DatePicker label="Date" value={date} onChange={setDate} required />
      </div>
    );
  },
};

/**
 * Wide Layout
 * Date picker in a wide container
 */
export const WideLayout: Story = {
  render: () => {
    const [date, setDate] = useState("");
    return (
      <div className="w-full max-w-2xl">
        <DatePicker
          label="Appointment Date"
          value={date}
          onChange={setDate}
          hint="Select your preferred appointment date"
        />
      </div>
    );
  },
};
