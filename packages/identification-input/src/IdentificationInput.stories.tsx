import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import IdentificationInput, {
  type IdentificationInputProps,
} from "./IdentificationInput";
import type { PeruIdentificationType } from "./peruvianIdentification";

const meta: Meta<IdentificationInputProps> = {
  title: "Components/IdentificationInput",
  component: IdentificationInput as any,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<IdentificationInputProps>;

export const Default: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>(null);
    const [identificationNumber, setIdentificationNumber] = useState("");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={(nextType) => {
          setDocumentType(nextType);
          setIdentificationNumber("");
        }}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const WithErrors: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
    documentTypeError: "Select a document type",
    identificationNumberError: "Invalid document number",
    required: true,
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>("dni");
    const [identificationNumber, setIdentificationNumber] = useState("123");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const Disabled: Story = {
  args: {
    labels: {
      documentType: "Tipo de documento",
      selectDocumentType: "Selecciona un tipo de documento",
      documentTypeHint: "Elige el documento a validar",
      identificationNumber: "Número de documento",
    },
    disabled: true,
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>("passport");
    const [identificationNumber, setIdentificationNumber] =
      useState("A1234567");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const RequiredOnly: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
    required: true,
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>(null);
    const [identificationNumber, setIdentificationNumber] = useState("");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={(nextType) => {
          setDocumentType(nextType);
          setIdentificationNumber("");
        }}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const WithDniPreset: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>("dni");
    const [identificationNumber, setIdentificationNumber] =
      useState("10293847");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const WithCePreset: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>("ce");
    const [identificationNumber, setIdentificationNumber] =
      useState("987654321");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const WithPassportPreset: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>("passport");
    const [identificationNumber, setIdentificationNumber] =
      useState("AB1234567");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={setDocumentType}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const WithCustomLabels: Story = {
  args: {
    labels: {
      documentType: "ID type",
      selectDocumentType: "Choose an ID",
      documentTypeHint: "This helps us verify your identity",
      identificationNumber: "ID number",
    },
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>(null);
    const [identificationNumber, setIdentificationNumber] = useState("");

    return (
      <IdentificationInput
        {...args}
        documentType={documentType}
        onDocumentTypeChange={(nextType) => {
          setDocumentType(nextType);
          setIdentificationNumber("");
        }}
        identificationNumber={identificationNumber}
        onIdentificationNumberChange={setIdentificationNumber}
      />
    );
  },
};

export const WithExternalErrors: Story = {
  args: {
    labels: {
      documentType: "Document type",
      selectDocumentType: "Select document type",
      documentTypeHint: "Choose the document to validate",
      identificationNumber: "Document number",
    },
  },
  render: (args) => {
    const [documentType, setDocumentType] =
      useState<PeruIdentificationType | null>("dni");
    const [identificationNumber, setIdentificationNumber] = useState("123");
    const [showErrors, setShowErrors] = useState(true);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <button
          type="button"
          onClick={() => setShowErrors((prev) => !prev)}
          style={{
            padding: "0.5rem 0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #d1d5db",
            background: "#ffffff",
            cursor: "pointer",
          }}
        >
          {showErrors ? "Hide errors" : "Show errors"}
        </button>
        <IdentificationInput
          {...args}
          documentType={documentType}
          onDocumentTypeChange={setDocumentType}
          identificationNumber={identificationNumber}
          onIdentificationNumberChange={setIdentificationNumber}
          documentTypeError={showErrors ? "Select a document type" : undefined}
          identificationNumberError={
            showErrors ? "Invalid document number" : undefined
          }
          required
        />
      </div>
    );
  },
};
