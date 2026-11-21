import { useId, useRef, useState } from "react";
import { DocumentIcon, TrashIcon, UploadIcon } from "@rubenpazch/icons";
import styles from "./FileUpload.module.css";

export interface FileRejection {
  file: File;
  /** Motivo legible, ya en español. */
  reason: string;
}

export interface FileUploadLabels {
  /** Texto principal de la zona. */
  drop: string;
  /** Botón para elegir archivos. */
  choose: string;
  /** Cuando se arrastra encima. */
  dropActive: string;
  /** "Quitar {name}". */
  remove: string;
  /** "{name}: tipo no permitido". */
  invalidType: string;
  /** "{name}: pesa {size} MB (máximo {max} MB)". */
  tooLarge: string;
  /** "Máximo {max} archivos". */
  tooMany: string;
  /** "{name}: ya está en la lista". */
  duplicate: string;
}

export const DEFAULT_FILE_UPLOAD_LABELS: FileUploadLabels = {
  drop: "Arrastra los archivos aquí",
  choose: "Elegir archivos",
  dropActive: "Suelta para agregarlos",
  remove: "Quitar {name}",
  invalidType: "{name}: tipo de archivo no permitido",
  tooLarge: "{name}: pesa {size} MB (máximo {max} MB)",
  tooMany: "Máximo {max} archivos",
  duplicate: "{name}: ya está en la lista",
};

export interface FileUploadProps {
  /** Archivos elegidos (controlado). */
  value: File[];
  /** Nueva lista de archivos (agregados o quitados). */
  onChange: (files: File[]) => void;
  /** Archivos que no se aceptaron y por qué (para avisar o registrar). */
  onReject?: (rejections: FileRejection[]) => void;
  label?: string;
  hint?: string;
  /** Error externo (validación del formulario). */
  error?: string;
  /** Tipos aceptados como en `<input accept>`: ".pdf,.docx", "image/*", "application/pdf". */
  accept?: string;
  /** Máximo de archivos (por defecto sin límite). */
  maxFiles?: number;
  /** Tamaño máximo por archivo en MB. */
  maxSizeMB?: number;
  /** Permitir varios archivos (por defecto sí). */
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  labels?: Partial<FileUploadLabels>;
  className?: string;
}

const cx = (...c: Array<string | false | undefined>) =>
  c.filter(Boolean).join(" ");
const formato = (t: string, v: Record<string, string | number>) =>
  t.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const mb = (bytes: number) =>
  (bytes / (1024 * 1024)).toFixed(bytes < 1024 * 1024 ? 2 : 1);

/** ¿El archivo cumple `accept`? (extensiones, tipos MIME exactos o con comodín). */
export function aceptaArchivo(file: File, accept?: string): boolean {
  if (!accept) return true;
  const nombre = file.name.toLowerCase();
  const tipo = (file.type || "").toLowerCase();
  return accept
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .some((regla) =>
      regla.startsWith(".")
        ? nombre.endsWith(regla)
        : regla.endsWith("/*")
          ? tipo.startsWith(regla.slice(0, -1))
          : tipo === regla,
    );
}

const clave = (f: File) => `${f.name}|${f.size}|${f.lastModified}`;

/**
 * Zona para subir uno o varios archivos: arrastrar y soltar o "Elegir archivos" (teclado).
 * Valida tipo, tamaño, cantidad y duplicados; los rechazados se informan en la zona y por `onReject`.
 * No sube nada: entrega los `File` a la app, que decide cuándo y cómo enviarlos.
 */
