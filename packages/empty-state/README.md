# @rubenpazch/empty-state

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Estado vacío con icono, título, descripción y acciones ("No hay convocatorias · Crear").

- **Usar cuando:** Listas, tablas o búsquedas sin resultados; primera vez que se usa una sección.
- **Evitar cuando:** Errores de carga: usa Alert variant="danger".

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/empty-state
```

## EmptyState

Estado vacío: lo que se muestra cuando una lista o búsqueda no tiene resultados.

| Prop              | Tipo           | Req. | Por defecto | Descripción                                                             |
| ----------------- | -------------- | ---- | ----------- | ----------------------------------------------------------------------- |
| `title`           | `ReactNode`    | sí   |             | Título: "No hay convocatorias".                                         |
| `action`          | `ReactNode`    |      |             | Acción principal: normalmente un Button "Crear…".                       |
| `className`       | `string`       |      |             | Clase extra.                                                            |
| `description`     | `ReactNode`    |      |             | Explicación o siguiente paso.                                           |
| `icon`            | `ReactNode`    |      |             | Icono o ilustración (por defecto una bandeja vacía). `false` lo oculta. |
| `secondaryAction` | `ReactNode`    |      |             | Acción secundaria (enlace o botón de texto).                            |
| `size`            | `"sm" \| "md"` |      | `md`        | sm para dentro de tablas o tarjetas; md (por defecto) para una página.  |

Tipos: `EmptyStateProps`.

<!-- catalogo:fin -->
