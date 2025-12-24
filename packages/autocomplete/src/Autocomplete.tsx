import * as React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import { ChevronIcon, CheckIcon, CloseIcon } from "@rubenpazch/icons";
import LoadingSpinner from "@rubenpazch/loading-spinner";

export interface AutocompleteOption {
  value: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
  metadata?: Record<string, any>;
}

interface AutocompleteProps {
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
          <mark
            key={index}
            className="bg-yellow-200 font-semibold text-gray-900"
          >
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  );
};
const Autocomplete: React.FC<AutocompleteProps> = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Search or select...",
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
  createLabel = "Create",
  noResultsText = "No results found",
  loadingText = "Loading...",
  highlightMatch = true,
  minSearchLength = 0,
  debounceMs = 300,
  keepListOpen = false,
  position = "bottom",
}) => {
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
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

  const getBorderColor = () => {
    if (error) {
      return "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200";
    }
    if (warning) {
      return "border-yellow-500 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200";
    }
    if (isFocused) {
      return "border-blue-500 focus:ring-2 focus:ring-blue-200";
    }
    return "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200";
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input Container */}
      <div ref={containerRef} className="relative">
        {/* Left Icon */}
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none flex items-center">
            {icon}
          </div>
        )}

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly || !searchable}
          className={`
            w-full px-4 py-2 rounded-lg border-2 transition-all outline-none
            font-medium text-gray-900 placeholder-gray-400
            disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed
            ${icon ? "pl-10" : ""}
            ${clearable && value ? "pr-20" : "pr-12"}
            ${getBorderColor()}
            ${readOnly ? "bg-gray-50 cursor-default" : ""}
          `}
          data-testid="autocomplete-input"
        />

        {/* Right Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {loading && <LoadingSpinner size="sm" variant="dots" inline />}

          {clearable && value && !loading && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              data-testid="autocomplete-clear"
              aria-label="Clear selection"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}

          <button
            type="button"
            onClick={handleToggle}
            className={`text-gray-400 transition-all ${
              disabled || readOnly
                ? "cursor-not-allowed opacity-50"
                : "hover:text-gray-600"
            }`}
            disabled={disabled}
            data-testid="autocomplete-toggle"
            aria-label={isOpen ? "Close dropdown" : "Open dropdown"}
          >
            <ChevronIcon
              className={`w-5 h-5 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && !disabled && !readOnly && (
          <div
            ref={dropdownRef}
            className={`
              absolute z-50 left-0 right-0 mt-1
              bg-white border-2 border-gray-200 rounded-lg shadow-lg
              overflow-hidden
              ${position === "top" ? "bottom-full mb-1" : "top-full"}
            `}
            style={{ maxHeight }}
            data-testid="autocomplete-dropdown"
          >
            {/* Loading State */}
            {loading && filteredOptions.length === 0 && (
              <div className="px-4 py-3 text-center text-gray-500">
                <LoadingSpinner
                  size="sm"
                  variant="spinner"
                  className="mx-auto"
                />
                <span className="block mt-2 text-sm">{loadingText}</span>
              </div>
            )}

            {/* Options List */}
            <div className="overflow-y-auto max-h-full">
              {!loading && filteredOptions.length > 0 && (
                <>
                  {filteredOptions.map((option, index) => {
                    const isSelected = option.value === value;
                    const isHighlighted = index === highlightedIndex;

                    return (
                      <div
                        key={option.value}
                        ref={(el) => {
                          optionRefs.current[index] = el;
                        }}
                        onClick={() => handleSelect(option)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`
                        px-4 py-3 cursor-pointer transition-colors flex items-center justify-between
                        ${option.disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : ""}
                        ${isHighlighted && !option.disabled ? "bg-blue-50" : ""}
                        ${isSelected && !option.disabled ? "bg-blue-100" : ""}
                        ${!isHighlighted && !isSelected && !option.disabled ? "hover:bg-gray-50" : ""}
                      `}
                        data-testid={`autocomplete-option-${option.value}`}
                      >
                        {renderOption ? (
                          renderOption(option, isSelected)
                        ) : (
                          <>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {highlightMatchText(
                                  option.label,
                                  searchTerm,
                                  highlightMatch,
                                )}
                              </div>
                              {option.description && (
                                <div className="text-xs text-gray-500 mt-0.5">
                                  {option.description}
                                </div>
                              )}
                            </div>
                            {isSelected && (
                              <CheckIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
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
                className={`
                  px-4 py-3 cursor-pointer
                  flex items-center gap-2
                  ${filteredOptions.length > 0 ? "border-t border-gray-200" : ""}
                  transition-colors
                  ${highlightedIndex === filteredOptions.length ? "bg-blue-50" : "hover:bg-gray-50"}
                `}
                data-testid="autocomplete-create"
              >
                <span className="text-blue-600 font-medium">+</span>
                <span className="text-gray-900">
                  {createLabel} "{searchTerm}"
                </span>
              </div>
            )}

            {/* No Results */}
            {!loading && filteredOptions.length === 0 && !onCreate && (
              <div className="px-4 py-3 text-center text-gray-500 text-sm">
                {noResultsText}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hint */}
      {hint && !error && !warning && (
        <p className="text-xs text-gray-500">{hint}</p>
      )}

      {/* Warning */}
      {warning && !error && (
        <p className="text-xs text-yellow-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
        <p className="text-xs text-red-600 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
};

export default Autocomplete;
