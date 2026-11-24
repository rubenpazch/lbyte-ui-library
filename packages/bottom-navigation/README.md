# @rubenpazch/bottom-navigation

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Barra fija abajo en el celular con 3 a 5 secciones principales (icono y texto); se oculta en pantallas anchas.

- **Usar cuando:** Paneles que se usan sobre todo en el celular y con una mano: las secciones principales al alcance del pulgar. En un panel, pásala a AppShell con bottomNav.
- **Evitar cuando:** Más de 5 secciones o apps de escritorio: usa AppShell/Sidebar. Pestañas dentro de una página: usa Tabs.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/bottom-navigation
```

## BottomNavigation

Barra de navegación fija abajo para el celular: 3 a 5 secciones principales con icono y texto,
al alcance del pulgar. En pantallas anchas se oculta (la navegación va en el menú lateral).

| Prop            | Tipo                                        | Req. | Por defecto            | Descripción                                                                                  |
| --------------- | ------------------------------------------- | ---- | ---------------------- | -------------------------------------------------------------------------------------------- |
| `items`         | `BottomNavigationItem[]`                    | sí   |                        | Opciones (3 a 5).                                                                            |
| `aria-label`    | `string`                                    |      | `Navegación principal` | Nombre accesible de la navegación.                                                           |
| `className`     | `string`                                    |      |                        | Clase extra.                                                                                 |
| `currentPath`   | `string`                                    |      |                        | Ruta actual, para marcar la opción activa.                                                   |
| `hideFrom`      | `"md" \| "lg" \| "never"`                   |      | `md`                   | Desde qué ancho se oculta: md (768 px, por defecto), lg (1024 px) o never (siempre visible). |
| `linkComponent` | `ElementType<any, keyof IntrinsicElements>` |      | `a`                    | Componente de enlace (p. ej. Link de Next.js). Por defecto <a>.                              |

Tipos: `BottomNavigationItem`, `BottomNavigationProps`.

<!-- catalogo:fin -->
