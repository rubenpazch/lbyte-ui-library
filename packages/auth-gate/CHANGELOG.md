# @rubenpazch/auth-gate

## 0.1.1

### Patch Changes

- Updated dependencies [f747c04]
  - @rubenpazch/shared@5.3.0

## 0.1.0

### Minor Changes

- c0d9260: Decisión 0006 (sesión y transiciones):

  - Nuevo `AuthGate`: puerta de sesión para la raíz de las apps. Sin token va al login sin pintar nada; con token muestra una pantalla neutra mientras `verify()` (/me) confirma; un 401 posterior (`auth:logout`) oculta la app y va al login.
  - `AppShell`: prop `loading` (y `loadingLabel`) que muestra la carga solo en el contenido al cambiar de pantalla; el menú y la cabecera no cambian.
