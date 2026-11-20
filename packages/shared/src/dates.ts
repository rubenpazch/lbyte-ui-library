/**
 * Fechas "de calendario" (sin hora) en hora LOCAL.
 *
 * `new Date("2026-11-20")` se interpreta en UTC: en Perú (UTC-5) eso es el 19 a las 19:00, y
 * `date.toISOString()` vuelve a convertir a UTC. Estas funciones evitan ese corrimiento de un día.
 */

const pad = (n: number) => String(n).padStart(2, "0");

/** "2026-11-20" -> Date local (20/11/2026 00:00). Devuelve null si no es válida. */
export function parseISODate(value: string | null | undefined): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!m) return null;
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return date.getMonth() === Number(m[2]) - 1 ? date : null;
}

/** Date local -> "2026-11-20". */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** true si el idioma ordena día/mes (es, pt, fr…); false para en-US (mes/día). */
export function isDayFirst(locale = "es"): boolean {
  return !/^en(-US)?$/i.test(locale);
}

/** Placeholder del formato que espera `parseLocalDate`: "DD/MM/AAAA" o "MM/DD/YYYY". */
export function datePlaceholder(locale = "es"): string {
  return isDayFirst(locale) ? "DD/MM/AAAA" : "MM/DD/YYYY";
}

/**
 * Interpreta lo que escribe el usuario: "25/12/2026", "25-12-2026", "25.12.2026" (o mes/día en
 * inglés) y también ISO "2026-12-25". Devuelve null si está incompleta o no existe (31/02).
 */
export function parseLocalDate(text: string, locale = "es"): Date | null {
  const value = text.trim();
  if (!value) return null;
  const iso = parseISODate(value);
  if (iso && /^\d{4}-\d{2}-\d{2}$/.test(value)) return iso;
  const m = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(value);
  if (!m) return null;
  const [a, b, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const [day, month] = isDayFirst(locale) ? [a, b] : [b, a];
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : null;
}

/** Date -> texto según el idioma: "25/12/2026" (es) o "12/25/2026" (en). */
export function formatLocalDate(date: Date, locale = "es"): string {
  const d = pad(date.getDate());
  const mo = pad(date.getMonth() + 1);
  return isDayFirst(locale)
    ? `${d}/${mo}/${date.getFullYear()}`
    : `${mo}/${d}/${date.getFullYear()}`;
}

/** Nombre del mes con año: "noviembre de 2026". */
export function formatMonthYear(date: Date, locale = "es"): string {
  return date.toLocaleDateString(locale === "es" ? "es-PE" : locale, {
    month: "long",
    year: "numeric",
  });
}

/** Mismo día de calendario. */
export function isSameDay(
  a: Date | null | undefined,
  b: Date | null | undefined,
): boolean {
  return (
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
