import React from "react";
import Button from "@rubenpazch/button";
import IconButton from "@rubenpazch/icon-button";
import InfoRow from "@rubenpazch/info-row";
import styles from "./PatientDetails.module.css";
import {
  ChevronIcon,
  ClockIcon,
  CloseIcon,
  DocumentIcon,
  EmailIcon,
  LocationIcon,
  PatientIcon,
  PhoneIcon,
} from "@rubenpazch/icons";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export type PatientDetailsLabels = {
  patientId: string;
  patientGroup: string;
  sequenceLabel: string;
  activeStatus: string;
  inactiveStatus: string;
  contactInformation: string;
  additionalInformation: string;
  email: string;
  phone: string;
  address: string;
  dni: string;
  clinicalHistoryNumber: string;
  patientSince: string;
  moreInformation: string;
  emergencyContact: string;
  emergencyContactName: string;
  emergencyPhone: string;
  locationDetails: string;
  department: string;
  province: string;
  district: string;
  notes: string;
  accountInformation: string;
  createdAt: string;
  updatedAt: string;
  editButton: string;
  viewProfileButton: string;
  viewSubscriptionsButton: string;
};

export type PatientDetailsPatient = {
  id: string | number;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  dni?: string | null;
  clinical_history_number?: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  patient_group?: { name: string } | null;
  group_sequential_number?: string | number | null;
  emergency_contact?: string | null;
  emergency_phone?: string | null;
  notes?: string | null;
};

export type PatientDetailsUbigeo = {
  department?: string | null;
  province?: string | null;
  district?: string | null;
};

