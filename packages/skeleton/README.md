# @rubenpazch/skeleton

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Marcador de carga (texto, bloque o círculo) con la forma del contenido; respeta reducir movimiento.

- **Usar cuando:** Mientras cargan tarjetas, filas o perfiles, para que la página no salte al llegar los datos.
- **Evitar cuando:** Operaciones que bloquean la pantalla: usa OverlayLoader. Esperas dentro de un botón: usa LoadingSpinner.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/skeleton
```

## Skeleton

Marcador de carga con la forma del contenido. Es decorativo (aria-hidden): anuncia la carga
en el contenedor con aria-busy o un texto oculto.

| Prop        | Tipo                           | Req. | Por defecto | Descripción                                                                          |
| ----------- | ------------------------------ | ---- | ----------- | ------------------------------------------------------------------------------------ |
| `className` | `string`                       |      |             | Clase extra.                                                                         |
| `height`    | `string \| number`             |      |             | Alto (número = px o valor CSS). Por defecto según la variante.                       |
| `lines`     | `number`                       |      | `1`         | Con variant="text": cuántas líneas (la última más corta).                            |
| `variant`   | `"text" \| "rect" \| "circle"` |      | `text`      | text (línea de texto, por defecto), rect (bloque) o circle (avatar).                 |
| `width`     | `string \| number`             |      |             | Ancho (número = px o cualquier valor CSS). Por defecto 100% (circle: igual al alto). |

Tipos: `SkeletonProps`.

<!-- catalogo:fin -->
