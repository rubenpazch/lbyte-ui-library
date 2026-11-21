# @rubenpazch/app-shell

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Estructura completa de un panel: Sidebar colapsable, cabecera fija con botón ☰ en móvil, título y acciones, enlace "Saltar al contenido" y área principal con ancho máximo.

- **Usar cuando:** Layout raíz de toda app de administración (app/(panel)/layout.tsx en Next.js), con usePathname() como currentPath.
- **Evitar cuando:** Sitios públicos: arma tu propia cabecera. Solo necesitas el menú lateral: usa Sidebar.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/app-shell
```

## AppShell

Estructura de un panel: barra lateral (Sidebar), cabecera con ☰ en móvil y contenido.
Es la base de todas las pantallas de administración.

| Prop                | Tipo                                                    | Req. | Por defecto | Descripción                                                                                                                                                                                |
| ------------------- | ------------------------------------------------------- | ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`          | `ReactNode`                                             | sí   |             | Contenido de la página.                                                                                                                                                                    |
| `sections`          | `SidebarSection[]`                                      | sí   |             | Secciones del menú.                                                                                                                                                                        |
| `brand`             | `ReactNode`                                             |      |             | Logo o nombre de la app arriba.                                                                                                                                                            |
| `brandCollapsed`    | `ReactNode`                                             |      |             | Versión compacta del logo para el modo colapsado (por defecto se oculta `brand`).                                                                                                          |
| `collapsed`         | `boolean`                                               |      |             | Colapsado (controlado).                                                                                                                                                                    |
| `currentPath`       | `string`                                                |      |             | Ruta actual (p. ej. usePathname() de Next) para marcar la opción activa.                                                                                                                   |
| `defaultCollapsed`  | `boolean`                                               |      |             | Colapsado inicial (no controlado).                                                                                                                                                         |
| `headerActions`     | `ReactNode`                                             |      |             | Acciones a la derecha de la cabecera: notificaciones, usuario.                                                                                                                             |
| `labels`            | `Partial<{ openMenu: string; skipToContent: string; }>` |      |             | Textos accesibles.                                                                                                                                                                         |
| `linkComponent`     | `ElementType<any, keyof IntrinsicElements>`             |      |             | Componente de enlace (Link de Next.js). Por defecto <a>.                                                                                                                                   |
| `loading`           | `boolean`                                               |      | `false`     | Carga del contenido al cambiar de pantalla: solo el área de contenido muestra el indicador (el menú y la cabecera no cambian). Los hijos siguen montados, atenuados y sin interacción.     |
| `loadingLabel`      | `string`                                                |      | `Cargando…` | Texto accesible de la carga.                                                                                                                                                               |
| `maxWidth`          | `"none" \| "md" \| "lg"`                                |      | `lg`        | Ancho máximo del contenido: none, lg (72rem, por defecto) o md (56rem).                                                                                                                    |
| `onCollapsedChange` | `(collapsed: boolean) => void`                          |      |             | Al colapsar o expandir.                                                                                                                                                                    |
| `sidebarFooter`     | `ReactNode`                                             |      |             | Contenido al pie de la barra lateral (usuario, "Cerrar sesión").                                                                                                                           |
| `storageKey`        | `string`                                                |      |             | Clave de localStorage para recordar si estaba colapsado.                                                                                                                                   |
| `title`             | `ReactNode`                                             |      |             | Título en la cabecera (en móvil se ve junto al botón ☰).                                                                                                                                  |
| `toasts`            | `boolean`                                               |      | `true`      | Incluye `ToastProvider`: dentro del panel, `useToast()` muestra los mensajes del servidor como toast bajo la cabecera. Pon `false` solo si la app ya tiene su propio proveedor más arriba. |

Tipos: `AppShellProps`.

<!-- catalogo:fin -->
