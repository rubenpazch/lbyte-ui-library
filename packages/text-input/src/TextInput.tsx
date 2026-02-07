import React, { useState, useMemo } from "react";
import { CheckIcon, ErrorIcon, InfoIcon } from "@rubenpazch/icons";
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
  requiredMessage?: string;
  emailValidMessage?: string;
  emailInvalidMessage?: string;
  emailSuggestionMessage?: string;
  strengthLabels?: Partial<Record<PasswordStrengthKey, string>>;
  strengthLabelPrefix?: string;
  requirementsLabels?: Partial<PasswordRequirementsLabels>;
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

type PasswordStrengthKey =
  | "none"
  | "weak"
  | "fair"
  | "good"
  | "strong"
  | "very-strong";

type PasswordRequirementsLabels = {
  lowercase: string;
  uppercase: string;
  number: string;
  special: string;
  minLength: string;
};

// Password strength checker
const checkPasswordStrength = (password: string) => {
  if (!password) return { score: 0, strength: "none" as PasswordStrengthKey };

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

  if (score <= 1) return { score, strength: "weak" as PasswordStrengthKey };
  if (score <= 2) return { score, strength: "fair" as PasswordStrengthKey };
  if (score <= 3) return { score, strength: "good" as PasswordStrengthKey };
  if (score === 4) return { score, strength: "strong" as PasswordStrengthKey };
  return { score, strength: "very-strong" as PasswordStrengthKey };
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
  requiredMessage,
  emailValidMessage,
  emailInvalidMessage,
  emailSuggestionMessage,
  strengthLabels,
  strengthLabelPrefix,
  requirementsLabels,
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

  const isEmailInvalid =
    validateEmail && value && !isValidEmail && !emailSuggestion;
  const emailError = isEmailInvalid ? emailInvalidMessage || null : null;

  const meetsMinLength = minLength ? value.length >= minLength : true;
  const meetsMaxLength = maxLength ? value.length <= maxLength : true;
  const matchesPattern = pattern ? new RegExp(pattern).test(value) : true;

  const showSuccess = Boolean(
    value &&
    !error &&
    !isEmailInvalid &&
    !emailSuggestion &&
    (!required || value.length > 0) &&
    (!validateEmail || isValidEmail) &&
    meetsMinLength &&
    meetsMaxLength &&
    matchesPattern,
  );

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
            error || isEmailInvalid ? styles.inputError : undefined,
            !disabled && !error && !emailError && showSuccess
              ? styles.inputSuccess
              : undefined,
          )}
          data-testid="input-field"
          data-error={!!error || !!isEmailInvalid}
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
              <ErrorIcon className={styles.charCountIcon} size="sm" />
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
      {hint && !error && !isEmailInvalid && (
        <p className={styles.hint}>{hint}</p>
      )}

      {/* Required helper */}
      {required && !value && !error && !isEmailInvalid && requiredMessage && (
        <p className={styles.requiredHelper}>{requiredMessage}</p>
      )}

      {/* Email validation info */}
      {validateEmail && value && isValidEmail && emailValidMessage && (
        <div
          className={classNames(styles.validationMessage, styles.validEmail)}
        >
          <CheckIcon className={styles.validationIcon} size="sm" />
          <p className={styles.validationText}>{emailValidMessage}</p>
        </div>
      )}

      {/* Email suggestion for typos */}
      {emailSuggestion && !error && emailSuggestionMessage && (
        <div
          className={classNames(
            styles.validationMessage,
            styles.emailSuggestion,
          )}
        >
          <InfoIcon className={styles.validationIcon} size="sm" />
          <p className={styles.validationText}>
            {emailSuggestionMessage.replace("{suggestion}", emailSuggestion)}
            <button
              type="button"
              onClick={() => onChange(emailSuggestion)}
              className={styles.suggestionButton}
            >
              {emailSuggestion}
            </button>
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
          {(strengthLabelPrefix ||
            strengthLabels?.[passwordStrength.strength]) && (
            <div className={styles.strengthLabel}>
              <p className={styles.strengthText}>
                {strengthLabelPrefix && `${strengthLabelPrefix} `}
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
                  {strengthLabels?.[passwordStrength.strength]}
                </span>
              </p>
            </div>
          )}

          {/* Requirements checklist */}
          {requirementsLabels && (
            <div className={styles.requirements}>
              {requirementsLabels.lowercase && (
                <div className={styles.requirement}>
                  <CheckIcon
                    className={classNames(
                      styles.requirementIcon,
                      /[a-z]/.test(value)
                        ? styles.requirementIconMet
                        : styles.requirementIconUnmet,
                    )}
                    size="sm"
                  />
                  <span
                    className={classNames(
                      styles.requirementText,
                      /[a-z]/.test(value) && styles.requirementTextMet,
                    )}
                  >
                    {requirementsLabels.lowercase}
                  </span>
                </div>
              )}
              {requirementsLabels.uppercase && (
                <div className={styles.requirement}>
                  <CheckIcon
                    className={classNames(
                      styles.requirementIcon,
                      /[A-Z]/.test(value)
                        ? styles.requirementIconMet
                        : styles.requirementIconUnmet,
                    )}
                    size="sm"
                  />
                  <span
                    className={classNames(
                      styles.requirementText,
                      /[A-Z]/.test(value) && styles.requirementTextMet,
                    )}
                  >
                    {requirementsLabels.uppercase}
                  </span>
                </div>
              )}
              {requirementsLabels.number && (
                <div className={styles.requirement}>
                  <CheckIcon
                    className={classNames(
                      styles.requirementIcon,
                      /\d/.test(value)
                        ? styles.requirementIconMet
                        : styles.requirementIconUnmet,
                    )}
                    size="sm"
                  />
                  <span
                    className={classNames(
                      styles.requirementText,
                      /\d/.test(value) && styles.requirementTextMet,
                    )}
                  >
                    {requirementsLabels.number}
                  </span>
                </div>
              )}
              {requirementsLabels.special && (
                <div className={styles.requirement}>
                  <CheckIcon
                    className={classNames(
                      styles.requirementIcon,
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
                        ? styles.requirementIconMet
                        : styles.requirementIconUnmet,
                    )}
                    size="sm"
                  />
                  <span
                    className={classNames(
                      styles.requirementText,
                      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) &&
                        styles.requirementTextMet,
                    )}
                  >
                    {requirementsLabels.special}
                  </span>
                </div>
              )}
              {requirementsLabels.minLength && (
                <div className={styles.requirement}>
                  <CheckIcon
                    className={classNames(
                      styles.requirementIcon,
                      value.length >= 8
                        ? styles.requirementIconMet
                        : styles.requirementIconUnmet,
                    )}
                    size="sm"
                  />
                  <span
                    className={classNames(
                      styles.requirementText,
                      value.length >= 8 && styles.requirementTextMet,
                    )}
                  >
                    {requirementsLabels.minLength}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {(error || (isEmailInvalid && emailInvalidMessage)) && (
        <div className={styles.error}>
          <ErrorIcon className={styles.errorIcon} size="sm" />
          <p className={styles.errorText}>{error || emailInvalidMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
