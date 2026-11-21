import React, { useState, useRef, useEffect } from "react";
import Button from "@rubenpazch/button";
import IconButton from "@rubenpazch/icon-button";
import { CalendarIcon, ChevronIcon, ErrorIcon } from "@rubenpazch/icons";
import {
  datePlaceholder,
  formatLocalDate,
  formatMonthYear,
  mergeRefs,
  parseISODate,
  parseLocalDate,
  toISODate,
  MOBILE_QUERY,
  useClickOutside,
  useEscapeKey,
  useFieldIds,
  useFocusTrap,
  useLockBodyScroll,
  useMediaQuery,
} from "@rubenpazch/shared";
import styles from "./DateInput.module.css";

/** Textos del calendario (accesibilidad y botones). */
export interface DateInputLabels {
  openCalendar: string;
  previousMonth: string;
  nextMonth: string;
  today: string;
  clear: string;
  calendar: string;
  /** Cerrar el calendario a pantalla completa (móvil). */
  close: string;
}

const LABELS_ES: DateInputLabels = {
  openCalendar: "Abrir calendario",
  previousMonth: "Mes anterior",
  nextMonth: "Mes siguiente",
  today: "Hoy",
  clear: "Limpiar",
  calendar: "Calendario",
  close: "Cerrar",
};

const LABELS_EN: DateInputLabels = {
  openCalendar: "Open calendar",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  today: "Today",
  clear: "Clear",
  calendar: "Calendar",
  close: "Close",
};

const DAY_NAMES_ES = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export interface DateInputProps {
  /** id del input; si no se pasa se genera uno (la etiqueta se asocia sola). */
  id?: string;
  /** name del input (formularios nativos, react-hook-form…). */
  name?: string;
  /** Etiqueta visible. */
  label?: string;
  /** Fecha en formato ISO `AAAA-MM-DD`, o cadena vacía. */
  value: string;
  /** Recibe la fecha en ISO `AAAA-MM-DD` (o "" al limpiar). */
  onChange: (date: string) => void;
  /** Por defecto el formato del idioma: "DD/MM/AAAA" en español. */
  placeholder?: string;
  /** Mensaje de error; marca el campo como inválido. */
  error?: string;
  /** Campo obligatorio. */
  required?: boolean;
  /** Campo deshabilitado. */
  disabled?: boolean;
  /** Fecha mínima seleccionable (ISO). */
  minDate?: string;
  /** Fecha máxima seleccionable (ISO). */
  maxDate?: string;
  /** Clase extra para el contenedor. */
  className?: string;
  /** Texto de ayuda. */
  hint?: string;
  /** Idioma: `es` (por defecto, día/mes) o `en` (mes/día). */
  locale?: string;
  /** Textos del calendario; por defecto en el idioma de `locale`. */
  labels?: Partial<DateInputLabels>;
  /**
   * En pantallas pequeñas (< 640 px) el calendario se abre a pantalla completa y vuelve al
   * campo al elegir la fecha. Por defecto true.
   */
  mobileFullScreen?: boolean;
}

const classNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

/**
 * Campo de fecha con calendario desplegable. Se escribe en el formato del idioma
 * (DD/MM/AAAA en español) y devuelve siempre ISO `AAAA-MM-DD`, en hora local.
 */
