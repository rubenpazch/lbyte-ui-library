export type PeruIdentificationType = "dni" | "ce" | "passport";

export type PeruIdentificationDoc = {
  type: PeruIdentificationType;
  label: string;
  description: string;
  maxLength: number;
  alphanumeric: boolean;
  placeholder: string;
  hint: string;
};

export const PERU_IDENTIFICATION_DOCS: Record<
  PeruIdentificationType,
  PeruIdentificationDoc
> = {
  dni: {
    type: "dni",
    label: "DNI",
    description: "National ID (8 digits)",
    maxLength: 8,
    alphanumeric: false,
    placeholder: "12345678",
    hint: "Enter 8 digits",
  },
  ce: {
    type: "ce",
    label: "CE",
    description: "Foreign ID (9 digits)",
    maxLength: 9,
    alphanumeric: false,
    placeholder: "123456789",
    hint: "Enter 9 digits",
  },
  passport: {
    type: "passport",
    label: "Passport",
    description: "Passport (alphanumeric)",
    maxLength: 12,
    alphanumeric: true,
    placeholder: "A1234567",
    hint: "Enter the passport number",
  },
};

export const formatIdentificationInput = (
  type: PeruIdentificationType,
  value: string,
): string => {
  const doc = PERU_IDENTIFICATION_DOCS[type];
  if (!doc) return value;

  const normalized = doc.alphanumeric
    ? value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase()
    : value.replace(/\D/g, "");

  return normalized.slice(0, doc.maxLength);
};

export const getIdentificationPlaceholder = (
  type: PeruIdentificationType,
): string => {
  return PERU_IDENTIFICATION_DOCS[type]?.placeholder ?? "";
};

export const getIdentificationHint = (type: PeruIdentificationType): string => {
  return PERU_IDENTIFICATION_DOCS[type]?.hint ?? "";
};
