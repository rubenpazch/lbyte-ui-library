# @rubenpazch/page-header

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Cabecera de página: migas de pan, volver, título h1, subtítulo, acciones y contenido extra (filtros); acepta el Link de Next.js.

- **Usar cuando:** Arriba de cada página del panel, dentro de AppShell.
- **Evitar cuando:** Títulos de secciones dentro de una página: usa un h2 o CardHeader.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/page-header
```

## PageHeader

Cabecera de página: migas, volver, título h1, subtítulo y acciones.

| Prop            | Tipo                                                                                                | Req. | Por defecto | Descripción                                                     |
| --------------- | --------------------------------------------------------------------------------------------------- | ---- | ----------- | --------------------------------------------------------------- |
| `title`         | `ReactNode`                                                                                         | sí   |             | Título de la página (se renderiza como h1).                     |
| `actions`       | `ReactNode`                                                                                         |      |             | Acciones a la derecha (botones). En móvil pasan abajo.          |
| `back`          | `{ label?: string \| undefined; href?: string \| undefined; onClick?: (() => void) \| undefined; }` |      |             | Enlace o acción "Volver".                                       |
| `breadcrumbs`   | `Breadcrumb[]`                                                                                      |      |             | Migas de pan: Inicio / Convocatorias / Editar.                  |
| `children`      | `ReactNode`                                                                                         |      |             | Contenido extra bajo el título (filtros, pestañas).             |
| `className`     | `string`                                                                                            |      |             | Clase extra.                                                    |
| `linkComponent` | `ElementType<any, keyof IntrinsicElements>`                                                         |      | `a`         | Componente de enlace (p. ej. Link de Next.js). Por defecto <a>. |
| `subtitle`      | `ReactNode`                                                                                         |      |             | Texto secundario bajo el título.                                |

Tipos: `PageHeaderProps`, `Breadcrumb`.

<!-- catalogo:fin -->
