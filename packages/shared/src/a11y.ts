import { useCallback, useEffect, useId, useRef } from "react";
import type { Ref, RefCallback, RefObject } from "react";

/* ------------------------------------------------------------------ tamaños */

/** Tamaño estándar de la librería. */
export type ComponentSize = "sm" | "md" | "lg";
/** Nombres antiguos que algunos componentes aceptaban; siguen funcionando. */
export type LegacySize = "small" | "medium" | "large";
/** Lo que aceptan los componentes: el estándar y, por compatibilidad, los nombres antiguos. */
export type SizeProp = ComponentSize | LegacySize;

const SIZE_ALIASES: Record<LegacySize, ComponentSize> = {
  small: "sm",
  medium: "md",
  large: "lg",
};

/**
 * Convierte cualquier valor aceptado de `size` al estándar `sm | md | lg`.
 * `normalizeSize("medium") === "md"`.
 */
export function normalizeSize(
  size: SizeProp | undefined,
  fallback: ComponentSize = "md",
): ComponentSize {
  if (!size) return fallback;
  return (
    (SIZE_ALIASES as Record<string, ComponentSize>)[size] ??
    (size as ComponentSize)
  );
}

/* ------------------------------------------------------------------ campos */

/** Props comunes a todos los campos de formulario. */
export interface FieldProps {
  /** Etiqueta visible del campo (se asocia al control para lectores de pantalla). */
  label?: string;
  /** Texto de ayuda bajo el campo. */
  hint?: string;
  /** Mensaje de error; marca el campo como inválido. */
  error?: string;
  /** Advertencia (no bloquea). */
  warning?: string;
  /** Campo obligatorio: muestra * y marca el control como requerido. */
  required?: boolean;
  /** Campo deshabilitado. */
  disabled?: boolean;
  /** id del control. Si no se pasa, se genera uno. */
  id?: string;
  /** name del control (formularios nativos y librerías de formularios). */
  name?: string;
  /** Clase extra para el contenedor (márgenes, ancho). */
  className?: string;
}

export interface FieldIds {
  /** id para el control (input, select, textarea…). */
  inputId: string;
  hintId: string;
  errorId: string;
  warningId: string;
  /** Atributos listos para poner en el control. */
  controlProps: {
    id: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
    "aria-required"?: true;
  };
}

/**
 * Ids y atributos ARIA de un campo: asocia etiqueta, ayuda, error y advertencia al control.
 *
 * ```tsx
 * const f = useFieldIds({ id, name, hint, error, warning, required });
 * <label htmlFor={f.inputId}>…</label>
 * <input {...f.controlProps} />
 * {error && <p id={f.errorId}>{error}</p>}
 * ```
 */
export function useFieldIds(
  opts: Pick<
    FieldProps,
    "id" | "name" | "hint" | "error" | "warning" | "required"
  >,
): FieldIds {
  const generated = useId();
  const inputId =
    opts.id ?? (opts.name ? `${opts.name}-${generated}` : generated);
  const hintId = `${inputId}-ayuda`;
  const errorId = `${inputId}-error`;
  const warningId = `${inputId}-advertencia`;
  const describedBy =
    [opts.error && errorId, opts.warning && warningId, opts.hint && hintId]
      .filter(Boolean)
      .join(" ") || undefined;
  return {
    inputId,
    hintId,
    errorId,
    warningId,
    controlProps: {
      id: inputId,
      "aria-invalid": opts.error ? true : undefined,
      "aria-describedby": describedBy,
      "aria-required": opts.required ? true : undefined,
    },
  };
}

/* ------------------------------------------------------------------ capas (modal, drawer, menú) */

/** Llama a `onEscape` al pulsar Escape mientras `active` sea true. */
export function useEscapeKey(
  onEscape: (() => void) | undefined,
  active = true,
) {
  const ref = useRef(onEscape);
  ref.current = onEscape;
  useEffect(() => {
    if (!active) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") ref.current?.();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active]);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

/**
 * Mantiene el foco dentro de `containerRef` mientras `active` sea true (Tab y Shift+Tab giran
 * dentro), enfoca el primer elemento al abrir y devuelve el foco a donde estaba al cerrar.
 */
export function useFocusTrap<T extends HTMLElement>(
  containerRef: RefObject<T | null>,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;
    const previous = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) =>
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true",
      );
    const first = focusables()[0];
    (first ?? container).focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) {
        event.preventDefault();
        return;
      }
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };
    container.addEventListener("keydown", onKey);
    return () => {
      container.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [active, containerRef]);
}

/** Bloquea el scroll del documento mientras `active` sea true (modales y drawers). */
export function useLockBodyScroll(active: boolean) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}

/** Llama a `onOutside` cuando se hace clic fuera de `ref` (menús, tooltips, listas). */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
  active = true,
) {
  const cb = useRef(onOutside);
  cb.current = onOutside;
  const handler = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        cb.current();
    },
    [ref],
  );
  useEffect(() => {
    if (!active) return;
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [active, handler]);
}

/** Une varias refs (la interna del componente y la que pasa el usuario con forwardRef). */
export function mergeRefs<T>(
  ...refs: Array<Ref<T> | undefined>
): RefCallback<T> {
  return (value) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(value);
      else if (ref) (ref as RefObject<T | null>).current = value;
    }
  };
}
