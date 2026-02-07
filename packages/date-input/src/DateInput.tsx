import React, { useState, useRef, useEffect } from "react";
import Button from "@rubenpazch/button";
import IconButton from "@rubenpazch/icon-button";
import { CalendarIcon, ChevronIcon, ErrorIcon } from "@rubenpazch/icons";
import styles from "./DateInput.module.css";

export interface DateInputProps {
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
  locale?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
  error,
  required = false,
  disabled = false,
  minDate,
  maxDate,
  className = "",
  hint,
  locale = "en",
}) => {
  const classNames = (...classes: Array<string | undefined | false>) =>
    classes.filter(Boolean).join(" ");

  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(
    value ? new Date(value) : new Date(),
  );
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Parse input value
  const parseInputValue = (val: string): Date | null => {
    if (!val) return null;
    const date = new Date(val);
    return isNaN(date.getTime()) ? null : date;
  };

  // Handle date selection from calendar
  const handleSelectDate = (day: number) => {
    const selectedDate = new Date(currentMonth);
    selectedDate.setDate(day);
    const isoString = selectedDate.toISOString().split("T")[0];

    onChange(isoString);
    setInputValue(formatDate(selectedDate));
    setIsOpen(false);
  };

  // Handle month navigation
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

  // Handle input change with validation
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    // Try to parse the date
    const parsed = parseInputValue(val);
    if (parsed) {
      onChange(parsed.toISOString().split("T")[0]);
      setCurrentMonth(parsed);
    }
  };

  // Handle input blur
  const handleInputBlur = () => {
    if (inputValue && !parseInputValue(inputValue)) {
      // Invalid date, reset
      setInputValue(value);
    }
  };

  // Close picker on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update input value when prop changes
  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setInputValue(formatDate(date));
      setCurrentMonth(date);
    } else {
      setInputValue("");
    }
  }, [value, locale]);

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
      return ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    }
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  };

  // Get month name
  const getMonthName = (date: Date): string => {
    if (locale.startsWith("es")) {
      return date.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric",
      });
    }
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Check if date is selectable
  const isDateSelectable = (day: number): boolean => {
    const testDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    const testDateStr = testDate.toISOString().split("T")[0];

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

  // Generate calendar days
  const calendarDays: (number | null)[] = [];
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);

  // Add empty cells for days before the first day of month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const getQuickActionLabels = () => {
    if (locale.startsWith("es")) {
      return { today: "Hoy", clear: "Limpiar" };
    }
    return { today: "Today", clear: "Clear" };
  };

  const { today, clear } = getQuickActionLabels();

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
            error && styles.inputError,
            disabled && styles.inputDisabled,
          )}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            onFocus={() => !disabled && setIsOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
            className={styles.input}
          />
          <IconButton
            icon={<CalendarIcon size="md" className={styles.icon} />}
            aria-label="Open calendar"
            onClick={() => !disabled && setIsOpen(!isOpen)}
            disabled={disabled}
            size="small"
            variant="secondary"
            quiet
          />
        </div>

        {/* Calendar Picker */}
        {isOpen && !disabled && (
          <div className={styles.calendar}>
            {/* Header */}
            <div className={styles.header}>
              <IconButton
                icon={<ChevronIcon size="md" className={styles.navIconPrev} />}
                aria-label="Previous month"
                onClick={handlePreviousMonth}
                size="small"
                variant="secondary"
                quiet
              />

              <h3 className={styles.monthTitle}>
                {getMonthName(currentMonth)}
              </h3>

              <IconButton
                icon={<ChevronIcon size="md" className={styles.navIconNext} />}
                aria-label="Next month"
                onClick={handleNextMonth}
                size="small"
                variant="secondary"
                quiet
              />
            </div>

            {/* Day Names */}
            <div className={styles.dayNames}>
              {getDayNames().map((day) => (
                <div key={day} className={styles.dayName}>
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className={styles.calendarGrid}>
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

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <Button
                type="button"
                onClick={() => {
                  const today = new Date();
                  handleSelectDate(today.getDate());
                  setCurrentMonth(today);
                }}
                variant="outlined"
                color="primary"
                size="small"
                className={styles.actionButton}
              >
                {today}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onChange("");
                  setInputValue("");
                  setIsOpen(false);
                }}
                variant="outlined"
                color="secondary"
                size="small"
                className={styles.actionButton}
              >
                {clear}
              </Button>
            </div>
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
    </div>
  );
};

export default DateInput;
