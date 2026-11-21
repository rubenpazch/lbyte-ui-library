import * as React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronIcon, CheckIcon, CloseIcon } from "@rubenpazch/icons";
import LoadingSpinner from "@rubenpazch/loading-spinner";
import { mergeRefs, useFieldIds } from "@rubenpazch/shared";
import styles from "./Autocomplete.module.css";

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

export interface AutocompleteOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  metadata?: Record<string, any>;
}

export interface AutocompleteProps {
  /** id del input; si no se pasa se genera uno. */
  id?: string;
  /** name del input. */
  name?: string;
  /** Textos accesibles de los botones. */
  labels?: Partial<{ clear: string; open: string; close: string }>;
  label?: string;
  value: string | number | null;
  onChange: (
    value: string | number | null,
    option?: AutocompleteOption,
  ) => void;
  options: AutocompleteOption[];
  placeholder?: string;
  error?: string;
  warning?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  icon?: React.ReactNode;
  className?: string;
  maxHeight?: string;
  onCreate?: (searchTerm: string) => void;
  onSearch?: (searchTerm: string) => void;
  readOnly?: boolean;
  renderOption?: (
    option: AutocompleteOption,
    isSelected: boolean,
  ) => React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  createLabel?: string;
  noResultsText?: string;
  loadingText?: string;
  highlightMatch?: boolean;
  minSearchLength?: number;
  debounceMs?: number;
  keepListOpen?: boolean;
  position?: "bottom" | "top";
  /**
   * Contenido junto a la etiqueta, a la derecha: un botón de ayuda ("?"), un enlace…
   * No va dentro del `<label>`.
   */
  labelAction?: React.ReactNode;
}
// Helper function to highlight matching text
const highlightMatchText = (
  text: string,
  search: string,
  shouldHighlight: boolean = true,
) => {
  if (!shouldHighlight || !search || !text) return text;

  const regex = new RegExp(
    `(${search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi",
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className={styles.highlight}>
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};
/** Selector con búsqueda (combobox accesible): filtra mientras se escribe, teclado completo. */
const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  function Autocomplete(
    {
      id,
      name,
      labels,
      label,
      labelAction,
      value,
      onChange,
      options = [],
      placeholder = "Buscar o seleccionar…",
      error,
      warning,
      hint,
      required = false,
      disabled = false,
      loading = false,
      searchable = true,
      clearable = true,
      icon,
      className = "",
      maxHeight = "300px",
      onCreate,
      onSearch,
      readOnly = false,
      renderOption,
      onBlur,
      onFocus,
      createLabel = "Crear",
      noResultsText = "Sin resultados",
      loadingText = "Cargando…",
      highlightMatch = true,
      minSearchLength = 0,
      debounceMs = 300,
      keepListOpen = false,
      position = "bottom",
    },
    forwardedRef,
  ) {
    const text = {
      clear: "Quitar selección",
      open: "Abrir lista",
      close: "Cerrar lista",
      ...labels,
    };
    const field = useFieldIds({
      id,
      name,
      required,
      error,
      warning: !error ? warning : undefined,
      hint: hint && !error && !warning ? hint : undefined,
    });
    const listboxId = `${field.inputId}-opciones`;
    const optionId = (i: number) => `${field.inputId}-opcion-${i}`;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Get selected option
    const selectedOption = options.find((opt) => opt.value === value);

    // Filter options based on search
    const filteredOptions = useMemo(() => {
      // When using external search (onSearch provided), don't filter locally
      // The parent component is responsible for filtering via onSearch callback
      if (onSearch) return options;

      if (!searchable || searchTerm.length < minSearchLength) return options;

      const lowerSearch = searchTerm.toLowerCase();
      return options.filter(
        (opt) =>
          opt.label.toLowerCase().includes(lowerSearch) ||
          opt.description?.toLowerCase().includes(lowerSearch),
      );
    }, [options, searchTerm, searchable, minSearchLength, onSearch]);

    // Display value in input
    const displayValue = useMemo(() => {
      if (searchable && isOpen) return searchTerm;
      return selectedOption?.label || "";
    }, [isOpen, searchable, searchTerm, selectedOption]);

    // Call onSearch with debounce
    useEffect(() => {
      if (!onSearch || searchTerm.length < minSearchLength) return;

      const timer = setTimeout(() => {
        onSearch(searchTerm);
      }, debounceMs);

      return () => clearTimeout(timer);
    }, [searchTerm, onSearch, debounceMs, minSearchLength]);

    // Close dropdown on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setIsFocused(false);
          if (!keepListOpen) {
            setSearchTerm("");
          }
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [keepListOpen]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (highlightedIndex >= 0 && optionRefs.current[highlightedIndex]) {
        optionRefs.current[highlightedIndex]?.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }, [highlightedIndex]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchTerm(newValue);

      if (!isOpen) {
        setIsOpen(true);
      }

      setHighlightedIndex(-1);
    };

    const handleInputFocus = () => {
      if (disabled || readOnly) return;
      setIsFocused(true);
      setIsOpen(true);
      onFocus?.();
    };

    const handleInputBlur = () => {
      // Delay to allow click on dropdown
      setTimeout(() => {
        if (!containerRef.current?.contains(document.activeElement)) {
          setIsFocused(false);
          if (!keepListOpen) {
            setSearchTerm("");
          }
          onBlur?.();
        }
      }, 200);
    };

    const handleSelect = (option: AutocompleteOption) => {
      if (option.disabled) return;

      onChange(option.value, option);
      setSearchTerm("");
      setHighlightedIndex(-1);
      if (!keepListOpen) {
        setIsOpen(false);
      }
      inputRef.current?.blur();
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(null);
      setSearchTerm("");
      setIsOpen(false);
      inputRef.current?.focus();
    };

    const handleToggle = () => {
      if (disabled || readOnly) return;

      const newIsOpen = !isOpen;
      setIsOpen(newIsOpen);

      if (newIsOpen) {
        inputRef.current?.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev,
            );
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          }
          break;

        case "Enter":
          e.preventDefault();
          if (
            isOpen &&
            highlightedIndex >= 0 &&
            filteredOptions[highlightedIndex]
          ) {
            handleSelect(filteredOptions[highlightedIndex]);
          } else if (isOpen && onCreate && searchTerm.trim()) {
            onCreate(searchTerm.trim());
            setIsOpen(false);
            setSearchTerm("");
          }
          break;

        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setSearchTerm("");
          inputRef.current?.blur();
          break;

        case "Tab":
          setIsOpen(false);
          setSearchTerm("");
          break;
      }
    };

    const getInputClassName = () => {
      return classNames(
        styles.input,
        icon ? styles.inputWithIcon : undefined,
        clearable && value ? styles.inputWithClear : styles.inputWithoutClear,
        readOnly ? styles.inputReadOnly : undefined,
        error ? styles.inputError : undefined,
        warning && !error ? styles.inputWarning : undefined,
        isFocused && !error && !warning ? styles.inputFocused : undefined,
      );
    };

    return (
      <div className={classNames(styles.container, className)}>
        {/* Label */}
        {label &&
          (() => {
            const labelEl = (
              <label htmlFor={field.inputId} className={styles.label}>
                {label}
                {required && (
                  <span className={styles.required} aria-hidden="true">
                    *
                  </span>
                )}
              </label>
            );
            return labelAction ? (
              <div className={styles.labelRow}>
                {labelEl}
                <span className={styles.labelAction}>{labelAction}</span>
              </div>
            ) : (
              labelEl
            );
          })()}

        {/* Input Container */}
        <div ref={containerRef} className={styles.inputWrapper}>
          {/* Left Icon */}
          {icon && <div className={styles.iconLeft}>{icon}</div>}

          {/* Input Field */}
          <input
            ref={mergeRefs(inputRef, forwardedRef)}
            {...field.controlProps}
            name={name}
            required={required}
            role="combobox"
            aria-expanded={isOpen && !disabled && !readOnly}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              isOpen &&
              highlightedIndex >= 0 &&
              highlightedIndex < filteredOptions.length
                ? optionId(highlightedIndex)
                : undefined
            }
            autoComplete="off"
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly || !searchable}
            className={getInputClassName()}
            data-testid="autocomplete-input"
            data-has-error={error ? "true" : "false"}
            data-has-warning={warning ? "true" : "false"}
            data-is-focused={isFocused ? "true" : "false"}
          />

          {/* Right Icons */}
          <div className={styles.rightIcons}>
            {loading && <LoadingSpinner size="sm" variant="dots" inline />}

            {clearable && value && !loading && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className={styles.clearButton}
                data-testid="autocomplete-clear"
                aria-label={text.clear}
              >
                <CloseIcon className={styles.clearIcon} />
              </button>
            )}

            <button
              type="button"
              onClick={handleToggle}
              className={styles.toggleButton}
              disabled={disabled}
              data-testid="autocomplete-toggle"
              aria-label={isOpen ? text.close : text.open}
              aria-expanded={isOpen}
              tabIndex={-1}
            >
              <ChevronIcon
                className={classNames(
                  styles.toggleIcon,
                  isOpen && styles.toggleIconOpen,
                )}
              />
            </button>
          </div>

          {/* Dropdown */}
          {isOpen && !disabled && !readOnly && (
            <div
              ref={dropdownRef}
              className={classNames(
                styles.dropdown,
                position === "top" && styles.dropdownTop,
              )}
              style={{ maxHeight }}
              data-testid="autocomplete-dropdown"
            >
              {/* Loading State */}
              {loading && filteredOptions.length === 0 && (
                <div className={styles.loadingState}>
                  <LoadingSpinner
                    size="sm"
                    variant="spinner"
                    className={styles.loadingSpinner}
                  />
                  <span className={styles.loadingText}>{loadingText}</span>
                </div>
              )}

              {/* Options List */}
              <div
                id={listboxId}
                role="listbox"
                aria-label={label}
                className={styles.dropdownContent}
              >
                {!loading && filteredOptions.length > 0 && (
                  <>
                    {filteredOptions.map((option, index) => {
                      const isSelected = option.value === value;
                      const isHighlighted = index === highlightedIndex;

                      return (
                        <div
                          key={option.value}
                          id={optionId(index)}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={option.disabled || undefined}
                          ref={(el) => {
                            optionRefs.current[index] = el;
                          }}
                          onClick={() => handleSelect(option)}
                          onMouseEnter={() => setHighlightedIndex(index)}
                          className={classNames(
                            styles.option,
                            option.disabled && styles.optionDisabled,
                            isHighlighted && styles.optionHighlighted,
                            isSelected && styles.optionSelected,
                          )}
                          data-testid={`autocomplete-option-${option.value}`}
                          data-disabled={option.disabled ? "true" : "false"}
                          data-selected={isSelected ? "true" : "false"}
                          data-highlighted={isHighlighted ? "true" : "false"}
                        >
                          {renderOption ? (
                            renderOption(option, isSelected)
                          ) : (
                            <>
                              <div className={styles.optionContent}>
                                <div className={styles.optionLabel}>
                                  {highlightMatchText(
                                    option.label,
                                    searchTerm,
                                    highlightMatch,
                                  )}
                                </div>
                                {option.description && (
                                  <div className={styles.optionDescription}>
                                    {option.description}
                                  </div>
                                )}
                              </div>
                              {isSelected && (
                                <CheckIcon className={styles.optionCheckIcon} />
                              )}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              {/* Create New Option */}
              {onCreate && searchTerm && (
                <div
                  onClick={() => {
                    onCreate(searchTerm.trim());
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={classNames(
                    styles.createOption,
                    filteredOptions.length > 0 && styles.createOptionWithBorder,
                    highlightedIndex === filteredOptions.length &&
                      styles.createOptionHighlighted,
                  )}
                  data-testid="autocomplete-create"
                >
                  <span className={styles.createIcon}>+</span>
                  <span className={styles.createText}>
                    {createLabel} "{searchTerm}"
                  </span>
                </div>
              )}

              {/* No Results */}
              {!loading && filteredOptions.length === 0 && !onCreate && (
                <div className={styles.noResults}>{noResultsText}</div>
              )}
            </div>
          )}
        </div>

        {/* Hint */}
        {hint && !error && !warning && (
          <p id={field.hintId} className={styles.hint}>
            {hint}
          </p>
        )}

        {/* Warning */}
        {warning && !error && (
          <p id={field.warningId} className={styles.warning}>
            <svg
              aria-hidden="true"
              className={styles.warningIcon}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {warning}
          </p>
        )}

        {/* Error */}
        {error && (
          <p id={field.errorId} className={styles.error} role="alert">
            <svg
              aria-hidden="true"
              className={styles.errorIcon}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
