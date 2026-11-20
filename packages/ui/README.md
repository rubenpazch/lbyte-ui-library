# @rubenpazch/ui

Todos los componentes de **Lbyte UI** en un solo paquete: botones, formularios, navegación,
mensajes, iconos, tokens de diseño y componentes de salud.

```bash
npm install @rubenpazch/ui
```

```css
/* app/globals.css (Tailwind 4) */
@import "tailwindcss";
@import "@rubenpazch/ui/tokens.css";
@import "@rubenpazch/ui/tailwind.css";
```

```tsx
import { Button, TextInput } from "@rubenpazch/ui";
```

- Catálogo de componentes con props: [docs/COMPONENTES.md](docs/COMPONENTES.md)
- Instrucciones para agentes de IA y reglas de uso: [AGENTS.md](AGENTS.md)
- Storybook: (ver README del repositorio)

Este paquete solo reexporta los paquetes `@rubenpazch/*`; se publica junto con ellos desde
[lbyte-ui-library](https://github.com/rubenpazch/lbyte-ui-library).
