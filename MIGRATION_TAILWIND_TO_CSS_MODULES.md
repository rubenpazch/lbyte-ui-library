# Migración progresiva: Tailwind → CSS Modules (lbyte-ui-library)

Estrategia para eliminar la dependencia de Tailwind en la librería, migrando **por
necesidad** (cada paquete se migra cuando se toca). Los colores se centralizan en
los design tokens `--lb-*` (`@rubenpazch/tokens`).

## Contexto (verificado)

- **Componentes publicables** que usaban Tailwind: solo `RadioGroup.tsx` y
  `Autocomplete.tsx` (una clase `w-4 h-4`). El resto ya usa CSS Modules.
- **Tooling muerto**: `@tailwindcss/postcss` en los rollup de `button` y
  `text-input` (sus `.module.css` no tienen `@tailwind`/`@apply`).
- **Stories**: ~77 archivos con ~1000+ utilidades Tailwind (layout de demos).
  Storybook las resuelve con su `tailwind.css`.
- **JSDoc de iconos**: ejemplos en comentarios; no es código, se ignora.
- **`guide` (Next.js)**: intensivo en Tailwind — pista separada, fuera de este plan.

## Principios

1. **Por necesidad**: se migra un paquete cuando se toca, no todo de golpe.
2. **Colores → tokens** `--lb-*` (nunca hex crudo ni `text-red-600`).
3. **Un `.module.css` co-localizado** por componente/story, nombres semánticos.
4. **Verificación** por paquete: `build` + render en Storybook.
5. Tailwind **no se elimina** hasta que las stories estén migradas.

## Fases

### Fase 0 — Limpieza sin riesgo

- [ ] Quitar `@tailwindcss/postcss` de `packages/button/rollup.config.mjs` y
      `packages/text-input/rollup.config.mjs`.
- [ ] Fijar convención en `AGENTS.md`/`CLAUDE.md`: componentes nuevos solo CSS
      Modules + tokens.

### Fase 1 — Componentes publicables (alto valor)

- [x] `RadioGroup.tsx` → `RadioGroup.module.css` (con tokens).
- [x] `Autocomplete.tsx` → `w-4 h-4` reemplazado por `styles.clearIcon`.

### Fase 2 — Stories, incremental (por paquete, bajo demanda)

Al modificar un paquete, migrar su `*.stories.tsx` a un `*.stories.module.css`
co-localizado. Orden sugerido: `radio-button`, `autocomplete`, `text-input`,
`checkbox-input`, `drawer`, `tabs`, `icon-button`, luego `icons/*`.

- [ ] radio-button
- [ ] autocomplete
- [ ] text-input
- [ ] checkbox-input
- [ ] drawer
- [ ] tabs
- [ ] icon-button
- [ ] icons/\*

### Fase 3 — Eliminar Tailwind de la librería (cierre, tras Fase 2)

- [ ] Quitar `import "./tailwind.css"` del preview de Storybook.
- [ ] Quitar deps `tailwindcss` / `@tailwindcss/postcss` de paquetes y raíz.
- [ ] Actualizar docs.

### Pista separada — `guide` (Next.js)

Migración propia (Tailwind v4 + shadcn → CSS Modules). Se planifica aparte.

## Cheat-sheet Tailwind → CSS/tokens

| Tailwind                                 | CSS Modules                                                   |
| ---------------------------------------- | ------------------------------------------------------------- |
| `flex`, `flex-col`, `gap-4`, `space-y-3` | `display:flex; flex-direction; gap: var(--lb-space-*)`        |
| `px-4 py-2`, `p-3`, `mt-2/mb-3`          | `padding`/`margin: var(--lb-space-*)`                         |
| `text-sm/xs/lg`                          | `font-size: var(--lb-font-size-sm/xs/lg)`                     |
| `font-semibold/medium`                   | `font-weight: var(--lb-font-weight-semibold/medium)`          |
| `rounded`, `rounded-lg`                  | `border-radius: var(--lb-radius-sm/lg)`                       |
| `text-red-600`                           | `color: var(--lb-color-danger)`                               |
| `text-gray-900/700/600/500`              | `var(--lb-color-foreground / neutral-700 / muted-foreground)` |
| `bg-gray-50/100`                         | `background: var(--lb-color-neutral-50/100)`                  |
| `border`, `border-gray-300`              | `border: 1px solid var(--lb-color-border / neutral-300)`      |

## Criterio "de acuerdo a la necesidad"

- Tocas un componente → migras **ese** componente/paquete en el mismo PR.
- Nada de PRs masivos; cada paquete migrado se verifica solo (build + Storybook).
