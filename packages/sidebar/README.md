# @rubenpazch/sidebar

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Barra de navegación vertical: secciones, subniveles plegables, insignias y página activa (también subrutas); en escritorio se colapsa a iconos y lo recuerda (storageKey); en móvil es un cajón con foco retenido y Escape. Acepta el Link de Next.js.

- **Usar cuando:** Menú principal de un panel de administración. Normalmente a través de AppShell; úsala sola si ya tienes tu propia cabecera.
- **Evitar cuando:** Pestañas dentro de una página: usa Tabs. Acciones de un registro: usa Menu.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/sidebar
```

## Sidebar

Barra de navegación vertical: secciones, subniveles, insignias y estado activo. En escritorio
se colapsa a iconos (y lo recuerda); en móvil es un cajón con foco retenido y Escape.

| Prop                 | Tipo                                        | Req. | Por defecto | Descripción                                                                       |
| -------------------- | ------------------------------------------- | ---- | ----------- | --------------------------------------------------------------------------------- |
| `sections`           | `SidebarSection[]`                          | sí   |             | Secciones del menú.                                                               |
| `brand`              | `ReactNode`                                 |      |             | Logo o nombre de la app arriba.                                                   |
| `brandCollapsed`     | `ReactNode`                                 |      |             | Versión compacta del logo para el modo colapsado (por defecto se oculta `brand`). |
| `className`          | `string`                                    |      |             | Clase extra.                                                                      |
| `collapsed`          | `boolean`                                   |      |             | Colapsado (controlado).                                                           |
| `collapsible`        | `boolean`                                   |      | `true`      | Muestra el botón para colapsar (por defecto sí).                                  |
| `currentPath`        | `string`                                    |      |             | Ruta actual (p. ej. usePathname() de Next) para marcar la opción activa.          |
| `defaultCollapsed`   | `boolean`                                   |      | `false`     | Colapsado inicial (no controlado).                                                |
| `footer`             | `ReactNode`                                 |      |             | Contenido al pie: usuario, "Cerrar sesión".                                       |
| `labels`             | `Partial<SidebarLabels>`                    |      |             | Textos accesibles.                                                                |
| `linkComponent`      | `ElementType<any, keyof IntrinsicElements>` |      | `a`         | Componente de enlace (Link de Next.js). Por defecto <a>.                          |
| `mobileOpen`         | `boolean`                                   |      | `false`     | Abierto en móvil (lo controla el botón ☰ de AppShell o de tu cabecera).          |
| `onCollapsedChange`  | `(collapsed: boolean) => void`              |      |             | Al colapsar o expandir.                                                           |
| `onMobileOpenChange` | `(open: boolean) => void`                   |      |             | Al cerrar en móvil (Escape, fondo, elegir una opción).                            |
| `storageKey`         | `string`                                    |      |             | Clave de localStorage para recordar si estaba colapsado.                          |

Tipos: `SidebarProps`, `SidebarItem`, `SidebarSection`, `SidebarLabels`.

<!-- catalogo:fin -->
