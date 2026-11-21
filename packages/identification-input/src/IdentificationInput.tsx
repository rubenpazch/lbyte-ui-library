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

export const DEFAULT_IDENTIFICATION_LABELS: IdentificationInputLabels = {
  documentType: "Tipo de documento",
  selectDocumentType: "Selecciona el tipo de documento",
  documentTypeHint: "DNI, carné de extranjería, RUC o pasaporte",
  identificationNumber: "Número de documento",
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
  /** Textos de la interfaz; por defecto en español. */
  labels?: Partial<IdentificationInputLabels>;
  /** Prefijo de los ids de ambos campos. */
  id?: string;
  /** `name` del campo de número (el tipo usa `${name}-tipo`). */
  name?: string;
  className?: string;
}

/** El `ref` apunta al campo del número de documento. */
const IdentificationInput = React.forwardRef<
  HTMLInputElement,
  IdentificationInputProps
>(function IdentificationInput(
  {
    documentType,
    onDocumentTypeChange,
    identificationNumber,
    onIdentificationNumberChange,
    documentTypeError,
    identificationNumberError,
    required = false,
    disabled = false,
    labels: labelsProp,
    id,
    name,
    className = "",
  },
  ref,
) {
  const labels = { ...DEFAULT_IDENTIFICATION_LABELS, ...labelsProp };
  const generatedId = React.useId();
  const baseId = id ?? generatedId;
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
        id={`${baseId}-tipo`}
        name={name ? `${name}-tipo` : undefined}
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
          ref={ref}
          id={`${baseId}-numero`}
          name={name}
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
});

export default IdentificationInput;
