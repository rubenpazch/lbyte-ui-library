import React from "react";
import Autocomplete from "@rubenpazch/autocomplete";
import TextInput from "@rubenpazch/text-input";
import styles from "./IdentificationInput.module.css";
import {
  PeruIdentificationType,
  PERU_IDENTIFICATION_DOCS,
  formatIdentificationInput,
  getIdentificationHint,
  getIdentificationPlaceholder,
} from "./peruvianIdentification";

export type IdentificationInputLabels = {
  documentType: string;
  selectDocumentType: string;
  documentTypeHint: string;
  identificationNumber: string;
};

export interface IdentificationInputProps {
  documentType: PeruIdentificationType | null;
  onDocumentTypeChange: (type: PeruIdentificationType | null) => void;
  identificationNumber: string;
  onIdentificationNumberChange: (value: string) => void;
  documentTypeError?: string;
  identificationNumberError?: string;
  required?: boolean;
  disabled?: boolean;
  labels: IdentificationInputLabels;
  className?: string;
}

const IdentificationInput: React.FC<IdentificationInputProps> = ({
  documentType,
  onDocumentTypeChange,
  identificationNumber,
  onIdentificationNumberChange,
  documentTypeError,
  identificationNumberError,
  required = false,
  disabled = false,
  labels,
  className = "",
}) => {
  const selectedDoc = documentType
    ? PERU_IDENTIFICATION_DOCS[documentType]
    : null;

  const handleIdentificationChange = (value: string) => {
    // Format input according to document type
    if (documentType) {
      const formatted = formatIdentificationInput(documentType, value);
      onIdentificationNumberChange(formatted);
    } else {
      onIdentificationNumberChange(value);
    }
  };

  const documentTypeOptions = Object.values(PERU_IDENTIFICATION_DOCS).map(
    (doc) => ({
      value: doc.type,
      label: doc.label,
      description: doc.description,
    }),
  );

  return (
    <div
      className={[styles.container, className].filter(Boolean).join(" ")}
      data-testid="identification-input"
    >
      {/* Document Type Selection */}
      <Autocomplete
        label={labels.documentType}
        value={documentType}
        onChange={(value) => {
          onDocumentTypeChange(value as PeruIdentificationType | null);
          // Reset identification number when changing document type
          onIdentificationNumberChange("");
        }}
        options={documentTypeOptions}
        placeholder={labels.selectDocumentType}
        error={documentTypeError}
        required={required}
        disabled={disabled}
        hint={labels.documentTypeHint}
        searchable={false}
        clearable
      />

      {/* Identification Number Input */}
      {documentType && selectedDoc && (
        <TextInput
          label={`${labels.identificationNumber} - ${selectedDoc.label}`}
          value={identificationNumber}
          onChange={handleIdentificationChange}
          placeholder={getIdentificationPlaceholder(documentType)}
          error={identificationNumberError}
          hint={getIdentificationHint(documentType)}
          required={required}
          disabled={disabled}
          maxLength={selectedDoc.maxLength}
          type={selectedDoc.alphanumeric ? "text" : "tel"}
          autoComplete="off"
        />
      )}
    </div>
  );
};

export default IdentificationInput;
