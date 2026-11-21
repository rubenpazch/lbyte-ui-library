import { formatMonthYear } from "@rubenpazch/shared";
import styles from "./MonthNavigator.module.css";

export interface MonthNavigatorProps {
  /** Mes actual en formato "AAAA-MM" (p. ej. "2026-11"). */
  value: string;
  /** Recibe el nuevo mes "AAAA-MM". */
  onChange: (value: string) => void;
  /** Primer mes permitido "AAAA-MM". */
  min?: string;
  /** Último mes permitido "AAAA-MM". */
  max?: string;
  /** Muestra el botón "Hoy" para volver al mes actual. */
  showToday?: boolean;
  /** Idioma del nombre del mes (por defecto "es"). */
  locale?: string;
  /** Textos accesibles. */
  labels?: Partial<{ previous: string; next: string; today: string }>;
  /** Clase extra. */
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");
const pad = (n: number) => String(n).padStart(2, "0");

/** Suma meses a "AAAA-MM": addMonths("2026-12", 1) === "2027-01". */
export function addMonths(value: string, delta: number): string {
  const [y, m] = value.split("-").map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

/** Mes actual "AAAA-MM" en hora local. */
export function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
}

/** Navegador de periodos: ‹ noviembre de 2026 › para finanzas, contabilidad y cronogramas. */
export default function MonthNavigator({
  value,
  onChange,
  min,
  max,
  showToday = false,
  locale = "es",
  labels,
  className,
}: MonthNavigatorProps) {
  const text = {
    previous: "Mes anterior",
    next: "Mes siguiente",
    today: "Hoy",
    ...labels,
  };
  const [y, m] = value.split("-").map(Number);
  const title = formatMonthYear(new Date(y, m - 1, 1), locale);
  const prev = addMonths(value, -1);
  const next = addMonths(value, 1);
  const hoy = currentMonth();
  const canPrev = !min || prev >= min;
  const canNext = !max || next <= max;

  return (
    <div
      className={cx(styles.nav, className)}
      role="group"
      aria-label="Periodo"
    >
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onChange(prev)}
        disabled={!canPrev}
        aria-label={text.previous}
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.79 5.23a.75.75 0 0 1-.02 1.06L8.83 10l3.94 3.71a.75.75 0 1 1-1.04 1.08l-4.5-4.25a.75.75 0 0 1 0-1.08l4.5-4.25a.75.75 0 0 1 1.06.02Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span className={styles.title} aria-live="polite">
        {title}
      </span>
      <button
        type="button"
        className={styles.arrow}
        onClick={() => onChange(next)}
        disabled={!canNext}
        aria-label={text.next}
      >
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.17 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {showToday && value !== hoy && (
        <button
          type="button"
          className={styles.today}
          onClick={() => onChange(hoy)}
        >
          {text.today}
        </button>
      )}
    </div>
  );
}
