import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ToastBanner,
  type ToastAction,
  type ToastItem,
  type ToastType,
} from "./Toast";
import styles from "./Toast.module.css";

export interface ToastOptions {
  /** Título opcional en negrita. */
  title?: string;
  /** Milisegundos hasta cerrarse solo (0 = no se cierra solo). Por defecto según el tipo. */
  duration?: number;
  /** Botón de acción (p. ej. "Deshacer"). */
  action?: ToastAction;
}

export interface ToastApi {
  /** Resultado correcto de una acción ("Usuario guardado"). */
  exito: (mensaje: string, opciones?: ToastOptions) => string;
  /** Error devuelto por el servidor o de red. */
  error: (mensaje: string, opciones?: ToastOptions) => string;
  /** Algo salió, pero con un detalle a revisar. */
  aviso: (mensaje: string, opciones?: ToastOptions) => string;
  /** Información neutra. */
  info: (mensaje: string, opciones?: ToastOptions) => string;
  /** Forma general; devuelve el id del toast. */
  mostrar: (
    toast: { type: ToastType; message: string } & ToastOptions,
  ) => string;
  /** Cierra un toast por id. */
  cerrar: (id: string) => void;
}

/** Duración por defecto: los errores se quedan más tiempo para poder leerlos. */
const DURACION: Record<ToastType, number> = {
  success: 4000,
  info: 5000,
  default: 5000,
  warning: 6000,
  error: 8000,
};
/** Máximo de toasts visibles a la vez (los más antiguos se descartan). */
const MAXIMO = 3;

const Contexto = createContext<ToastApi | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Distancia desde arriba (por defecto deja libre la cabecera de AppShell). */
  offsetTop?: string;
  /** Texto accesible del botón ×. */
  closeAriaLabel?: string;
}

/**
 * Mensajes del servidor dentro de la app (usuario con sesión): toasts arriba a la derecha,
 * bajo la cabecera. `AppShell` ya lo incluye; úsalo directamente solo en un layout propio.
 *
 * En pantallas públicas (login, registro, recuperación) NO se usa: ahí el mensaje va junto al
 * formulario. Por eso `useToast()` falla fuera de un proveedor.
 */
export function ToastProvider({
  children,
  offsetTop,
  closeAriaLabel = "Cerrar mensaje",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const siguiente = useRef(0);

  const cerrar = useCallback(
    (id: string) => setToasts((t) => t.filter((x) => x.id !== id)),
    [],
  );

  const mostrar = useCallback<ToastApi["mostrar"]>(
    ({ type, message, title, duration, action }) => {
      const id = `toast-${++siguiente.current}`;
      setToasts((t) => [
        // El mismo mensaje no se apila (doble clic, reintentos).
        ...t
          .filter((x) => !(x.message === message && x.type === type))
          .slice(-(MAXIMO - 1)),
        {
          id,
          type,
          message,
          title,
          action,
          duration: duration ?? DURACION[type],
        },
      ]);
      return id;
    },
    [],
  );

  const api = useMemo<ToastApi>(
    () => ({
      mostrar,
      cerrar,
      exito: (message, o) => mostrar({ type: "success", message, ...o }),
      error: (message, o) => mostrar({ type: "error", message, ...o }),
      aviso: (message, o) => mostrar({ type: "warning", message, ...o }),
      info: (message, o) => mostrar({ type: "info", message, ...o }),
    }),
    [mostrar, cerrar],
  );

  return (
    <Contexto.Provider value={api}>
      {children}
      <div
        className={styles.region}
        style={
          offsetTop
            ? ({ "--lb-toast-offset-top": offsetTop } as React.CSSProperties)
            : undefined
        }
      >
        <ToastBanner
          toasts={toasts}
          onClose={cerrar}
          closeAriaLabel={closeAriaLabel}
        />
      </div>
    </Contexto.Provider>
  );
}

/**
 * `const toast = useToast(); toast.exito("Guardado"); toast.error(err.message);`
 * Solo dentro de la app (AppShell o ToastProvider). En el login usa un mensaje en el formulario.
 */
export function useToast(): ToastApi {
  const api = useContext(Contexto);
  if (!api) {
    throw new Error(
      "useToast() necesita <ToastProvider> (AppShell ya lo incluye). En pantallas públicas como el login, muestra el mensaje en el formulario en vez de un toast.",
    );
  }
  return api;
}
