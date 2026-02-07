import React from "react";
import PrescriptionFieldCard from "./PrescriptionFieldCard";
import CheckboxInput from "@rubenpazch/checkbox-input";
import styles from "./PrescriptionEyeCard.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export interface PrescriptionEyeInfo {
  sphere?: number | string;
  cylinder?: number | string;
  axis?: number | string;
  add?: number | string;
  intermediate_add?: number | string;
  prism?: number | string;
  prism_base?: string;
  dnp?: number | string;
  height?: number | string;
  notes?: string;
  rx?: boolean;
  neutro?: boolean;
  balance?: boolean;
  compensado?: boolean;
}

export type PrescriptionEyeCardLabels = {
  eyeOD: string;
  eyeOI: string;
  rx: string;
  neutro: string;
  balance: string;
  compensado: string;
  sphere: string;
  cylinder: string;
  axis: string;
  dnp: string;
  add: string;
  intermediateAdd: string;
  prism: string;
  prismBase: string;
  height: string;
  notes: string;
  prismBaseFallback: string;
  axisUnit: string;
  millimetersUnit: string;
  prismUnit: string;
};

export interface PrescriptionEyeCardProps {
  eye: "OD" | "OI";
  eyeInfo: PrescriptionEyeInfo;
  prismBaseLookup: {
    getNameByKey: (key: string) => string;
  };
  labels: PrescriptionEyeCardLabels;
}

export const PrescriptionEyeCard: React.FC<PrescriptionEyeCardProps> = ({
  eye,
  eyeInfo,
  prismBaseLookup,
  labels,
}) => {
  const eyeLabel = eye === "OD" ? labels.eyeOD : labels.eyeOI;

  return (
    <div className={styles.card} data-testid="prescription-eye-card">
      <h3 className={styles.title}>
        <span className={styles.eyeBadge}>{eye}</span>
        {eyeLabel}
      </h3>

      {/* Eye Type Indicators */}
      <div className={styles.flags}>
        {eyeInfo.rx && (
          <div className={styles.flagItem}>
            <CheckboxInput
              label={labels.rx}
              checked={true}
              disabled={true}
              size="sm"
              variant="primary"
            />
          </div>
        )}
        {eyeInfo.neutro && (
          <div className={styles.flagItem}>
            <CheckboxInput
              label={labels.neutro}
              checked={true}
              disabled={true}
              size="sm"
              variant="primary"
            />
          </div>
        )}
        {eyeInfo.balance && (
          <div className={styles.flagItem}>
            <CheckboxInput
              label={labels.balance}
              checked={true}
              disabled={true}
              size="sm"
              variant="primary"
            />
          </div>
        )}
        {eyeInfo.compensado && (
          <div className={styles.flagItem}>
            <CheckboxInput
              label={labels.compensado}
              checked={true}
              disabled={true}
              size="sm"
              variant="primary"
            />
          </div>
        )}
      </div>

      {/* Main prescription fields - 3 columns */}
      <div
        className={classNames(styles.grid, styles.gridThree, styles.section)}
      >
        <PrescriptionFieldCard
          label={labels.sphere}
          value={eyeInfo.sphere || 0}
          formatValue={(value) => {
            const num = parseFloat(value.toString());
            return num >= 0 ? `+${value}` : `${value}`;
          }}
        />

        <PrescriptionFieldCard
          label={labels.cylinder}
          value={eyeInfo.cylinder || 0}
          formatValue={(value) => {
            const num = parseFloat(value.toString());
            return num >= 0 ? `+${value}` : `${value}`;
          }}
        />

        <PrescriptionFieldCard
          label={labels.axis}
          value={eyeInfo.axis || "0"}
          unit={labels.axisUnit}
        />
      </div>

      {/* DNP and ADD fields - 3 columns */}
      <div
        className={classNames(styles.grid, styles.gridThree, styles.section)}
      >
        <PrescriptionFieldCard
          label={labels.dnp}
          value={eyeInfo.dnp || "0"}
          variant="highlighted"
          required={true}
          unit={labels.millimetersUnit}
        />

        <PrescriptionFieldCard
          label={labels.add}
          value={eyeInfo.add || "0.00"}
          formatValue={(value) => `+${value}`}
        />

        <PrescriptionFieldCard
          label={labels.intermediateAdd}
          value={eyeInfo.intermediate_add || "0.00"}
        />
      </div>

      {/* Prism, Prism Base, and Height - 3 columns */}
      <div className={classNames(styles.grid, styles.gridThree)}>
        <PrescriptionFieldCard
          label={labels.prism}
          value={eyeInfo.prism || "0"}
          unit={labels.prismUnit}
        />

        <PrescriptionFieldCard
          label={labels.prismBase}
          value={
            eyeInfo.prism_base
              ? (() => {
                  const name = prismBaseLookup.getNameByKey(eyeInfo.prism_base);
                  return name && name !== eyeInfo.prism_base
                    ? name
                    : eyeInfo.prism_base;
                })()
              : labels.prismBaseFallback
          }
        />

        <PrescriptionFieldCard
          label={labels.height}
          value={eyeInfo.height || "0"}
          unit={labels.millimetersUnit}
        />
      </div>

      {eyeInfo.notes && (
        <div className={styles.notes}>
          <p className={styles.notesLabel}>{labels.notes}</p>
          <p className={styles.notesText}>{eyeInfo.notes}</p>
        </div>
      )}
    </div>
  );
};

export default PrescriptionEyeCard;
