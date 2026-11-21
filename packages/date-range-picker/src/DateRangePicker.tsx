import DateInput from "@rubenpazch/date-input";
import { parseISODate, toISODate } from "@rubenpazch/shared";
import styles from "./DateRangePicker.module.css";

/** Rango de fechas en ISO `AAAA-MM-DD` ("" = sin fecha). */
export interface DateRange {
  from: string;
  to: string;
}

export interface DateRangePreset {
  /** Texto del atajo: "Este mes". */
  label: string;
  /** Calcula el rango a partir de "hoy" (fecha local). */
  range: (today: Date) => DateRange;
}

export interface DateRangePickerLabels {
  from: string;
  to: string;
  /** Error cuando "hasta" es anterior a "desde". */
  order: string;
  presets: string;
}

export const DEFAULT_DATE_RANGE_LABELS: DateRangePickerLabels = {
  from: "Desde",
  to: "Hasta",
  order: "La fecha final no puede ser anterior a la inicial.",
  presets: "Periodos rápidos",
};

const primerDia = (y: number, m: number) => new Date(y, m, 1);
const ultimoDia = (y: number, m: number) => new Date(y, m + 1, 0);
const rango = (a: Date, b: Date): DateRange => ({
  from: toISODate(a),
  to: toISODate(b),
});
const menos = (d: Date, dias: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() - dias);

/** Atajos habituales (fechas locales, sin corrimiento de zona horaria). */
export const DEFAULT_DATE_RANGE_PRESETS: DateRangePreset[] = [
  { label: "Hoy", range: (h) => rango(h, h) },
  { label: "Últimos 7 días", range: (h) => rango(menos(h, 6), h) },
  { label: "Últimos 30 días", range: (h) => rango(menos(h, 29), h) },
  {
    label: "Este mes",
    range: (h) =>
      rango(
        primerDia(h.getFullYear(), h.getMonth()),
        ultimoDia(h.getFullYear(), h.getMonth()),
      ),
  },
  {
    label: "Mes anterior",
    range: (h) =>
      rango(
        primerDia(h.getFullYear(), h.getMonth() - 1),
        ultimoDia(h.getFullYear(), h.getMonth() - 1),
      ),
  },
  {
    label: "Este año",
    range: (h) =>
      rango(new Date(h.getFullYear(), 0, 1), new Date(h.getFullYear(), 11, 31)),
  },
];

/** true si el rango está completo y "hasta" no es anterior a "desde". */
export function rangoValido(r: DateRange): boolean {
  const a = parseISODate(r.from);
  const b = parseISODate(r.to);
  return !!a && !!b && a.getTime() <= b.getTime();
}

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  /** Título del grupo (se usa como `<legend>`). */
  label?: string;
  hint?: string;
  /** Error externo; si no hay, se muestra el de orden cuando corresponde. */
  error?: string;
  /** Atajos; `false` los oculta. Por defecto: hoy, 7/30 días, este mes, mes anterior, este año. */
  presets?: DateRangePreset[] | false;
  minDate?: string;
  maxDate?: string;
  required?: boolean;
  disabled?: boolean;
  locale?: string;
  labels?: Partial<DateRangePickerLabels>;
  /** Para pruebas: fecha que se toma como "hoy" en los atajos. */
  today?: Date;
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Periodo desde/hasta con dos `DateInput` y atajos. Valida que "hasta" no sea anterior a "desde"
 * y limita cada calendario según la otra fecha.
 */
export default function DateRangePicker({
  value,
  onChange,
  label,
  hint,
  error,
  presets = DEFAULT_DATE_RANGE_PRESETS,
  minDate,
  maxDate,
  required = false,
  disabled = false,
  locale,
  labels: labelsProp,
  today,
  className,
}: DateRangePickerProps) {
  const t = { ...DEFAULT_DATE_RANGE_LABELS, ...labelsProp };
  const desordenado = !!value.from && !!value.to && !rangoValido(value);
  const mensaje = error || (desordenado ? t.order : undefined);
  const hoy = today ?? new Date();
  const activo = (p: DateRangePreset) => {
    const r = p.range(hoy);
    return r.from === value.from && r.to === value.to;
  };

  return (
    <fieldset className={cx(styles.group, className)} disabled={disabled}>
      {label && <legend className={styles.legend}>{label}</legend>}
      <div className={styles.fields}>
        <DateInput
          label={t.from}
          value={value.from}
          onChange={(from) => onChange({ ...value, from })}
          minDate={minDate}
          maxDate={value.to || maxDate}
          required={required}
          disabled={disabled}
          locale={locale}
        />
        <DateInput
          label={t.to}
          value={value.to}
          onChange={(to) => onChange({ ...value, to })}
          minDate={value.from || minDate}
          maxDate={maxDate}
          required={required}
          disabled={disabled}
          locale={locale}
          error={mensaje}
        />
      </div>
      {presets && presets.length > 0 && (
        <div className={styles.presets} role="group" aria-label={t.presets}>
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              className={cx(styles.preset, activo(p) && styles.presetActive)}
              aria-pressed={activo(p)}
              onClick={() => onChange(p.range(hoy))}
              disabled={disabled}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}
      {hint && <p className={styles.hint}>{hint}</p>}
    </fieldset>
  );
}