const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(
    {
      id,
      name,
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
      locale = "es",
      labels,
      mobileFullScreen = true,
    },
    ref,
  ) {
    const isEs = locale.startsWith("es");
    const text: DateInputLabels = {
      ...(isEs ? LABELS_ES : LABELS_EN),
      ...labels,
    };
    const field = useFieldIds({
      id,
      name,
      required,
      error,
      hint: hint && !error ? hint : undefined,
    });
    const calendarId = `${field.inputId}-calendario`;

    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(
      parseISODate(value) ?? new Date(),
    );
    const [inputValue, setInputValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Al cerrar con Escape devolvemos el foco al input sin que onFocus lo vuelva a abrir.
    const skipOpenOnFocus = useRef(false);
    useClickOutside(containerRef, () => setIsOpen(false), isOpen);
    useEscapeKey(() => {
      setIsOpen(false);
      skipOpenOnFocus.current = true;
      inputRef.current?.focus();
    }, isOpen);

    // Móvil: calendario a pantalla completa, sin scroll detrás y con el foco dentro.
    const calendarRef = useRef<HTMLDivElement>(null);
    const esMovil = useMediaQuery(MOBILE_QUERY);
    const fullScreen = mobileFullScreen && esMovil;
    const abiertoCompleto = isOpen && fullScreen && !disabled;
    useEffect(() => {
      if (!abiertoCompleto) return;
      // Al cerrar, el foco vuelve al campo (useFocusTrap): que eso no lo reabra.
      return () => {
        skipOpenOnFocus.current = true;
        setTimeout(() => {
          skipOpenOnFocus.current = false;
        }, 0);
      };
    }, [abiertoCompleto]);
    useLockBodyScroll(abiertoCompleto);
    useFocusTrap(calendarRef, abiertoCompleto);

    // Sincroniza el texto con el valor (ISO) que llega por props.
    useEffect(() => {
      const date = parseISODate(value);
      if (date) {
        setInputValue(formatLocalDate(date, locale));
        setCurrentMonth(date);
      } else {
        setInputValue("");
      }
    }, [value, locale]);

    const isDateSelectable = (date: Date): boolean => {
      const iso = toISODate(date);
      if (minDate && iso < minDate) return false;
      if (maxDate && iso > maxDate) return false;
      return true;
    };

    const selectDate = (date: Date) => {
      onChange(toISODate(date));
      setInputValue(formatLocalDate(date, locale));
      setCurrentMonth(date);
      setIsOpen(false);
    };

    const handleSelectDay = (day: number) => {
      selectDate(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day),
      );
    };

    const handlePreviousMonth = () =>
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
      );
    const handleNextMonth = () =>
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
      );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputValue(val);
      const parsed = parseLocalDate(val, locale);
      if (parsed && isDateSelectable(parsed)) {
        onChange(toISODate(parsed));
        setCurrentMonth(parsed);
      }
    };

    const handleInputBlur = () => {
      // Texto inválido: vuelve a mostrar el valor vigente.
      if (inputValue && !parseLocalDate(inputValue, locale)) {
        const date = parseISODate(value);
        setInputValue(date ? formatLocalDate(date, locale) : "");
      }
    };

    // Celdas del calendario (null = hueco antes del día 1).
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    ).getDate();
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    ).getDay();
    const calendarDays: (number | null)[] = [
      ...Array<null>(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const selected = parseISODate(value);
    const today = new Date();
    const dayDate = (day: number) =>
      new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const sameDay = (a: Date | null, b: Date) =>
      !!a &&
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate();

    return (
      <div className={classNames(styles.wrapper, className)} ref={containerRef}>
        {label && (
          <label htmlFor={field.inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className={styles.inputWrapper}>
          <div
            className={classNames(
              styles.inputContainer,
              error && styles.inputError,
              disabled && styles.inputDisabled,
            )}
          >
            <input
              ref={mergeRefs(inputRef, ref)}
              {...field.controlProps}
              name={name}
              required={required}
              type="text"
              // En móvil se elige en el calendario: sin teclado virtual encima.
              inputMode={fullScreen ? "none" : "numeric"}
              autoComplete="off"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              onFocus={() => {
                if (skipOpenOnFocus.current) {
                  skipOpenOnFocus.current = false;
                  return;
                }
                if (!disabled) setIsOpen(true);
              }}
              placeholder={placeholder ?? datePlaceholder(locale)}
              disabled={disabled}
              className={styles.input}
              role="combobox"
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls={isOpen ? calendarId : undefined}
            />
            <IconButton
              icon={<CalendarIcon size="md" className={styles.icon} />}
              aria-label={text.openCalendar}
              onClick={() => !disabled && setIsOpen(!isOpen)}
              disabled={disabled}
              size="small"
              variant="secondary"
              quiet
            />
          </div>

          {isOpen && !disabled && (
            <div
              ref={calendarRef}
              id={calendarId}
              className={classNames(
                styles.calendar,
                fullScreen && styles.fullScreen,
              )}
              role="dialog"
              aria-modal={fullScreen || undefined}
              aria-label={fullScreen && label ? label : text.calendar}
            >
              {fullScreen && (
                <div className={styles.sheetBar}>
                  <span className={styles.sheetTitle}>
                    {label || text.calendar}
                  </span>
                  <Button
                    type="button"
                    variant="text"
                    color="secondary"
                    size="small"
                    onClick={() => setIsOpen(false)}
                  >
                    {text.close}
                  </Button>
                </div>
              )}
              <div className={styles.header}>
                <IconButton
                  icon={
                    <ChevronIcon size="md" className={styles.navIconPrev} />
                  }
                  aria-label={text.previousMonth}
                  onClick={handlePreviousMonth}
                  size="small"
                  variant="secondary"
                  quiet
                />
                <h3 className={styles.monthTitle} aria-live="polite">
                  {formatMonthYear(currentMonth, locale)}
                </h3>
                <IconButton
                  icon={
                    <ChevronIcon size="md" className={styles.navIconNext} />
                  }
                  aria-label={text.nextMonth}
                  onClick={handleNextMonth}
                  size="small"
                  variant="secondary"
                  quiet
                />
              </div>

              <div className={styles.dayNames} aria-hidden="true">
                {(isEs ? DAY_NAMES_ES : DAY_NAMES_EN).map((day) => (
                  <div key={day} className={styles.dayName}>
                    {day}
                  </div>
                ))}
              </div>

              <div className={styles.calendarGrid}>
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return (
                      <span
                        key={`vacio-${index}`}
                        className={classNames(
                          styles.dayButton,
                          styles.dayEmpty,
                        )}
                      />
                    );
                  }
                  const date = dayDate(day);
                  const isSel = sameDay(selected, date);
                  const isToday = sameDay(today, date);
                  const selectable = isDateSelectable(date);
                  return (
                    <Button
                      key={day}
                      type="button"
                      onClick={() => selectable && handleSelectDay(day)}
                      disabled={!selectable}
                      aria-pressed={isSel}
                      aria-current={isToday ? "date" : undefined}
                      aria-label={formatLocalDate(date, locale)}
                      variant="text"
                      color="secondary"
                      size="small"
                      disableElevation
                      className={classNames(
                        styles.dayButton,
                        isSel && styles.daySelected,
                        !isSel && isToday && styles.dayToday,
                        !isSel &&
                          !isToday &&
                          selectable &&
                          styles.daySelectable,
                        !selectable && styles.dayDisabled,
                      )}
                    >
                      {day}
                    </Button>
                  );
                })}
              </div>

              <div className={styles.quickActions}>
                <Button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    const hoy = new Date(
                      now.getFullYear(),
                      now.getMonth(),
                      now.getDate(),
                    );
                    if (isDateSelectable(hoy)) selectDate(hoy);
                    else setCurrentMonth(hoy);
                  }}
                  variant="outlined"
                  color="primary"
                  size="small"
                  className={styles.actionButton}
                >
                  {text.today}
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
                  {text.clear}
                </Button>
              </div>
            </div>
          )}
        </div>

        {hint && !error && (
          <p id={field.hintId} className={styles.hint}>
            {hint}
          </p>
        )}

        {error && (
          <div id={field.errorId} className={styles.errorRow} role="alert">
            <ErrorIcon size="sm" className={styles.errorIcon} />
            <p className={styles.errorText}>{error}</p>
          </div>
        )}
      </div>
    );
  },
);

DateInput.displayName = "DateInput";

export default DateInput;
