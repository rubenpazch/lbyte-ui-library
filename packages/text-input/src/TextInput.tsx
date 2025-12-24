import React, { useState, useMemo } from "react";

export interface TextInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  warning?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "email" | "tel" | "password" | "number" | "url";
  className?: string;
  hint?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  validateEmail?: boolean;
  showPasswordStrength?: boolean;
}

// Email validation regex (más completa)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Common email domains for suggestions
// const COMMON_DOMAINS = [
//   'gmail.com',
//   'hotmail.com',
//   'outlook.com',
//   'yahoo.com',
//   'icloud.com',
//   'live.com',
//   'protonmail.com',
// ];

// Function to suggest email corrections
const suggestEmailCorrection = (email: string): string | null => {
  if (!email || !email.includes("@")) return null;

  const [localPart, domainPart] = email.split("@");
  if (!domainPart) return null;

  // Check for common typos in domains
  const typos: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmil.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "hotmal.com": "hotmail.com",
    "outlok.com": "outlook.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
  };

  if (typos[domainPart.toLowerCase()]) {
    return `${localPart}@${typos[domainPart.toLowerCase()]}`;
  }

  return null;
};

// Password strength checker
const checkPasswordStrength = (password: string) => {
  if (!password) return { score: 0, strength: "none", label: "Sin contraseña" };

  let score = 0;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const isLongEnough = password.length >= 8;

  if (hasLowerCase) score++;
  if (hasUpperCase) score++;
  if (hasNumbers) score++;
  if (hasSpecialChar) score++;
  if (isLongEnough) score++;

  if (score <= 1) return { score, strength: "weak", label: "Débil" };
  if (score <= 2) return { score, strength: "fair", label: "Regular" };
  if (score <= 3) return { score, strength: "good", label: "Buena" };
  if (score === 4) return { score, strength: "strong", label: "Fuerte" };
  return { score, strength: "very-strong", label: "Muy fuerte" };
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  type = "text",
  className = "",
  hint,
  maxLength,
  minLength,
  pattern,
  icon,
  onBlur,
  onFocus,
  autoComplete,
  validateEmail = false,
  showPasswordStrength = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Email suggestion (check typos first, before validation)
  const emailSuggestion = useMemo(() => {
    if (!validateEmail || !value) return null;
    return suggestEmailCorrection(value);
  }, [validateEmail, value]);

  // Validate email (email is valid if it matches regex AND has no typo suggestion)
  const isValidEmail = useMemo(() => {
    if (!validateEmail || !value) return null;
    const matchesFormat = EMAIL_REGEX.test(value);
    const hasSuggestion = emailSuggestion !== null;
    return matchesFormat && !hasSuggestion;
  }, [validateEmail, value, emailSuggestion]);

  const emailError =
    validateEmail && value && !isValidEmail && !emailSuggestion
      ? "Correo electrónico inválido"
      : null;

  // Password strength
  const passwordStrength = useMemo(() => {
    if (type !== "password" || !showPasswordStrength) return null;
    return checkPasswordStrength(value);
  }, [type, value, showPasswordStrength]);

  // Number inputs are handled as regular text inputs for now
  // TODO: Implement NumericUpPicker component
  // if (type === 'number') {
  //   return (
  //     <NumericUpPicker ... />
  //   );
  // }

  const handleFocus = () => {
    setIsFocused(true);
    onFocus?.();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  // Character count for inputs with maxLength
  const showCharCount = maxLength && type === "text" && value;
  const charCount = value.length;
  const charPercentage = maxLength ? (charCount / maxLength) * 100 : 0;
  const isNearLimit = charPercentage > 80;
  const isAtLimit = charPercentage >= 100;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Field */}
      <div className="relative">
        {/* Icon before input */}
        {icon && !isFocused && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          className={`
            w-full px-4 py-2 rounded-lg border-2 transition-all outline-none
            font-medium text-gray-900 placeholder-gray-400
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : isFocused
                  ? "border-blue-500 focus:ring-2 focus:ring-blue-200"
                  : "border-gray-300 hover:border-gray-400"
            }
          `}
        />

        {/* Character count */}
        {showCharCount && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs font-medium flex items-center gap-1">
            <div
              className={`${isAtLimit ? "text-red-600" : isNearLimit ? "text-amber-600" : "text-gray-500"}`}
            >
              {charCount}/{maxLength}
            </div>
            {isAtLimit && (
              <svg
                className="w-4 h-4 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Character count bar (for long text) */}
      {showCharCount && maxLength > 20 && (
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all rounded-full ${
              isAtLimit
                ? "bg-red-500"
                : isNearLimit
                  ? "bg-amber-500"
                  : "bg-blue-500"
            }`}
            style={{ width: `${Math.min(charPercentage, 100)}%` }}
          />
        </div>
      )}

      {/* Hint Text */}
      {hint && !error && !emailError && (
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      )}

      {/* Email validation info */}
      {validateEmail && value && isValidEmail && (
        <div className="flex items-center gap-2 mt-1">
          <svg
            className="w-4 h-4 text-green-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-green-600">Correo válido</p>
        </div>
      )}

      {/* Email suggestion for typos */}
      {emailSuggestion && !error && (
        <div className="flex items-center gap-2 mt-1">
          <svg
            className="w-4 h-4 text-blue-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-blue-600">
            ¿Quisiste decir{" "}
            <button
              type="button"
              onClick={() => onChange(emailSuggestion)}
              className="font-semibold underline hover:text-blue-800"
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        </div>
      )}

      {/* Password strength indicator */}
      {passwordStrength && passwordStrength.score > 0 && (
        <div className="mt-2 space-y-2">
          {/* Strength bar */}
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index < passwordStrength.score
                    ? passwordStrength.strength === "weak"
                      ? "bg-red-500"
                      : passwordStrength.strength === "fair"
                        ? "bg-amber-500"
                        : passwordStrength.strength === "good"
                          ? "bg-yellow-500"
                          : passwordStrength.strength === "strong"
                            ? "bg-lime-500"
                            : "bg-green-500"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Strength label */}
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              Fortaleza:{" "}
              <span
                className={`font-semibold ${
                  passwordStrength.strength === "weak"
                    ? "text-red-600"
                    : passwordStrength.strength === "fair"
                      ? "text-amber-600"
                      : passwordStrength.strength === "good"
                        ? "text-yellow-600"
                        : passwordStrength.strength === "strong"
                          ? "text-lime-600"
                          : "text-green-600"
                }`}
              >
                {passwordStrength.label}
              </span>
            </p>
          </div>

          {/* Requirements checklist */}
          <div className="text-xs space-y-1 p-2 bg-gray-50 rounded border border-gray-200">
            <div className="flex items-center gap-2">
              <svg
                className={`w-3.5 h-3.5 flex-shrink-0 ${/[a-z]/.test(value) ? "text-green-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={
                  /[a-z]/.test(value) ? "text-gray-700" : "text-gray-500"
                }
              >
                Letras minúsculas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className={`w-3.5 h-3.5 flex-shrink-0 ${/[A-Z]/.test(value) ? "text-green-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={
                  /[A-Z]/.test(value) ? "text-gray-700" : "text-gray-500"
                }
              >
                Letras mayúsculas
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className={`w-3.5 h-3.5 flex-shrink-0 ${/\d/.test(value) ? "text-green-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={/\d/.test(value) ? "text-gray-700" : "text-gray-500"}
              >
                Números
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className={`w-3.5 h-3.5 flex-shrink-0 ${/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ? "text-green-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
                    ? "text-gray-700"
                    : "text-gray-500"
                }
              >
                Caracteres especiales
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className={`w-3.5 h-3.5 flex-shrink-0 ${value.length >= 8 ? "text-green-500" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className={
                  value.length >= 8 ? "text-gray-700" : "text-gray-500"
                }
              >
                Mínimo 8 caracteres
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {(error || emailError) && (
        <div className="flex items-start gap-2 mt-1">
          <svg
            className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18.101 12.93a1 1 0 00-1.414-1.414L10 15.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-600">{error || emailError}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
