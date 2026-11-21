# @rubenpazch/tooltip

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Texto de ayuda breve al pasar el mouse o enfocar con teclado (role="tooltip", aria-describedby), se cierra con Escape.

- **Usar cuando:** Explicar un botón de solo icono o un dato abreviado.
- **Evitar cuando:** Información importante o acciones: muéstrala en la página o usa Menu/Modal. En móvil no hay hover: no ocultes ahí lo esencial.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/tooltip
```

## Tooltip

Texto de ayuda al pasar el mouse o enfocar con el teclado; se cierra con Escape. Se asocia al
elemento con aria-describedby. No pongas acciones dentro: usa Menu o Modal.

| Prop        | Tipo                                                          | Req. | Por defecto | Descripción                                                                        |
| ----------- | ------------------------------------------------------------- | ---- | ----------- | ---------------------------------------------------------------------------------- |
| `children`  | `ReactElement<unknown, string \| JSXElementConstructor<any>>` | sí   |             | Elemento que lo dispara (un botón, un icono con foco). Debe aceptar ref y eventos. |
| `content`   | `ReactNode`                                                   | sí   |             | Texto del tooltip (breve, sin elementos interactivos).                             |
| `delay`     | `number`                                                      |      | `300`       | Espera en ms antes de mostrarse al pasar el mouse (por defecto 300).               |
| `placement` | `"top" \| "bottom" \| "left" \| "right"`                      |      | `top`       | Posición: top (por defecto), bottom, left o right.                                 |

Tipos: `TooltipProps`.

<!-- catalogo:fin -->
