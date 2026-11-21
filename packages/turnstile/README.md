# @rubenpazch/turnstile

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Widget de Cloudflare Turnstile (anti-robots) para formularios públicos: carga el script una sola vez, entrega el token y se reinicia tras cada envío.

- **Usar cuando:** Login, registro, recuperación o cualquier formulario público que la API protege con Turnstile.
- **Evitar cuando:** Pantallas detrás de la sesión (el usuario ya está autenticado).

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/turnstile
```

## Turnstile

Verificación anti-robots de Cloudflare Turnstile para formularios públicos.
Requiere que la CSP permita `https://challenges.cloudflare.com` en script-src y frame-src.

| Prop        | Tipo                                  | Req. | Por defecto                                                                                                       | Descripción                                                                                                                                 |
| ----------- | ------------------------------------- | ---- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `onToken`   | `(token: string) => void`             | sí   |                                                                                                                   | Recibe el token, o "" cuando caduca o falla (deshabilita el envío mientras sea ""). El token se valida en el servidor y sirve una sola vez. |
| `siteKey`   | `string`                              | sí   |                                                                                                                   | Clave pública del sitio (NEXT_PUBLIC_TURNSTILE_SITE_KEY o la que entregue la API).                                                          |
| `action`    | `string`                              |      |                                                                                                                   | Acción del formulario ("login", "registro"…): el servidor puede exigir que coincida.                                                        |
| `className` | `string`                              |      |                                                                                                                   |                                                                                                                                             |
| `errorText` | `string`                              |      | `No se pudo cargar la verificación anti-robots. Revisa tu conexión o desactiva bloqueadores y recarga la página.` | Mensaje si el widget no carga (red, bloqueadores).                                                                                          |
| `language`  | `string`                              |      | `es`                                                                                                              |                                                                                                                                             |
| `resetKey`  | `number`                              |      | `0`                                                                                                               | Cambia este número después de cada envío para pedir un token nuevo.                                                                         |
| `size`      | `"normal" \| "flexible" \| "compact"` |      | `flexible`                                                                                                        |                                                                                                                                             |
| `theme`     | `"auto" \| "light" \| "dark"`         |      | `auto`                                                                                                            |                                                                                                                                             |

## TURNSTILE_SCRIPT

_Sin props documentadas._

Otras exportaciones: `cargarTurnstile`.

Tipos: `TurnstileProps`.

<!-- catalogo:fin -->
