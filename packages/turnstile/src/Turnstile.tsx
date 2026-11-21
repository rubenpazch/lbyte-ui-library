import { useEffect, useRef, useState } from "react";
import styles from "./Turnstile.module.css";

interface TurnstileRenderOptions {
  sitekey: string;
  action?: string;
  language?: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "flexible" | "compact";
  callback: (token: string) => void;
  "expired-callback": () => void;
  "error-callback": () => void;
}

interface TurnstileApi {
  render: (element: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widget: string) => void;
  remove: (widget: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SCRIPT =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let cargando: Promise<void> | null = null;

/** Carga el script de Turnstile una sola vez por página (varios widgets lo comparten). */
export function cargarTurnstile(src = TURNSTILE_SCRIPT): Promise<void> {
  if (typeof window === "undefined")
    return Promise.reject(new Error("turnstile: sin navegador"));
  if (window.turnstile) return Promise.resolve();
  cargando ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      cargando = null; // permite reintentar
      script.remove();
      reject(new Error("turnstile: no se pudo cargar"));
    };
    document.head.appendChild(script);
  });
  return cargando;
}

/** Solo para pruebas: olvida la carga en curso. */
export function _reiniciarCargaTurnstile(): void {
  cargando = null;
}

export interface TurnstileProps {
  /** Clave pública del sitio (NEXT_PUBLIC_TURNSTILE_SITE_KEY o la que entregue la API). */
  siteKey: string;
  /**
   * Recibe el token, o "" cuando caduca o falla (deshabilita el envío mientras sea "").
   * El token se valida en el servidor y sirve una sola vez.
   */
  onToken: (token: string) => void;
  /** Acción del formulario ("login", "registro"…): el servidor puede exigir que coincida. */
  action?: string;
  /** Cambia este número después de cada envío para pedir un token nuevo. */
  resetKey?: number;
  language?: string;
  theme?: "auto" | "light" | "dark";
  size?: "normal" | "flexible" | "compact";
  /** Mensaje si el widget no carga (red, bloqueadores). */
  errorText?: string;
  className?: string;
}

/**
 * Verificación anti-robots de Cloudflare Turnstile para formularios públicos.
 * Requiere que la CSP permita `https://challenges.cloudflare.com` en script-src y frame-src.
 */
export default function Turnstile({
  siteKey,
  onToken,
  action,
  resetKey = 0,
  language = "es",
  theme = "auto",
  size = "flexible",
  errorText = "No se pudo cargar la verificación anti-robots. Revisa tu conexión o desactiva bloqueadores y recarga la página.",
  className,
}: TurnstileProps) {
  const contenedor = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const callback = useRef(onToken);
  const [fallo, setFallo] = useState(false);

  useEffect(() => {
    callback.current = onToken;
  }, [onToken]);

  useEffect(() => {
    let activo = true;
    cargarTurnstile()
      .then(() => {
        if (!activo || !contenedor.current || !window.turnstile) return;
        widget.current = window.turnstile.render(contenedor.current, {
          sitekey: siteKey,
          action,
          language,
          theme,
          size,
          callback: (token) => {
            setFallo(false);
            callback.current(token);
          },
          "expired-callback": () => callback.current(""),
          "error-callback": () => {
            setFallo(true);
            callback.current("");
          },
        });
      })
      .catch(() => {
        if (activo) setFallo(true);
      });
    return () => {
      activo = false;
      if (widget.current) window.turnstile?.remove(widget.current);
      widget.current = null;
    };
  }, [siteKey, action, language, theme, size]);

  useEffect(() => {
    if (resetKey > 0 && widget.current) {
      callback.current("");
      window.turnstile?.reset(widget.current);
    }
  }, [resetKey]);

  return (
    <div className={[styles.turnstile, className].filter(Boolean).join(" ")}>
      <div ref={contenedor} data-testid="turnstile-widget" />
      {fallo && (
        <p className={styles.error} role="alert">
          {errorText}
        </p>
      )}
    </div>
  );
}