interface PatientDetailsProps {
  patient: PatientDetailsPatient;
  onClose: () => void;
  labels: PatientDetailsLabels;
  ubigeoResolved?: PatientDetailsUbigeo;
  showViewProfileButton?: boolean;
  showEditButton?: boolean;
  defaultShowMoreInfo?: boolean;
  onViewSubscriptions?: () => void;
  onViewProfile?: () => void;
  onEdit?: () => void;
  formatDate: (dateIso: string) => string;
  formatDateTime: (dateIso: string) => string;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({
  patient,
  onClose,
  labels,
  ubigeoResolved,
  showViewProfileButton = true,
  showEditButton = false,
  defaultShowMoreInfo = false,
  onViewSubscriptions,
  onViewProfile,
  onEdit,
  formatDate,
  formatDateTime,
}) => {
  const [showMoreInfo, setShowMoreInfo] = React.useState(defaultShowMoreInfo);

  const resolvedUbigeo = ubigeoResolved ?? {};

  const handleViewSubscriptions = () => {
    onViewSubscriptions?.();
  };

  const handleViewProfile = () => {
    onViewProfile?.();
  };

  const handleEdit = () => {
    onEdit?.();
  };

  const toggleMoreInfo = () => {
    setShowMoreInfo(!showMoreInfo);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerRow}>
          <div className={styles.headerInfo}>
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>
                {patient.first_name.charAt(0)}
                {patient.last_name.charAt(0)}
              </span>
            </div>
            <div>
              <h2 className={styles.name}>
                {patient.first_name} {patient.last_name}
              </h2>
              <p className={styles.subtitle}>
                {labels.patientId}: {patient.id}
              </p>
              {patient.patient_group && (
                <div className={styles.groupRow}>
                  <span className={styles.groupLabel}>
                    {labels.patientGroup}:
                  </span>{" "}
                  <span className={styles.groupBadges}>
                    <span className={styles.groupBadge}>
                      {patient.patient_group.name}
                    </span>
                    {patient.group_sequential_number && (
                      <span className={styles.groupSequence}>
                        {labels.sequenceLabel}
                      </span>
                    )}
                    {patient.group_sequential_number && (
                      <span className={styles.groupSequenceBadge}>
                        #{patient.group_sequential_number}
                      </span>
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
          <IconButton
            onClick={onClose}
            icon={<CloseIcon size="md" />}
            variant="default"
            size="medium"
            className={styles.closeButton}
          />
        </div>
        <div className={styles.statusRow}>
          <span
            className={classNames(
              styles.statusBadge,
              patient.active ? styles.statusActive : styles.statusInactive,
            )}
          >
            {patient.active ? labels.activeStatus : labels.inactiveStatus}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.sections}>
          {/* Contact Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{labels.contactInformation}</h3>
            <div className={styles.infoList}>
              {patient.email && (
                <InfoRow
                  icon={<EmailIcon size="md" />}
                  label={labels.email}
                  value={patient.email}
                />
              )}
              {patient.phone && (
                <InfoRow
                  icon={<PhoneIcon size="md" />}
                  label={labels.phone}
                  value={patient.phone}
                />
              )}
              {patient.address && (
                <InfoRow
                  icon={<LocationIcon size="md" />}
                  label={labels.address}
                  value={patient.address}
                />
              )}
            </div>
          </div>

          {/* Personal Information */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              {labels.additionalInformation}
            </h3>
            <div className={styles.infoList}>
              {patient.dni && (
                <InfoRow
                  icon={<PatientIcon size="md" />}
                  label={labels.dni}
                  value={patient.dni}
                />
              )}
              {patient.clinical_history_number && (
                <InfoRow
                  icon={<DocumentIcon size="md" />}
                  label={labels.clinicalHistoryNumber}
                  value={patient.clinical_history_number}
                />
              )}

              <InfoRow
                icon={<ClockIcon size="md" />}
                label={labels.patientSince}
                value={formatDate(patient.created_at)}
              />
            </div>
          </div>
        </div>

        {/* More Information Toggle */}
        <div className={styles.moreSection}>
          <button onClick={toggleMoreInfo} className={styles.toggleButton}>
            <span className={styles.toggleText}>{labels.moreInformation}</span>
            <ChevronIcon
              size="md"
              direction={showMoreInfo ? "up" : "down"}
              className={styles.toggleIcon}
            />
          </button>

          {/* Collapsible More Information Section */}
          {showMoreInfo && (
            <div className={styles.moreContent}>
              {/* Emergency Contact */}
              {(patient.emergency_contact || patient.emergency_phone) && (
                <div>
                  <h4 className={styles.moreTitle}>
                    {labels.emergencyContact}
                  </h4>
                  <div className={styles.infoList}>
                    {patient.emergency_contact && (
                      <InfoRow
                        icon={<PatientIcon size="md" />}
                        label={labels.emergencyContactName}
                        value={patient.emergency_contact}
                      />
                    )}
                    {patient.emergency_phone && (
                      <InfoRow
                        icon={<PhoneIcon size="md" />}
                        label={labels.emergencyPhone}
                        value={patient.emergency_phone}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Location Details */}
              {(resolvedUbigeo.department ||
                resolvedUbigeo.province ||
                resolvedUbigeo.district) && (
                <div>
                  <h4 className={styles.moreTitle}>{labels.locationDetails}</h4>
                  <div className={styles.infoList}>
                    {resolvedUbigeo.department && (
                      <InfoRow
                        icon={<LocationIcon size="md" />}
                        label={labels.department}
                        value={resolvedUbigeo.department}
                      />
                    )}
                    {resolvedUbigeo.province && (
                      <InfoRow
                        icon={<LocationIcon size="md" />}
                        label={labels.province}
                        value={resolvedUbigeo.province}
                      />
                    )}
                    {resolvedUbigeo.district && (
                      <InfoRow
                        icon={<LocationIcon size="md" />}
                        label={labels.district}
                        value={resolvedUbigeo.district}
                      />
                    )}
                  </div>
                </div>
              )}

              {/* Notes */}
              {patient.notes && (
                <div>
                  <h4 className={styles.moreTitle}>{labels.notes}</h4>
                  <p className={styles.notes}>{patient.notes}</p>
                </div>
              )}

              {/* Account Information */}
              <div>
                <h4 className={styles.moreTitle}>
                  {labels.accountInformation}
                </h4>
                <div className={styles.infoList}>
                  <InfoRow
                    icon={<ClockIcon size="md" />}
                    label={labels.createdAt}
                    value={formatDateTime(patient.created_at)}
                  />
                  <InfoRow
                    icon={<ClockIcon size="md" />}
                    label={labels.updatedAt}
                    value={formatDateTime(patient.updated_at)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.actionButtons}>
            {showEditButton && (
              <Button
                onClick={handleEdit}
                variant="contained"
                color="primary"
                size="medium"
                className={styles.actionButton}
              >
                {labels.editButton}
              </Button>
            )}
            {showViewProfileButton && (
              <Button
                onClick={handleViewProfile}
                variant="contained"
                color="primary"
                size="medium"
                className={styles.actionButton}
              >
                {labels.viewProfileButton}
              </Button>
            )}
            <Button
              onClick={handleViewSubscriptions}
              variant="contained"
              color="success"
              size="medium"
              className={styles.actionButton}
            >
              {labels.viewSubscriptionsButton}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
