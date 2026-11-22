# Instrucciones para agentes — lbyte-ui-library

Monorepo de la librería de componentes de Lbyte (pnpm + Turborepo + Rollup + Changesets).
Las apps la consumen como **un solo paquete: `@rubenpazch/ui`**.

- ¿Vas a **usar** la librería en una app? Lee [packages/ui/AGENTS.md](packages/ui/AGENTS.md).
- ¿Vas a **agregar o cambiar** un componente? Sigue este archivo.

## Mapa

```
packages/<nombre>/      un paquete npm por componente (@rubenpazch/<nombre>)
  src/<Comp>.tsx        componente + tipos (JSDoc en cada prop)
  src/<Comp>.module.css estilos con CSS Modules, solo tokens --lb-*
  src/<Comp>.stories.tsx historias de Storybook
  src/<Comp>.test.tsx   pruebas (Jest + Testing Library)
  package.json          incluye el bloque "lbyte" (categoría y uso) para el catálogo
packages/tokens/        tokens de diseño (tokens.css, base.css, tailwind.css generado)
packages/shared/        utilidades internas (classList, tipos)
packages/ui/            paquete paraguas @rubenpazch/ui (index y docs GENERADOS)
apps/storybook/         Storybook de toda la librería
scripts/catalogo.mjs    genera el índice de ui, el catálogo, los README y el puente Tailwind
scripts/generate-package.js  crea un paquete nuevo con todo lo necesario
```

## Agregar un componente

```bash
pnpm generate-package <nombre-en-kebab>      # p. ej. pnpm generate-package data-table
pnpm install
```

Luego, en `packages/<nombre>/`:

1. `src/<Comp>.tsx`: implementación. **Documenta cada prop con `/** … */`** y el componente con
   un comentario arriba: de ahí sale el catálogo que leen las apps. Exporta el componente como
   `default` (se publicará con el nombre del archivo) y exporta sus tipos (`<Comp>Props`…).
2. `src/<Comp>.module.css`: solo tokens (`var(--lb-color-*)`, `var(--lb-space-*)`,
   `var(--lb-radius-*)`…). Nada de hex, px sueltos ni clases de Tailwind.
3. Historias de cada variante y estado; pruebas de comportamiento y accesibilidad.
4. `package.json` → bloque `lbyte`:
   - `categoria`: `maquetacion`, `acciones`, `formularios`, `navegacion`, `retroalimentacion`, `presentacion`,
     `datos`, `iconos`, `salud` o `base`.
   - `resumen`, `usarCuando`, `evitarCuando` (en español; en `evitarCuando` nombra la alternativa).
5. `pnpm catalogo` — lo agrega a `@rubenpazch/ui`, a `packages/ui/docs/` y a su README.
6. `pnpm test && pnpm build`.
7. `pnpm changeset` — `minor` para el paquete nuevo **y** para `@rubenpazch/ui`.

## Cambiar un componente

- Cambios de props → actualiza JSDoc, historias y pruebas, y corre `pnpm catalogo`.
- Cambio que rompe compatibilidad → `major` en el changeset y explica la migración.
- Un nombre exportado no se puede repetir entre paquetes (el catálogo falla si pasa).

## Reglas

- Textos por defecto en español; si el componente tiene muchos textos, recibe un objeto `labels`.
- Accesibilidad: roles y `aria-*`, foco visible (`--lb-color-ring`), navegable con teclado.
- Sin dependencias nuevas sin necesidad: cada una la instalan todas las apps.
- No edites a mano lo generado: `packages/ui/src/index.ts`, `packages/ui/docs/*`,
  `packages/tokens/src/tailwind.css` ni la sección entre `<!-- catalogo:inicio -->` y
  `<!-- catalogo:fin -->` de los README.
- `pnpm catalogo:check` corre en el CI: falla si olvidaste `pnpm catalogo` o el bloque `lbyte`.

## Publicación

Changesets: al integrar en `main`, el workflow abre (o actualiza) el PR "chore: version packages";
al integrar ese PR se publica en npm. Nunca publiques a mano.