export default function FileUpload({
  value,
  onChange,
  onReject,
  label,
  hint,
  error,
  accept,
  maxFiles,
  maxSizeMB,
  multiple = true,
  disabled = false,
  required = false,
  id,
  name,
  labels: labelsProp,
  className,
}: FileUploadProps) {
  const t = { ...DEFAULT_FILE_UPLOAD_LABELS, ...labelsProp };
  const generado = useId();
  const inputId = id ?? generado;
  const hintId = `${inputId}-ayuda`;
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [rechazos, setRechazos] = useState<string[]>([]);

  const limite = multiple ? maxFiles : 1;

  function agregar(lista: FileList | File[]) {
    const entrantes = Array.from(lista);
    const aceptados: File[] = [];
    const rechazados: FileRejection[] = [];
    const existentes = new Set(value.map(clave));
    for (const file of entrantes) {
      if (!aceptaArchivo(file, accept)) {
        rechazados.push({
          file,
          reason: formato(t.invalidType, { name: file.name }),
        });
      } else if (
        maxSizeMB !== undefined &&
        file.size > maxSizeMB * 1024 * 1024
      ) {
        rechazados.push({
          file,
          reason: formato(t.tooLarge, {
            name: file.name,
            size: mb(file.size),
            max: maxSizeMB,
          }),
        });
      } else if (existentes.has(clave(file))) {
        rechazados.push({
          file,
          reason: formato(t.duplicate, { name: file.name }),
        });
      } else {
        aceptados.push(file);
        existentes.add(clave(file));
      }
    }
    let nueva = multiple ? [...value, ...aceptados] : aceptados.slice(-1);
    if (limite !== undefined && nueva.length > limite) {
      for (const file of nueva.slice(limite))
        rechazados.push({ file, reason: formato(t.tooMany, { max: limite }) });
      nueva = nueva.slice(0, limite);
    }
    setRechazos([...new Set(rechazados.map((r) => r.reason))]);
    if (rechazados.length) onReject?.(rechazados);
    if (aceptados.length) onChange(nueva);
  }

  function quitar(i: number) {
    onChange(value.filter((_, j) => j !== i));
    setRechazos([]);
    inputRef.current?.focus();
  }

  const lleno = limite !== undefined && value.length >= limite && multiple;
  const describedBy =
    [hint && hintId, (error || rechazos.length > 0) && errorId]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <div className={cx(styles.field, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </label>
      )}

      <div
        className={cx(
          styles.zone,
          arrastrando && styles.active,
          disabled && styles.disabled,
          (error || rechazos.length > 0) && styles.invalid,
        )}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
          setArrastrando(true);
        }}
        onDragLeave={() => setArrastrando(false)}
        onDrop={(e) => {
          e.preventDefault();
          setArrastrando(false);
          if (!disabled && !lleno) agregar(e.dataTransfer.files);
        }}
        data-testid="file-upload-zone"
      >
        <UploadIcon size="lg" className={styles.icon} />
        <p className={styles.text}>{arrastrando ? t.dropActive : t.drop}</p>
        <button
          type="button"
          className={styles.choose}
          onClick={() => inputRef.current?.click()}
          disabled={disabled || lleno}
        >
          {t.choose}
        </button>
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="file"
          className={styles.input}
          accept={accept}
          multiple={multiple}
          disabled={disabled || lleno}
          required={required && value.length === 0}
          aria-invalid={error || rechazos.length > 0 ? true : undefined}
          aria-describedby={describedBy}
          onChange={(e) => {
            if (e.target.files) agregar(e.target.files);
            e.target.value = ""; // permite volver a elegir el mismo archivo
          }}
        />
      </div>

      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {(error || rechazos.length > 0) && (
        <div id={errorId} className={styles.error} role="alert">
          {error && <p>{error}</p>}
          {rechazos.map((r) => (
            <p key={r}>{r}</p>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <ul
          className={styles.list}
          aria-label={
            label ? `${label}: archivos elegidos` : "Archivos elegidos"
          }
        >
          {value.map((file, i) => (
            <li key={clave(file)} className={styles.file}>
              <DocumentIcon size="sm" className={styles.fileIcon} />
              <span className={styles.fileName} title={file.name}>
                {file.name}
              </span>
              <span className={styles.fileSize}>{mb(file.size)} MB</span>
              <button
                type="button"
                className={styles.remove}
                onClick={() => quitar(i)}
                disabled={disabled}
                aria-label={formato(t.remove, { name: file.name })}
              >
                <TrashIcon size="sm" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
