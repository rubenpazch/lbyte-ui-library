import React from "react";
import IconButton from "@rubenpazch/icon-button";
import Chip, { ChipColor, ChipVariant } from "@rubenpazch/chip";
import {
  EyeIcon,
  EditIcon,
  ArrowDetailsIcon,
  PrintIcon,
  CheckIcon,
  ZoomInIcon,
  ZoomOutIcon,
  LinkIcon,
} from "@rubenpazch/icons";
import styles from "./PrescriptionCard.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export interface PrescriptionEye {
  eye_type: string;
  sphere?: number;
  cylinder?: number;
  axis?: number;
  add?: number;
  dnp?: number;
  intermediate_add?: number;
  npd?: number;
  height?: number;
  prism?: number;
  prism_base?: string;
  notes?: string;
  rx?: boolean;
  neutro?: boolean;
  balance?: boolean;
  compensado?: boolean;
}

export interface Prescription {
  id: number;
  exam_date: string;
  order_number: string;
  system_identifier?: string;
  manual_identifier?: string;
  status: string;
  total_cost: number;
  deposit_paid: number;
  balance_due: number;
  expected_delivery_date: string;
  created_at: string;
  observations?: string;
  prescription_eyes?: PrescriptionEye[];
  vision_type?: "distance" | "near" | "both" | "distance_only" | "near_only";
  prescription_group_id?: string;
  user?: {
    id: number;
    email: string;
  };
}

export type PrescriptionCardLabels = {
  systemIdentifier: string;
  manualIdentifier: string;
  examDate: string;
  created: string;
  createdBy: string;
  rightEye: string;
  leftEye: string;
  sphere: string;
  cylinder: string;
  axis: string;
  add: string;
  intermediateAdd: string;
  dnp: string;
  height: string;
  prism: string;
  prismBase: string;
  noData: string;
  noOpticalInfo: string;
  observations: string;
  orderNote: string;
  workOrder: string;
  clinicalHistory: string;
  edit: string;
  view: string;
  viewDetails: string;
  paired: string;
  bothVision: string;
  farVision: string;
  nearVision: string;
  rx: string;
  neutro: string;
  balance: string;
  compensado: string;
  emptyValue: string;
  millimetersSuffix: string;
  prismSuffix: string;
  axisSuffix: string;
};

export type PrescriptionCardStatusLabels = Record<string, string>;

