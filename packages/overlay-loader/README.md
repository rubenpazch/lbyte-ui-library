# @rubenpazch/overlay-loader

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

OverlayLoader (pantalla completa, controlado por visible) e InlineLoader (dentro de un contenedor).

- **Usar cuando:** Carga inicial de la app, inicio/cierre de sesión u operaciones que bloquean la pantalla.
- **Evitar cuando:** Esperas pequeñas dentro de un elemento: usa LoadingSpinner.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/overlay-loader
```

## OverlayLoader

Presentational full-screen loading overlay. It is fully controlled: the
consumer decides when it is `visible` and which `message` it shows, so the
same component can express every loading state (boot, sign-in, sign-out,…).
It keeps no state and performs no side effects — the fade in/out is CSS only.

| Prop           | Tipo                                 | Req. | Por defecto | Descripción                                                                               |
| -------------- | ------------------------------------ | ---- | ----------- | ----------------------------------------------------------------------------------------- |
| `visible`      | `boolean`                            | sí   |             | Whether the overlay is shown. When false it fades out and stops capturing pointer events. |
| `className`    | `string`                             |      |             | Extra class applied to the root overlay element.                                          |
| `message`      | `string`                             |      |             | Primary line describing what is happening (e.g. "Estamos cargando la aplicación").        |
| `spinnerLabel` | `string`                             |      |             | Accessible label for the spinner (screen readers). Defaults to the message or "Cargando". |
| `title`        | `string`                             |      |             | Optional emphasized heading rendered above the message.                                   |
| `variant`      | `"default" \| "success" \| "danger"` |      | `default`   | Tone for the spinner accent.                                                              |

## InlineLoader

Contained, non-blocking loading indicator. Unlike `OverlayLoader` it flows
inside its parent (no fixed positioning), so it can fill just a content
region — e.g. the microfrontend slot while its bundle mounts — without
covering the rest of the shell (the sidebar stays interactive).

| Prop           | Tipo                                 | Req. | Por defecto | Descripción                                                                                                                                                                                                   |
| -------------- | ------------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `className`    | `string`                             |      |             | Extra class applied to the root element.                                                                                                                                                                      |
| `fill`         | `boolean`                            |      | `false`     | Stretch to fill the available width and height of the parent and center its content, instead of rendering as a compact inline card. Use it when the loader owns a whole region (e.g. a route's content slot). |
| `message`      | `string`                             |      |             | Optional line describing what is loading (e.g. "Cargando módulo…").                                                                                                                                           |
| `spinnerLabel` | `string`                             |      |             | Accessible label for the spinner. Defaults to the message or "Cargando".                                                                                                                                      |
| `variant`      | `"default" \| "success" \| "danger"` |      | `default`   | Tone for the spinner accent.                                                                                                                                                                                  |

Tipos: `OverlayLoaderProps`, `OverlayLoaderVariant`, `InlineLoaderProps`, `InlineLoaderVariant`.

<!-- catalogo:fin -->
