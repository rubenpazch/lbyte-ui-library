import React from "react";
import CheckboxInput from "./CheckboxInput";
import styles from "./CheckboxGroup.module.css";

export interface CheckboxOption {
  /** Texto visible de la casilla. */
  label: string;
  /** Valor que se agrega a la lista al marcarla. */
  value: string;
  /** Texto secundario bajo la etiqueta. */
  description?: string;
  /** Deshabilita solo esta casilla. */
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** Título del grupo (se muestra como `<legend>` del `<fieldset>`). */
  label: string;
  /** Opciones del grupo. */
  options: CheckboxOption[];
  /** Valores marcados. */
  value: string[];
  /** Recibe la nueva lista de valores marcados (en el orden de `options`). */
  onChange: (value: string[]) => void;
  /** name de cada casilla (formularios nativos: se envía una vez por valor marcado). */
  name?: string;
  /** `vertical` (por defecto) o `horizontal` (se ajusta a la siguiente línea). */
  orientation?: "vertical" | "horizontal";
  /** Columnas en pantallas desde 640px (en móvil siempre 1). Ignora `orientation`. */
  columns?: 2 | 3 | 4;
  /** Tamaño de las casillas. */
  size?: "sm" | "md" | "lg";
  /** Color de las casillas marcadas. */
  variant?: "default" | "primary" | "success" | "warning" | "danger";
  /** Deshabilita todo el grupo. */
  disabled?: boolean;
  /** Marca el grupo como obligatorio (muestra *); la validación "al menos uno" va en `error`. */
  required?: boolean;
  /** Texto de ayuda bajo el título. */
  hint?: string;
  /** Mensaje de error del grupo. */
  error?: string;
  /**
   * Agrega una casilla "Seleccionar todos" (queda indeterminada si hay algunas marcadas).
   * `true` usa el texto por defecto; un texto lo reemplaza.
   */
  selectAll?: boolean | string;
  /** Máximo de opciones marcadas: al llegar, las demás se deshabilitan. */
  maxSelected?: number;
  /** Ocultar el título visualmente (sigue disponible para lectores de pantalla). */
  hideLabel?: boolean;
  /** Clase extra del contenedor. */
  className?: string;
  /** id del fieldset; si no se pasa se genera uno. */
  id?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");

/**
 * Grupo de casillas con título (`fieldset`/`legend`), ayuda y error: para elegir varias
 * opciones de una lista corta (permisos, días, especialidades).
 */
export default function CheckboxGroup({
  label,
  options,
  value,
  onChange,
  name,
  orientation = "vertical",
  columns,
  size = "md",
  variant = "primary",
  disabled = false,
  required = false,
  hint,
  error,
  selectAll = false,
  maxSelected,
  hideLabel = false,
  className,
  id,
}: CheckboxGroupProps) {
  const generado = React.useId();
  const baseId = id ?? `checkbox-group-${generado}`;
  const hintId = `${baseId}-ayuda`;
  const errorId = `${baseId}-error`;
  const describedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(" ") || undefined;

  const marcados = new Set(value);
  const habilitadas = options.filter((o) => !o.disabled);
  const lleno = maxSelected !== undefined && marcados.size >= maxSelected;

  const cambiar = (valor: string, marcar: boolean) => {
    const siguiente = new Set(marcados);
    if (marcar) siguiente.add(valor);
    else siguiente.delete(valor);
    // Orden estable: el de las opciones; se conservan valores que no estén en options.
    const enOpciones = options
      .map((o) => o.value)
      .filter((v) => siguiente.has(v));
    const otros = value.filter(
      (v) => siguiente.has(v) && !options.some((o) => o.value === v),
    );
    onChange([...enOpciones, ...otros]);
  };

  const todasMarcadas =
    habilitadas.length > 0 && habilitadas.every((o) => marcados.has(o.value));
  const algunaMarcada = habilitadas.some((o) => marcados.has(o.value));
  const alternarTodas = (marcar: boolean) => {
    const habilitadasSet = new Set(habilitadas.map((o) => o.value));
    const conservar = value.filter((v) => !habilitadasSet.has(v));
    let nuevas = marcar ? habilitadas.map((o) => o.value) : [];
    if (marcar && maxSelected !== undefined)
      nuevas = nuevas.slice(0, Math.max(0, maxSelected - conservar.length));
    const resultado = new Set([...conservar, ...nuevas]);
    onChange([
      ...options.map((o) => o.value).filter((v) => resultado.has(v)),
      ...conservar.filter((v) => !options.some((o) => o.value === v)),
    ]);
  };

  return (
    <fieldset
      id={baseId}
      className={cx(styles.fieldset, className)}
      disabled={disabled}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
    >
      <legend className={cx(styles.legend, hideLabel && styles.srOnly)}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </legend>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {selectAll && (
        <div className={styles.selectAll}>
          <CheckboxInput
            label={
              typeof selectAll === "string" ? selectAll : "Seleccionar todos"
            }
            checked={todasMarcadas}
            indeterminate={algunaMarcada && !todasMarcadas}
            onChange={alternarTodas}
            size={size}
            variant={variant}
            disabled={disabled}
          />
        </div>
      )}
      <div
        className={cx(
          columns
            ? cx(styles.columns, styles[`cols${columns}`])
            : orientation === "horizontal"
              ? styles.horizontal
              : styles.vertical,
        )}
      >
        {options.map((o) => {
          const marcada = marcados.has(o.value);
          return (
            <CheckboxInput
              key={o.value}
              name={name}
              value={o.value}
              label={o.label}
              description={o.description}
              checked={marcada}
              onChange={(c) => cambiar(o.value, c)}
              disabled={disabled || o.disabled || (lleno && !marcada)}
              size={size}
              variant={variant}
            />
          );
        })}
      </div>
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
