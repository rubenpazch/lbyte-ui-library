import React, { useState, useRef, useEffect } from "react";
import Button from "@rubenpazch/button";
import IconButton from "@rubenpazch/icon-button";
import { CalendarIcon, ChevronIcon, ErrorIcon } from "@rubenpazch/icons";
import styles from "./DatePicker.module.css";

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  className?: string;
  hint?: string;
  readOnly?: boolean;
  locale?: string;
}

type ViewMode = "days" | "months" | "years";

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  className = "",
  hint,
  readOnly = false,
  locale = "en",
}) => {
  const classNames = (...classes: Array<string | undefined | false>) =>
    classes.filter(Boolean).join(" ");

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("days");
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const getLocaleLabels = () => {
    if (locale.startsWith("es")) {
      return {
        placeholder: "DD/MM/AAAA",
        today: "Hoy",
        clear: "Limpiar",
        required: "Este campo es obligatorio",
      };
    }
    return {
      placeholder: "MM/DD/YYYY",
      today: "Today",
      clear: "Clear",
      required: "This field is required",
    };
  };

  const localeLabels = getLocaleLabels();

  // Format date based on locale
  const formatDate = (date: Date): string => {
    if (locale.startsWith("es")) {
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const toIsoDateString = (date: Date): string => {
    const y = date.getFullYear();
    const m = `${date.getMonth() + 1}`.padStart(2, "0");
    const d = `${date.getDate()}`.padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const parseIsoDate = (val: string): Date | null => {
    if (!val) return null;
    const match = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return null;
    const [, y, m, d] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return isNaN(date.getTime()) ? null : date;
  };

  // Fallback parser for free-typed dates (locale-dependent)
  const parseInputValue = (val: string): Date | null => {
    if (!val) return null;
    const date = new Date(val);
    return isNaN(date.getTime()) ? null : date;
  };

  const getInitialDate = () => {
    const parsedValue = value ? parseIsoDate(value) : null;
    if (parsedValue) return parsedValue;
    const parsedMinDate = minDate ? parseIsoDate(minDate) : null;
    if (parsedMinDate) return parsedMinDate;
    return new Date();
  };

  const initialDate = getInitialDate();
  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate);
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate.getFullYear(),
  );

  // Handle date selection from calendar
  const handleSelectDate = (day: number) => {
    const selectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const isoString = toIsoDateString(selectedDate);

    onChange(isoString);
    setInputValue(formatDate(selectedDate));
    setIsOpen(false);
    setViewMode("days");
  };

  // Handle month selection
  const handleSelectMonth = (monthIndex: number) => {
    setCurrentMonth(new Date(currentYear, monthIndex, 1));
    setViewMode("days");
  };

  // Handle year selection
  const handleSelectYear = (year: number) => {
    setCurrentYear(year);
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1));
    setViewMode("months");
  };

  // Navigation handlers
  const handlePreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
  };

  const handlePreviousYear = () => {
    setCurrentYear(currentYear - 1);
    setCurrentMonth(new Date(currentYear - 1, currentMonth.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
    setCurrentMonth(new Date(currentYear + 1, currentMonth.getMonth(), 1));
  };

  const handlePreviousDecade = () => {
    setCurrentYear(currentYear - 10);
  };

  const handleNextDecade = () => {
    setCurrentYear(currentYear + 10);
  };

  // Handle input change with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    const parsed = parseIsoDate(val) || parseInputValue(val);
    if (parsed) {
      onChange(toIsoDateString(parsed));
      setCurrentMonth(parsed);
      setCurrentYear(parsed.getFullYear());
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    setIsFocused(false);
    if (
      inputValue &&
      !parseIsoDate(inputValue) &&
      !parseInputValue(inputValue)
    ) {
      if (value) {
        const date = parseIsoDate(value);
        setInputValue(date ? formatDate(date) : value);
      } else {
        setInputValue("");
      }
    }
  };

  // Handle input focus
  const handleInputFocus = () => {
    setIsFocused(true);
  };

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setViewMode("days");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    if (value) {
      const date = parseIsoDate(value);
      if (date) {
        setInputValue(formatDate(date));
        setCurrentMonth(date);
        setCurrentYear(date.getFullYear());
      }
    } else {
      setInputValue("");
    }
  }, [value, locale]);

  useEffect(() => {
    if (!value && minDate) {
      const parsedMinDate = parseIsoDate(minDate);
      if (parsedMinDate) {
        setCurrentMonth(parsedMinDate);
        setCurrentYear(parsedMinDate.getFullYear());
      }
    }
  }, [minDate, value]);

  // Keyboard navigation for accessibility
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setViewMode("days");
        inputRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Get days in month
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday)
  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Get day names
  const getDayNames = (): string[] => {
    if (locale.startsWith("es")) {
      return ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];
    }
    return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  };

  // Get month names
  const getMonthNames = (): string[] => {
    if (locale.startsWith("es")) {
      return [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ];
    }
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  };

  // Get month name
  const getMonthName = (date: Date): string => {
    if (locale.startsWith("es")) {
      return date.toLocaleDateString("es-ES", { month: "long" });
    }
    return date.toLocaleDateString("en-US", { month: "long" });
  };

  // Check if date is selectable
  const isDateSelectable = (day: number): boolean => {
    const testDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const testDateStr = toIsoDateString(testDate);

    if (minDate && testDateStr < minDate) return false;
    if (maxDate && testDateStr > maxDate) return false;

    return true;
  };

  // Check if date is today
  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelected = (day: number): boolean => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Check if month is current
  const isCurrentMonth = (monthIndex: number): boolean => {
    const today = new Date();
    return (
      monthIndex === today.getMonth() && currentYear === today.getFullYear()
    );
  };

  // Check if month is selected
  const isSelectedMonth = (monthIndex: number): boolean => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return (
      monthIndex === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  // Check if year is current
  const isCurrentYear = (year: number): boolean => {
    const today = new Date();
    return year === today.getFullYear();
  };

  // Check if year is selected
  const isSelectedYear = (year: number): boolean => {
    if (!value) return false;
    const selectedDate = new Date(value);
    return year === selectedDate.getFullYear();
  };

  // Generate calendar days
  const calendarDays: (number | null)[] = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  // Generate year range for decade view
  const startYear = Math.floor(currentYear / 10) * 10;
  const years = Array.from({ length: 12 }, (_, i) => startYear - 1 + i);

  // Handle today button
  const handleToday = () => {
    const today = new Date();
    const isoString = today.toISOString().split("T")[0];
    onChange(isoString);
    setInputValue(formatDate(today));
    setCurrentMonth(today);
    setCurrentYear(today.getFullYear());
    setIsOpen(false);
    setViewMode("days");
  };

  // Handle clear button
  const handleClear = () => {
    onChange("");
    setInputValue("");
    setIsOpen(false);
    setViewMode("days");
  };

  return (
    <div className={classNames(styles.wrapper, className)} ref={containerRef}>
      {/* Label */}
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      {/* Input Field */}
      <div className={styles.inputWrapper}>
        <div
          className={classNames(
            styles.inputContainer,
            disabled && styles.inputDisabled,
            readOnly && styles.inputReadOnly,
            !disabled &&
              !readOnly &&
              (isFocused || isOpen) &&
              styles.inputFocused,
            error && styles.inputError,
            required && !value && !error && styles.inputRequired,
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
            placeholder={placeholder || localeLabels.placeholder}
            disabled={disabled}
            readOnly={readOnly}
            className={classNames(
              styles.input,
              !disabled && !readOnly && styles.inputPointer,
              readOnly && styles.inputReadOnlyText,
              disabled && styles.inputDisabledText,
            )}
            aria-label={label}
            aria-invalid={!!error}
            aria-required={required}
          />
          <IconButton
            shape="square"
            icon={<CalendarIcon size="md" className={styles.icon} />}
            aria-label="Open calendar"
            onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
            disabled={disabled || readOnly}
            size="small"
            variant="secondary"
            quiet
          />
        </div>

        {/* Calendar Picker */}
        {isOpen && !disabled && !readOnly && (
          <div className={styles.calendar}>
            {/* Header */}
            <div className={styles.header}>
              <IconButton
                icon={<ChevronIcon size="md" className={styles.navIconPrev} />}
                aria-label={`Previous ${viewMode === "days" ? "month" : viewMode === "months" ? "year" : "decade"}`}
                onClick={
                  viewMode === "days"
                    ? handlePreviousMonth
                    : viewMode === "months"
                      ? handlePreviousYear
                      : handlePreviousDecade
                }
                size="small"
                variant="secondary"
                quiet
              />

              <div className={styles.headerCenter}>
                {viewMode === "days" && (
                  <>
                    <Button
                      type="button"
                      onClick={() => setViewMode("months")}
                      variant="text"
                      color="secondary"
                      size="small"
                      disableElevation
                      className={styles.headerButton}
                    >
                      {getMonthName(currentMonth)}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setViewMode("years")}
                      variant="text"
                      color="secondary"
                      size="small"
                      disableElevation
                      className={styles.headerButton}
                    >
                      {currentMonth.getFullYear()}
                    </Button>
                  </>
                )}
                {viewMode === "months" && (
                  <Button
                    type="button"
                    onClick={() => setViewMode("years")}
                    variant="text"
                    color="secondary"
                    size="small"
                    disableElevation
                    className={styles.headerButton}
                  >
                    {currentYear}
                  </Button>
                )}
                {viewMode === "years" && (
                  <h3 className={styles.headerTitle}>
                    {startYear - 1} - {startYear + 10}
                  </h3>
                )}
              </div>

              <IconButton
                icon={<ChevronIcon size="md" className={styles.navIconNext} />}
                aria-label={`Next ${viewMode === "days" ? "month" : viewMode === "months" ? "year" : "decade"}`}
                onClick={
                  viewMode === "days"
                    ? handleNextMonth
                    : viewMode === "months"
                      ? handleNextYear
                      : handleNextDecade
                }
                size="small"
                variant="secondary"
                quiet
              />
            </div>

            {/* Days View */}
            {viewMode === "days" && (
              <>
                {/* Day Names */}
                <div className={styles.dayNames}>
                  {getDayNames().map((day) => (
                    <div key={day} className={styles.dayName}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className={styles.dayGrid}>
                  {calendarDays.map((day, index) => (
                    <Button
                      key={index}
                      type="button"
                      onClick={() =>
                        day !== null &&
                        isDateSelectable(day) &&
                        handleSelectDate(day)
                      }
                      disabled={day === null || !isDateSelectable(day)}
                      variant="text"
                      color="secondary"
                      size="small"
                      disableElevation
                      className={classNames(
                        styles.dayButton,
                        day === null && styles.dayEmpty,
                        day !== null && isSelected(day) && styles.daySelected,
                        day !== null &&
                          !isSelected(day) &&
                          isToday(day) &&
                          styles.dayToday,
                        day !== null &&
                          !isSelected(day) &&
                          !isToday(day) &&
                          isDateSelectable(day) &&
                          styles.daySelectable,
                        day !== null &&
                          !isDateSelectable(day) &&
                          styles.dayDisabled,
                      )}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </>
            )}

            {/* Months View */}
            {viewMode === "months" && (
              <div className={styles.monthGrid}>
                {getMonthNames().map((month, index) => (
                  <Button
                    key={index}
                    type="button"
                    onClick={() => handleSelectMonth(index)}
                    variant="text"
                    color="secondary"
                    size="small"
                    disableElevation
                    className={classNames(
                      styles.monthButton,
                      isSelectedMonth(index) && styles.monthSelected,
                      !isSelectedMonth(index) &&
                        isCurrentMonth(index) &&
                        styles.monthCurrent,
                    )}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            )}

            {/* Years View */}
            {viewMode === "years" && (
              <div className={styles.yearGrid}>
                {years.map((year) => (
                  <Button
                    key={year}
                    type="button"
                    onClick={() => handleSelectYear(year)}
                    variant="text"
                    color="secondary"
                    size="small"
                    disableElevation
                    className={classNames(
                      styles.yearButton,
                      isSelectedYear(year) && styles.yearSelected,
                      !isSelectedYear(year) &&
                        isCurrentYear(year) &&
                        styles.yearCurrent,
                    )}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            )}

            {/* Quick Actions - Only show in days view */}
            {viewMode === "days" && (
              <div className={styles.quickActions}>
                <Button
                  type="button"
                  onClick={handleToday}
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={styles.quickActionButton}
                >
                  {localeLabels.today}
                </Button>
                <Button
                  type="button"
                  onClick={handleClear}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  className={styles.quickActionButton}
                >
                  {localeLabels.clear}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hint Text */}
      {hint && !error && <p className={styles.hint}>{hint}</p>}

      {/* Error Message */}
      {error && (
        <div className={styles.errorRow}>
          <ErrorIcon size="sm" className={styles.errorIcon} />
          <p className={styles.errorText}>{error}</p>
        </div>
      )}

      {/* Required but empty indicator */}
      {required && !value && !error && !isFocused && (
        <p className={styles.requiredHint}>{localeLabels.required}</p>
      )}
    </div>
  );
};

export default DatePicker;
