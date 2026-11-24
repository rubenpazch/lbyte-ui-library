---
"@rubenpazch/list": minor
"@rubenpazch/collapsible": minor
"@rubenpazch/bottom-navigation": minor
"@rubenpazch/app-shell": minor
"@rubenpazch/icons": minor
"@rubenpazch/chip": patch
"@rubenpazch/ui": minor
---

Componentes para la migración de club-ui:

- `List` + `ListItem`: lista de filas con icono, título, detalle y contenido a la derecha (botón o enlace).
- `Collapsible`: sección plegable ("Más opciones") sobre `<details>`.
- `BottomNavigation`: barra inferior del celular con 3 a 5 secciones.
- `AppShell` acepta `bottomNav`: muestra la barra en el celular y agrega "Más", que abre el menú lateral.
- Iconos nuevos: `TrophyIcon`, `NewspaperIcon`, `VideoIcon`, `RadioIcon`, `UndoIcon`, `ArrowLeftRightIcon`,
  `IdCardIcon`, `FootballIcon`, `ArrowUpIcon`, `ArrowDownIcon`, `UserIcon`, `RectangleVerticalIcon`.
- `Chip`: con `selected` y `variant="filled"` el texto ya no queda ilegible (se conserva el relleno).
