---
"@rubenpazch/toast": minor
"@rubenpazch/app-shell": minor
"@rubenpazch/ui": minor
---

- `ToastProvider` + `useToast()` (`toast.exito`, `error`, `aviso`, `info`): mensajes del servidor dentro de la app como toast bajo la cabecera. Fuera de un proveedor, `useToast()` lanza un error claro (en pantallas públicas el mensaje va en el formulario).
- `AppShell` incluye `ToastProvider` (prop `toasts={false}` para desactivarlo).
- Toast: `role="status"` para éxito/info y `role="alert"` para error/aviso (antes todos `alert`).
- AGENTS.md: regla de **Mensajes** para todas las apps y valores por defecto de `Button` y `TextInput`.
- `ToastRegion` y `placement="inline"`: `AppShell` muestra los toasts en su bloque fijo bajo la cabecera, solo en la columna del contenido (no tapan el menú ni el contenido; lo empujan).