interface PrescriptionCardProps {
  prescription: Prescription;
  patientId: string | number;
  patientName?: string;
  canEdit?: boolean;
  onEdit?: () => void;
  onView?: () => void;
  onViewDetails?: () => void;
  onPrintFormat?: () => void;
  onOrderFormat?: () => void;
  onWorkOrder?: () => void;
  labels: PrescriptionCardLabels;
  statusLabels?: PrescriptionCardStatusLabels;
  formatDateLong: (dateIso: string) => string;
  statusColors?: {
    color: string;
    badgeColor: string;
  };
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  patientId,
  patientName = "",
  canEdit = false,
  onEdit,
  onView,
  onViewDetails,
  onPrintFormat,
  onOrderFormat,
  onWorkOrder,
  labels,
  statusLabels,
  formatDateLong,
  statusColors,
}) => {
  void patientName;
  // Format value helper - now always shows the value, defaulting to 0 if missing
  const formatValue = (value: any, decimals: number = 2): string => {
    if (value === null || value === undefined || value === "") {
      return "0";
    }
    const num = Number(value);
    if (isNaN(num)) return "0";
    return num > 0 ? `+${num.toFixed(decimals)}` : num.toFixed(decimals);
  };

  // Default status colors for card background
  const defaultStatusClasses: Record<string, string> = {
    pending: styles.statusPending,
    in_progress: styles.statusInProgress,
    optical_information_complete: styles.statusOpticalInformationComplete,
    elaboration_in_progress: styles.statusElaborationInProgress,
    delivery_pending: styles.statusDeliveryPending,
    completed: styles.statusCompleted,
    delivered: styles.statusDelivered,
    cancelled: styles.statusCancelled,
    archived: styles.statusArchived,
  };

  const statusChipColors: Record<string, ChipColor> = {
    pending: "warning",
    in_progress: "info",
    optical_information_complete: "info",
    elaboration_in_progress: "warning",
    delivery_pending: "warning",
    completed: "success",
    delivered: "success",
    cancelled: "error",
    archived: "default",
  };

  const statusChipVariants: Record<string, ChipVariant> = {
    pending: "soft",
    in_progress: "soft",
    optical_information_complete: "soft",
    elaboration_in_progress: "soft",
    delivery_pending: "soft",
    completed: "soft",
    delivered: "soft",
    cancelled: "soft",
    archived: "soft",
  };

  const cardColorClass =
    defaultStatusClasses[prescription.status] || defaultStatusClasses.pending;
  const statusChipColor = statusChipColors[prescription.status] || "warning";
  const statusChipVariant = statusChipVariants[prescription.status] || "soft";

  const isEditable = ["in_progress", "optical_information_complete"].includes(
    prescription.status,
  );

  const handleEdit = () => {
    onEdit?.();
  };

  const handleView = () => {
    onView?.();
  };

  const handleViewDetails = () => {
    onViewDetails?.();
  };

  const handlePrintFormat = () => {
    if (onPrintFormat) {
      onPrintFormat();
      return;
    }

    // Validate IDs before opening
    const prescriptionId = prescription?.id;

    if (!prescriptionId || !patientId) {
      return;
    }

    if (isNaN(Number(prescriptionId)) || isNaN(Number(patientId))) {
      return;
    }

    // Open the printable format in a new tab
    const url = `/prescriptions/print-format?patientId=${Number(patientId)}&prescriptionId=${Number(prescriptionId)}`;
    window.open(url, "_blank");
  };

  const handleOrderFormat = () => {
    if (onOrderFormat) {
      onOrderFormat();
      return;
    }

    // Validate prescription ID before opening
    const prescriptionId = prescription?.id;

    if (!prescriptionId) {
      return;
    }

    if (isNaN(Number(prescriptionId))) {
      return;
    }

    // Open the order format in a new tab
    const url = `/prescriptions/order-format?id=${Number(prescriptionId)}`;
    window.open(url, "_blank");
  };

  const handleWorkOrder = () => {
    if (onWorkOrder) {
      onWorkOrder();
      return;
    }

    // Validate prescription ID before opening
    const prescriptionId = prescription?.id;

    if (!prescriptionId) {
      return;
    }

    if (isNaN(Number(prescriptionId))) {
      return;
    }

    // Open the work order in a new tab
    const url = `/prescriptions/work-order?id=${Number(prescriptionId)}`;
    window.open(url, "_blank");
  };

  // Determine if prescription is paired
  const isPaired =
    prescription.vision_type &&
    prescription.vision_type !== "both" &&
    prescription.vision_type !== "distance_only" &&
    prescription.vision_type !== "near_only" &&
    prescription.prescription_group_id;

  // Get vision type display info
  const getVisionTypeInfo = () => {
    if (!prescription.vision_type || prescription.vision_type === "both") {
      return {
        icon: <LinkIcon size="sm" />,
        label: labels.bothVision,
        color: "info" as const,
      };
    }
    if (
      prescription.vision_type === "distance" ||
      prescription.vision_type === "distance_only"
    ) {
      return {
        icon: <ZoomOutIcon size="sm" />,
        label: labels.farVision,
        color: "primary" as const,
      };
    }
    if (prescription.vision_type === "near_only") {
      return {
        icon: <ZoomInIcon size="sm" />,
        label: labels.nearVision,
        color: "warning" as const,
      };
    }
    return {
      icon: <ZoomInIcon size="sm" />,
      label: labels.nearVision,
      color: "warning" as const,
    };
  };

  const visionTypeInfo = getVisionTypeInfo();

  const statusLabel =
    statusLabels?.[prescription.status] || prescription.status;
  const formatDate = (value: string) =>
    value ? formatDateLong(value) : labels.emptyValue;

  return (
    <div
      className={classNames(styles.card, cardColorClass, statusColors?.color)}
    >
      {/* HEADER */}
      <div className={styles.header}>
        {/* SHOULD GO IN THE HEADER */}
        <div className={styles.headerRow}>
          <div className={styles.headerChips}>
            <Chip
              label={visionTypeInfo.label}
              variant="soft"
              color={visionTypeInfo.color}
              icon={visionTypeInfo.icon}
              size="sm"
            />
            {isPaired && (
              <Chip
                label={labels.paired}
                variant="soft"
                color="info"
                icon={<CheckIcon size="sm" />}
                size="sm"
              />
            )}
          </div>
          <Chip
            label={statusLabel}
            variant={statusChipVariant}
            color={statusChipColor}
            size="sm"
            className={statusColors?.badgeColor}
          />
        </div>
      </div>

      {/* BODY */}
      <div className={styles.body}>
        {/* SHOULD GO IN THE BODY */}
        <div className={styles.summarySection}>
          {/* System Identifier */}
          <div className={styles.summaryRow}>
            <p className={styles.summaryLabel}>{labels.systemIdentifier}</p>
            <p className={styles.summaryValue}>
              {prescription.system_identifier || `#${prescription.id}`}
            </p>
          </div>

          {/* SHOULD GO IN THE BODY */}
          {prescription.manual_identifier && (
            <div className={styles.summaryRow}>
              <p className={styles.summaryLabel}>{labels.manualIdentifier}</p>
              <p className={styles.summaryValue}>
                {prescription.manual_identifier}
              </p>
            </div>
          )}

          {/* SHOULD GO IN THE BODY */}
          <div className={styles.summaryFooterRow}>
            <p className={styles.summaryLabel}>{labels.examDate}</p>
            <p className={styles.summaryDate}>
              {formatDate(prescription.exam_date)}
            </p>
          </div>

          {/* SHOULD GO IN THE BODY */}
          <div className={styles.metaSection}>
            <div className={styles.metaRow}>
              <span className={styles.metaLabel}>{labels.created}</span>
              <span className={styles.metaValue}>
                {formatDate(prescription.created_at)}
              </span>
            </div>
            {prescription.user?.email && (
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>{labels.createdBy}</span>
                <span className={styles.metaValueMono}>
                  {prescription.user.email}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SHOULD GO IN THE BODY */}
        {prescription.prescription_eyes &&
        prescription.prescription_eyes.length > 0 ? (
          <div className={styles.eyesGrid}>
            {["OD", "OI"].map((eyeType) => {
              const allEyes = prescription.prescription_eyes || [];
              const eyeData = allEyes
                .filter((eye) => eye.eye_type === eyeType)
                .reverse()
                .find((eye) => {
                  return (
                    eye.sphere !== null ||
                    eye.cylinder !== null ||
                    eye.axis !== null ||
                    eye.add !== null ||
                    eye.intermediate_add !== null ||
                    eye.dnp !== null ||
                    eye.height !== null ||
                    eye.prism !== null ||
                    eye.prism_base !== null ||
                    eye.rx ||
                    eye.neutro ||
                    eye.balance ||
                    eye.compensado
                  );
                });

              const hasValue = (value: any) => {
                return value !== null && value !== undefined && value !== "";
              };

              const hasAnyOpticalData =
                eyeData &&
                (hasValue(eyeData.sphere) ||
                  hasValue(eyeData.cylinder) ||
                  hasValue(eyeData.axis) ||
                  hasValue(eyeData.add) ||
                  hasValue(eyeData.intermediate_add) ||
                  hasValue(eyeData.dnp) ||
                  hasValue(eyeData.height) ||
                  hasValue(eyeData.prism) ||
                  hasValue(eyeData.prism_base) ||
                  eyeData.rx ||
                  eyeData.neutro ||
                  eyeData.balance ||
                  eyeData.compensado);

              const eyeLabel =
                eyeType === "OD" ? labels.rightEye : labels.leftEye;

              if (!hasAnyOpticalData) {
                return (
                  <div key={eyeType} className={styles.eyeCard}>
                    <p className={styles.eyeTitle}>
                      {eyeLabel} ({eyeType})
                    </p>
                    <p className={styles.eyeEmpty}>{labels.noData}</p>
                  </div>
                );
              }

              return (
                <div key={eyeType} className={styles.eyeCard}>
                  <p className={styles.eyeTitle}>
                    {eyeLabel} ({eyeType})
                  </p>
                  <div className={styles.eyeValues}>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.sphere}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {formatValue(eyeData?.sphere, 2)}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.cylinder}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {formatValue(eyeData?.cylinder, 2)}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.axis}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {eyeData?.axis
                          ? `${eyeData.axis}${labels.axisSuffix}`
                          : `0${labels.axisSuffix}`}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.add}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {formatValue(eyeData?.add, 2)}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.intermediateAdd}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {formatValue(eyeData?.intermediate_add, 2)}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.dnp}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {eyeData?.dnp
                          ? `${eyeData.dnp} ${labels.millimetersSuffix}`
                          : `0 ${labels.millimetersSuffix}`}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.height}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {eyeData?.height
                          ? `${eyeData.height} ${labels.millimetersSuffix}`
                          : `0 ${labels.millimetersSuffix}`}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.prism}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {eyeData?.prism
                          ? `${eyeData.prism} ${labels.prismSuffix}`
                          : `0 ${labels.prismSuffix}`}
                      </span>
                    </div>
                    <div className={styles.eyeValueRow}>
                      <span className={styles.eyeValueLabel}>
                        {labels.prismBase}:
                      </span>
                      <span className={styles.eyeValueValue}>
                        {eyeData?.prism_base || labels.emptyValue}
                      </span>
                    </div>
                  </div>
                  {/* Checkboxes section */}
                  {(eyeData?.rx ||
                    eyeData?.neutro ||
                    eyeData?.balance ||
                    eyeData?.compensado) && (
                    <div className={styles.eyeFlags}>
                      <div className={styles.eyeFlagList}>
                        {eyeData?.rx && (
                          <span className={styles.eyeFlag}>
                            <CheckIcon size="sm" />
                            <span className={styles.eyeFlagText}>
                              {labels.rx}
                            </span>
                          </span>
                        )}
                        {eyeData?.neutro && (
                          <span className={styles.eyeFlag}>
                            <CheckIcon size="sm" />
                            <span className={styles.eyeFlagText}>
                              {labels.neutro}
                            </span>
                          </span>
                        )}
                        {eyeData?.balance && (
                          <span className={styles.eyeFlag}>
                            <CheckIcon size="sm" />
                            <span className={styles.eyeFlagText}>
                              {labels.balance}
                            </span>
                          </span>
                        )}
                        {eyeData?.compensado && (
                          <span className={styles.eyeFlag}>
                            <CheckIcon size="sm" />
                            <span className={styles.eyeFlagText}>
                              {labels.compensado}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noOpticalInfo}>
            <p className={styles.noOpticalInfoText}>{labels.noOpticalInfo}</p>
          </div>
        )}

        {/* SHOULD GO IN THE BODY */}
        {prescription.observations && (
          <div className={styles.observations}>
            <p className={styles.observationsLabel}>{labels.observations}</p>
            <p className={styles.observationsText}>
              {prescription.observations}
            </p>
          </div>
        )}

        {/* SHOULD GO IN THE BODY */}
        <div className={styles.printSection}>
          {/* Print Actions Row */}
          <div className={styles.printRow}>
            {prescription.status !== "in_progress" && (
              <>
                <IconButton
                  onClick={handleOrderFormat}
                  variant="blue"
                  size="small"
                  icon={<PrintIcon size="sm" />}
                  label={labels.orderNote}
                  labelPosition="end"
                />
                <IconButton
                  onClick={handleWorkOrder}
                  variant="secondary"
                  size="small"
                  icon={<PrintIcon size="sm" />}
                  label={labels.workOrder}
                  labelPosition="end"
                />
              </>
            )}
            <IconButton
              onClick={handlePrintFormat}
              variant="secondary"
              size="small"
              icon={<PrintIcon size="sm" />}
              label={labels.clinicalHistory}
              labelPosition="end"
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        {/* SHOULD GO IN THE FOOTER */}
        <div className={styles.footerActions}>
          {isEditable ? (
            <>
              <IconButton
                onClick={handleEdit}
                disabled={!canEdit}
                variant="blue"
                filled
                size="small"
                icon={<EditIcon size="sm" />}
              >
                {labels.edit}
              </IconButton>
              <IconButton
                onClick={handleView}
                variant="black"
                size="small"
                icon={<EyeIcon size="sm" />}
              >
                {labels.view}
              </IconButton>
            </>
          ) : (
            <IconButton
              onClick={handleViewDetails}
              variant="blue"
              filled
              size="small"
              icon={<ArrowDetailsIcon size="sm" />}
            >
              {labels.viewDetails}
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionCard;
