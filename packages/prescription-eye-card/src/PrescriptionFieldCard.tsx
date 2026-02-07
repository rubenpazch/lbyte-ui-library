import React from "react";
import styles from "./PrescriptionFieldCard.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export interface PrescriptionFieldCardProps {
  label: string;
  value: string | number;
  range?: string;
  variant?: "default" | "highlighted" | "success" | "warning";
  required?: boolean;
  unit?: string;
  className?: string;
  formatValue?: (value: string | number) => string;
}

export const PrescriptionFieldCard: React.FC<PrescriptionFieldCardProps> = ({
  label,
  value,
  range,
  variant = "default",
  required = false,
  unit = "",
  className,
  formatValue,
}) => {
  const variantClasses = {
    default: {
      container: styles.variantDefault,
      label: styles.labelDefault,
      value: styles.valueDefault,
      range: styles.rangeDefault,
    },
    highlighted: {
      container: styles.variantHighlighted,
      label: styles.labelHighlighted,
      value: styles.valueHighlighted,
      range: styles.rangeHighlighted,
    },
    success: {
      container: styles.variantSuccess,
      label: styles.labelSuccess,
      value: styles.valueSuccess,
      range: styles.rangeSuccess,
    },
    warning: {
      container: styles.variantWarning,
      label: styles.labelWarning,
      value: styles.valueWarning,
      range: styles.rangeWarning,
    },
  };

  const variantClassSet = variantClasses[variant];
  const displayValue = formatValue ? formatValue(value) : value;

  return (
    <div
      className={classNames(styles.card, variantClassSet.container, className)}
      data-testid="prescription-field-card"
    >
      <p
        className={classNames(
          styles.label,
          styles.labelText,
          variantClassSet.label,
        )}
      >
        {label}
        {required && <span className={styles.required}>*</span>}
      </p>
      <p
        className={classNames(
          styles.value,
          styles.valueText,
          variantClassSet.value,
        )}
      >
        {displayValue}
        {unit && ` ${unit}`}
      </p>
      {range && (
        <p
          className={classNames(
            styles.range,
            styles.rangeText,
            variantClassSet.range,
          )}
        >
          {range}
        </p>
      )}
    </div>
  );
};

export default PrescriptionFieldCard;
