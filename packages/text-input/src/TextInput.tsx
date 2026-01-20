import React, { useState, useMemo } from "react";
import styles from "./TextInput.module.css";

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

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

// Email validation regex (más completa)
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

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
    <div
      className={classNames(styles.container, className)}
      data-testid="text-input"
    >
      {/* Label */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Input Field */}
      <div className={styles.inputContainer}>
        {/* Icon before input */}
        {icon && !isFocused && <div className={styles.icon}>{icon}</div>}

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
          className={classNames(
            styles.input,
            icon ? styles.inputWithIcon : undefined,
            showCharCount ? styles.inputWithCharCount : undefined,
            error ? styles.inputError : undefined,
          )}
          data-testid="input-field"
          data-error={!!error}
        />

        {/* Character count */}
        {showCharCount && (
          <div
            className={classNames(
              styles.charCount,
              isAtLimit
                ? styles.charCountLimit
                : isNearLimit
                  ? styles.charCountNear
                  : styles.charCountNormal,
            )}
            data-testid="char-count"
          >
            <div>
              {charCount}/{maxLength}
            </div>
            {isAtLimit && (
              <svg
                className={styles.charCountIcon}
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
        <div className={styles.charProgressBar}>
          <div
            className={classNames(
              styles.charProgress,
              isAtLimit
                ? styles.charProgressLimit
                : isNearLimit
                  ? styles.charProgressNear
                  : styles.charProgressNormal,
            )}
            style={{ width: `${Math.min(charPercentage, 100)}%` }}
          />
        </div>
      )}

      {/* Hint Text */}
      {hint && !error && !emailError && <p className={styles.hint}>{hint}</p>}

      {/* Email validation info */}
      {validateEmail && value && isValidEmail && (
        <div
          className={classNames(styles.validationMessage, styles.validEmail)}
        >
          <svg
            className={styles.validationIcon}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <p className={styles.validationText}>Correo válido</p>
        </div>
      )}

      {/* Email suggestion for typos */}
      {emailSuggestion && !error && (
        <div
          className={classNames(
            styles.validationMessage,
            styles.emailSuggestion,
          )}
        >
          <svg
            className={styles.validationIcon}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <p className={styles.validationText}>
            ¿Quisiste decir{" "}
            <button
              type="button"
              onClick={() => onChange(emailSuggestion)}
              className={styles.suggestionButton}
            >
              {emailSuggestion}
            </button>
            ?
          </p>
        </div>
      )}

      {/* Password strength indicator */}
      {passwordStrength && passwordStrength.score > 0 && (
        <div className={styles.passwordStrength}>
          {/* Strength bar */}
          <div className={styles.strengthBar}>
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={classNames(
                  styles.strengthSegment,
                  index < passwordStrength.score
                    ? passwordStrength.strength === "weak"
                      ? styles.strengthSegmentWeak
                      : passwordStrength.strength === "fair"
                        ? styles.strengthSegmentFair
                        : passwordStrength.strength === "good"
                          ? styles.strengthSegmentGood
                          : passwordStrength.strength === "strong"
                            ? styles.strengthSegmentStrong
                            : styles.strengthSegmentVeryStrong
                    : styles.strengthSegmentInactive,
                )}
              />
            ))}
          </div>

          {/* Strength label */}
          <div className={styles.strengthLabel}>
            <p className={styles.strengthText}>
              Fortaleza:{" "}
              <span
                className={classNames(
                  styles.strengthValue,
                  passwordStrength.strength === "weak"
                    ? styles.strengthValueWeak
                    : passwordStrength.strength === "fair"
                      ? styles.strengthValueFair
                      : passwordStrength.strength === "good"
                        ? styles.strengthValueGood
                        : passwordStrength.strength === "strong"
                          ? styles.strengthValueStrong
                          : styles.strengthValueVeryStrong,
                )}
              >
                {passwordStrength.label}
              </span>
            </p>
          </div>

          {/* Requirements checklist */}
          <div className={styles.requirements}>
            <div className={styles.requirement}>
              <svg
                className={classNames(
                  styles.requirementIcon,
                  /[a-z]/.test(value)
                    ? styles.requirementIconMet
                    : styles.requirementIconUnmet,
                )}
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
                className={classNames(
                  styles.requirementText,
                  /[a-z]/.test(value) && styles.requirementTextMet,
                )}
              >
                Letras minúsculas
              </span>
            </div>
            <div className={styles.requirement}>
              <svg
                className={classNames(
                  styles.requirementIcon,
                  /[A-Z]/.test(value)
                    ? styles.requirementIconMet
                    : styles.requirementIconUnmet,
                )}
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
                className={classNames(
                  styles.requirementText,
                  /[A-Z]/.test(value) && styles.requirementTextMet,
                )}
              >
                Letras mayúsculas
              </span>
            </div>
            <div className={styles.requirement}>
              <svg
                className={classNames(
                  styles.requirementIcon,
                  /\d/.test(value)
                    ? styles.requirementIconMet
                    : styles.requirementIconUnmet,
                )}
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
                className={classNames(
                  styles.requirementText,
                  /\d/.test(value) && styles.requirementTextMet,
                )}
              >
                Números
              </span>
            </div>
            <div className={styles.requirement}>
              <svg
                className={classNames(
                  styles.requirementIcon,
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
                    ? styles.requirementIconMet
                    : styles.requirementIconUnmet,
                )}
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
                className={classNames(
                  styles.requirementText,
                  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) &&
                    styles.requirementTextMet,
                )}
              >
                Caracteres especiales
              </span>
            </div>
            <div className={styles.requirement}>
              <svg
                className={classNames(
                  styles.requirementIcon,
                  value.length >= 8
                    ? styles.requirementIconMet
                    : styles.requirementIconUnmet,
                )}
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
                className={classNames(
                  styles.requirementText,
                  value.length >= 8 && styles.requirementTextMet,
                )}
              >
                Mínimo 8 caracteres
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {(error || emailError) && (
        <div className={styles.error}>
          <svg
            className={styles.errorIcon}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18.101 12.93a1 1 0 00-1.414-1.414L10 15.586l-6.687-6.687a1 1 0 00-1.414 1.414l8 8a1 1 0 001.414 0l8-8z"
              clipRule="evenodd"
            />
          </svg>
          <p className={styles.errorText}>{error || emailError}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
