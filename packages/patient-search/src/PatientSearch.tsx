import React, { useState, useEffect, useRef } from "react";
import { SpinnerIcon, PlusIcon, UserSelectIcon } from "@rubenpazch/icons";
import styles from "./PatientSearch.module.css";

const classNames = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ");

export type SearchSize = "sm" | "md" | "lg";

export type PatientSearchPatient = {
  id: string | number;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  dni?: string | null;
  active: boolean;
};

export type PatientSearchLabels = {
  searchPlaceholder: string;
  resultsTitle: string;
  activeStatus: string;
  inactiveStatus: string;
  noResultsTitle: string;
  noResultsHint: string;
  createNewPatient: string;
  withSearchTerm: string;
  dniLabel: string;
};

interface PatientSearchProps {
  onSelectPatient: (patient: PatientSearchPatient) => void;
  onSearchPatients?: (
    searchTerm: string,
  ) => Promise<{ patients?: PatientSearchPatient[] } | PatientSearchPatient[]>;
  onCreateNewPatient?: (searchTerm: string) => void;
  labels: PatientSearchLabels;
  size?: SearchSize;
  initialSearchTerm?: string;
}

const PatientSearch: React.FC<PatientSearchProps> = ({
  onSelectPatient,
  onSearchPatients,
  onCreateNewPatient,
  labels,
  size = "md",
  initialSearchTerm = "",
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [results, setResults] = useState<PatientSearchPatient[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search patients
  useEffect(() => {
    const searchPatients = async () => {
      if (searchTerm.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      setIsOpen(true);

      try {
        if (!onSearchPatients) {
          setResults([]);
          return;
        }

        const response = await onSearchPatients(searchTerm);
        const patients = Array.isArray(response)
          ? response
          : response?.patients;
        setResults(patients ?? []);
      } catch (error) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPatients, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > -1 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex === -1 || highlightedIndex === results.length) {
          // Create new patient
          onCreateNewPatient?.(searchTerm);
        } else if (highlightedIndex >= 0 && highlightedIndex < results.length) {
          // Select highlighted patient
          onSelectPatient(results[highlightedIndex]);
          setIsOpen(false);
          setSearchTerm("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  const handleSelectPatient = (patient: PatientSearchPatient) => {
    onSelectPatient(patient);
    setIsOpen(false);
    setSearchTerm("");
    setHighlightedIndex(-1);
  };

  const handleCreateNew = () => {
    onCreateNewPatient?.(searchTerm);
  };

  const highlightMatch = (text: string, search: string) => {
    if (!search.trim()) return text;

    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div
      ref={searchRef}
      className={classNames(
        styles.root,
        styles[`size${size.toUpperCase()}` as const],
      )}
    >
      <div className={styles.inputWrapper}>
        <div className={styles.iconWrapper}>
          <svg
            className={classNames(
              styles.icon,
              styles[`icon${size.toUpperCase()}` as const],
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
          placeholder={labels.searchPlaceholder}
          className={classNames(
            styles.input,
            styles[`input${size.toUpperCase()}` as const],
          )}
        />
        {loading && (
          <div className={styles.spinnerWrapper}>
            <SpinnerIcon size="md" className={styles.spinner} />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && searchTerm.length >= 2 && (
        <div className={styles.dropdown}>
          {results.length > 0 ? (
            <>
              <div className={styles.resultsHeader}>
                {labels.resultsTitle}: {results.length}{" "}
                {results.length === 1 ? "" : "s"}
              </div>
              {results.map((patient, index) => (
                <button
                  key={patient.id}
                  onClick={() => handleSelectPatient(patient)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={classNames(
                    styles.resultButton,
                    highlightedIndex === index &&
                      styles.resultButtonHighlighted,
                  )}
                >
                  <div className={styles.resultContent}>
                    <div className={styles.avatar}>
                      <span className={styles.avatarText}>
                        {patient.first_name.charAt(0)}
                        {patient.last_name.charAt(0)}
                      </span>
                    </div>
                    <div className={styles.resultDetails}>
                      <p className={styles.patientName}>
                        {highlightMatch(
                          `${patient.first_name} ${patient.last_name}`,
                          searchTerm,
                        )}
                      </p>
                      <p className={styles.patientEmail}>
                        {patient.email &&
                          highlightMatch(patient.email, searchTerm)}
                      </p>
                      {patient.dni && (
                        <p className={styles.patientDni}>
                          {labels.dniLabel}:{" "}
                          {highlightMatch(patient.dni, searchTerm)}
                        </p>
                      )}
                    </div>
                    <div>
                      <span
                        className={classNames(
                          styles.statusBadge,
                          patient.active
                            ? styles.statusActive
                            : styles.statusInactive,
                        )}
                      >
                        {patient.active
                          ? labels.activeStatus
                          : labels.inactiveStatus}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </>
          ) : !loading ? (
            <div className={styles.noResults}>
              <UserSelectIcon size="lg" className={styles.noResultsIcon} />
              <p className={styles.noResultsTitle}>{labels.noResultsTitle}</p>
              <p className={styles.noResultsHint}>{labels.noResultsHint}</p>
            </div>
          ) : null}

          {/* Create new patient option */}
          <button
            onClick={handleCreateNew}
            onMouseEnter={() => setHighlightedIndex(results.length)}
            className={classNames(
              styles.createButton,
              highlightedIndex === results.length &&
                styles.createButtonHighlighted,
            )}
          >
            <div className={styles.createContent}>
              <div className={styles.createIconWrapper}>
                <PlusIcon size="md" className={styles.createIcon} />
              </div>
              <div>
                <p className={styles.createTitle}>{labels.createNewPatient}</p>
                {searchTerm && (
                  <p className={styles.createSubtitle}>
                    {labels.withSearchTerm}: "{searchTerm}"
                  </p>
                )}
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientSearch;
