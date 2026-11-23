# @rubenpazch/collapsible

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Sección plegable con título: deja lo opcional oculto para acortar formularios y páginas.

- **Usar cuando:** Campos opcionales o avanzados de un formulario ("Más opciones"), detalles que no todos necesitan ver.
- **Evitar cuando:** Secciones del mismo nivel entre las que se elige una: usa Tabs. Información que no debe ocultarse: muéstrala directamente.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/collapsible
```

## Collapsible

Sección plegable (`<details>`): deja lo opcional oculto para que un formulario o una página
sean cortos en el celular. Funciona sin JavaScript y con teclado.

| Prop           | Tipo                      | Req. | Por defecto | Descripción                                                         |
| -------------- | ------------------------- | ---- | ----------- | ------------------------------------------------------------------- |
| `children`     | `ReactNode`               | sí   |             | Contenido plegable.                                                 |
| `title`        | `ReactNode`               | sí   |             | Texto del encabezado que abre y cierra la sección ("Más opciones"). |
| `className`    | `string`                  |      |             | Clase extra para márgenes o posición.                               |
| `defaultOpen`  | `boolean`                 |      | `false`     | Abierta al montar (por defecto cerrada).                            |
| `onOpenChange` | `(open: boolean) => void` |      |             | Se llama al abrir o cerrar.                                         |

Tipos: `CollapsibleProps`.

<!-- catalogo:fin -->
