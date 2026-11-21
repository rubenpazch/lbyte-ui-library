import React, { useEffect, useRef, useState } from "react";
import styles from "./AuthGate.module.css";

type Fase<T> =
  | { tipo: "comprobando" }
  | { tipo: "lista"; datos: T }
  | { tipo: "saliendo"; motivo: "sin-sesion" | "vencida" };

export interface AuthGateLabels {
  /** Mientras se confirma la sesión con el servidor. */
  verifying: string;
  /** Sin sesión, mientras se va al login. */
  redirecting: string;
  /** La sesión venció a mitad de uso (evento de cierre). */
  expired: string;
}

export interface AuthGateProps<T> {
  /**
   * Comprobación local inmediata (sin red): ¿hay token o cookie de sesión y no está vencido?
   * Si devuelve false se va al login sin pintar nada de la app.
   */
  hasSession: () => boolean;
  /** Confirma la sesión con el servidor (p. ej. `GET /me`). Si rechaza, se va al login. */
  verify: () => Promise<T>;
  /** Ir al login (p. ej. `window.location.href = AUTH_URL`). */
  onUnauthenticated: () => void;
  /** La app; recibe lo que devolvió `verify` (usuario, permisos…). */
  children: React.ReactNode | ((datos: T) => React.ReactNode);
  /**
   * Evento global que indica que la sesión terminó (un 401 a mitad de uso). Al recibirlo se oculta
   * la app tras la pantalla neutra y se va al login. Por defecto "auth:logout".
   */
  logoutEvent?: string | false;
  /** Marca de la organización sobre el texto (logo o nombre). */
  brand?: React.ReactNode;
  /** Textos; por defecto en español. */
  labels?: Partial<AuthGateLabels>;
}

const LABELS: AuthGateLabels = {
  verifying: "Verificando sesión…",
  redirecting: "Redirigiendo al inicio de sesión…",
  expired: "Tu sesión terminó. Redirigiendo al inicio de sesión…",
};

/** Pantalla neutra a pantalla completa: sin datos ni estructura de la app. */
export function AuthScreen({
  brand,
  label,
}: {
  brand?: React.ReactNode;
  label: string;
}) {
  return (
    <div
      className={styles.screen}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {brand && <div className={styles.brand}>{brand}</div>}
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.label}>{label}</p>
    </div>
  );
}

/**
 * Puerta de sesión para la raíz de toda app con sesión (decisión 0006 de lbyte-contexto):
 * 1. sin token → al login sin pintar nada de la app;
 * 2. con token → pantalla neutra mientras `verify()` (/me) confirma;
 * 3. confirmada → pinta la app; rechazada → al login.
 * Un 401 posterior (`logoutEvent`) oculta la app y va al login.
 *
 * Es experiencia de usuario, no seguridad: la API sigue respondiendo 401.
 */
export default function AuthGate<T = unknown>({
  hasSession,
  verify,
  onUnauthenticated,
  children,
  logoutEvent = "auth:logout",
  brand,
  labels,
}: AuthGateProps<T>) {
  const text = { ...LABELS, ...labels };
  const [fase, setFase] = useState<Fase<T>>({ tipo: "comprobando" });
  // Las funciones de la app pueden cambiar en cada render: la comprobación corre una sola vez.
  const fns = useRef({ hasSession, verify, onUnauthenticated });
  useEffect(() => {
    fns.current = { hasSession, verify, onUnauthenticated };
  });

  useEffect(() => {
    let vigente = true;
    if (!fns.current.hasSession()) {
      setFase({ tipo: "saliendo", motivo: "sin-sesion" });
      fns.current.onUnauthenticated();
      return;
    }
    fns.current
      .verify()
      .then((datos) => vigente && setFase({ tipo: "lista", datos }))
      .catch(() => {
        if (!vigente) return;
        setFase({ tipo: "saliendo", motivo: "sin-sesion" });
        fns.current.onUnauthenticated();
      });
    return () => {
      vigente = false;
    };
  }, []);

  useEffect(() => {
    if (!logoutEvent) return;
    const alTerminar = () => {
      setFase({ tipo: "saliendo", motivo: "vencida" });
      fns.current.onUnauthenticated();
    };
    window.addEventListener(logoutEvent, alTerminar);
    return () => window.removeEventListener(logoutEvent, alTerminar);
  }, [logoutEvent]);

  if (fase.tipo === "lista") {
    return (
      <>
        {typeof children === "function"
          ? (children as (d: T) => React.ReactNode)(fase.datos)
          : children}
      </>
    );
  }
  const label =
    fase.tipo === "comprobando"
      ? text.verifying
      : fase.motivo === "vencida"
        ? text.expired
        : text.redirecting;
  return <AuthScreen brand={brand} label={label} />;
}
