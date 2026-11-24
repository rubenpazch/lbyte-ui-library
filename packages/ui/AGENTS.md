# Lbyte UI — instrucciones para agentes (y personas)

Este archivo viaja dentro del paquete npm: si lo estás leyendo en
`node_modules/@rubenpazch/ui/AGENTS.md`, describe **exactamente la versión instalada** en esta app.

## Regla principal

**Toda interfaz de una app Lbyte se construye con `@rubenpazch/ui`.** Antes de escribir un
botón, un campo, un modal, una paginación, un loader o un icono, búscalo en el catálogo:

- `node_modules/@rubenpazch/ui/docs/COMPONENTES.md` — catálogo legible: qué es cada componente,
  cuándo usarlo, cuándo no, y sus props con tipos y valores posibles.
- `node_modules/@rubenpazch/ui/docs/catalogo.json` — lo mismo en JSON (también exportado como
  `@rubenpazch/ui/catalogo.json`).

Si un componente existe, úsalo; no lo reescribas ni lo copies con Tailwind.

## Instalación y configuración (una vez por app)

```bash
npm install @rubenpazch/ui
```

**Con Tailwind 4** (las apps Next.js de Lbyte) — en el CSS global (`app/globals.css`):

```css
@import "tailwindcss";
@import "@rubenpazch/ui/tokens.css";
@import "@rubenpazch/ui/tailwind.css";
```

**Sin Tailwind** — en el layout raíz:

```tsx
import "@rubenpazch/ui/tokens.css";
import "@rubenpazch/ui/base.css"; // opcional: tipografía y colores base en body, h1…h6, a
```

No hace falta configurar nada más: cada componente trae su propio CSS.

## Cómo importar

```tsx
import {
  Button,
  TextInput,
  ConfirmationDialog,
  CheckIcon,
} from "@rubenpazch/ui";
import type { ButtonProps, SelectOption } from "@rubenpazch/ui";
```

Siempre desde `@rubenpazch/ui`, nunca desde los paquetes sueltos (`@rubenpazch/button`…) ni desde
rutas internas (`dist/…`).

## Next.js (App Router)

- El paquete está marcado `"use client"`: puedes importarlo desde cualquier archivo, incluso
  páginas que son Server Components.
- Un **Server Component no puede pasar funciones** (`onChange`, `onClick`, `onClose`…) a un
  componente. Los formularios y todo lo que tenga eventos o estado van en un componente propio con
  `"use client"` al inicio, que la página importa. Componentes sin eventos (`Button` sin `onClick`,
  `InfoRow`, `Stepper`, iconos) se pueden usar directo en la página.
- Funciona con `output: "export"` (sitios estáticos).

## Estilos

- Usa los **tokens**, nunca colores en hexadecimal ni tamaños sueltos:
  - Tailwind: utilidades con prefijo `lb`: `bg-lb-primary`, `text-lb-foreground`,
    `text-lb-muted-foreground`, `border-lb-border`, `rounded-lb-md`, `shadow-lb-md`, `p-lb-4`,
    `gap-lb-2`, `text-lb-sm`, `font-lb-sans`.
  - CSS: `var(--lb-color-primary)`, `var(--lb-space-4)`, `var(--lb-radius-md)`…
  - La lista completa está en `@rubenpazch/ui/tokens.css`.
- Tema oscuro: `data-theme="dark"` en `<html>` (o en un contenedor). Los tokens y las utilidades
  `lb-*` cambian solos.
- **Color de la marca** (p. ej. una app que se personaliza por organización): redefine solo
  `--lb-color-primary` (y opcionalmente `--lb-color-primary-hover`) en `:root` o en un contenedor.
  Los tonos `--lb-color-primary-subtle`, `-border`, `-accent` y `-strong` se derivan solos y todos
  los componentes los usan (menú activo, foco, badges, chips, pestañas…). Para estados de
  "información" usa `info`, que es azul siempre.
  ```ts
  document.documentElement.style.setProperty("--lb-color-primary", "#0f766e");
  ```
- Para ajustar un componente usa sus props (`variant`, `color`, `size`, `fullWidth`…) y, si hace
  falta, `className` para márgenes o posición. No sobrescribas sus clases internas.
- Para **ubicar y alinear** bloques usa los componentes de maquetación (ver **Maquetación**) en
  vez de escribir `display: flex` o clases `flex`/`grid` de Tailwind; para color, tipografía,
  radios, sombras y espacios del sistema, las `lb-*`.

## Maquetación (sin escribir CSS)

`Flex`, `Stack`, `Inline`, `Center`, `Grid`/`GridItem`, `Container` y `Spacer` se configuran solo
con props. Los espacios (`gap`, `padding`, `paddingX`, `paddingY`) usan la escala `--lb-space-*`
(0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16) y **todas las props aceptan valores por punto de quiebre**
(mobile first): `{ base, sm: 640px, md: 768px, lg: 1024px, xl: 1280px }`.

| Necesito…                                   | Usa                                                                           |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| Apilar en vertical con espacio uniforme     | `<Stack gap={6}>`                                                             |
| Una fila de botones/chips que se ajusta     | `<Inline gap={2}>`; a la derecha: `<Inline justify="end">`                    |
| Logo a la izquierda y acciones a la derecha | `<Inline><Logo /><Spacer /><Button /></Inline>` o `justify="between"`         |
| Centrar vertical y horizontalmente (login)  | `<Center minHeight="screen">`                                                 |
| Columna en móvil, fila en escritorio        | `<Flex direction={{ base: "column", md: "row" }} gap={4}>`                    |
| Tarjetas en grilla que se acomodan solas    | `<Grid minItemWidth="16rem">`; columnas fijas: `columns={{ base: 1, md: 3 }}` |
| Una celda que ocupa varias columnas         | `<GridItem span={2}>` (o `"full"`)                                            |
| El ancho máximo de la página                | `<Container size="lg">`                                                       |
| Ocultar algo en móvil                       | `hide={{ base: true, md: false }}`                                            |

```tsx
<Container as="main" paddingY={8}>
  <Stack gap={6}>
    <Inline justify="between">
      <h1>Clientes</h1>
      <Button variant="contained">Nuevo</Button>
    </Inline>
    <Grid columns={{ base: 1, md: 2, lg: 4 }}>
      <Card>…</Card>
      <GridItem span={{ base: "full", lg: 2 }}>
        <Card>…</Card>
      </GridItem>
    </Grid>
  </Stack>
</Container>
```

Todos aceptan `as` (`section`, `ul`, `nav`, `main`…) para usar la etiqueta HTML correcta, y
`className` solo para casos puntuales.

## Qué usar para cada cosa

| Necesito…                                                          | Usa                                                                                                                                     |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| El layout de un panel (menú lateral, cabecera, contenido)          | `AppShell` (o solo `Sidebar`) en `app/(panel)/layout.tsx`, con `currentPath={usePathname()}` y `linkComponent={Link}`                   |
| La cabecera de cada página                                         | `PageHeader` (migas, título h1, acciones)                                                                                               |
| Un listado de registros                                            | `DataTable` + `Pagination` (`onPageChange`) + `EmptyState`                                                                              |
| Alinear, centrar o distribuir bloques de una pantalla              | `Stack`, `Inline`, `Center`, `Grid`, `Container` (ver **Maquetación**)                                                                  |
| Un formulario                                                      | `FormRow` (columnas) + campos (`TextInput`, `Textarea`, `Select`, `Autocomplete`, `DateInput`, `MoneyInput`, `Switch`…) + `FormActions` |
| Prefijo o sufijo pegado al campo ("S/", ".pe", "kg", botón Buscar) | `TextInput` con `startAddon` / `endAddon`                                                                                               |
| Elegir varias opciones de una lista corta (permisos, días)         | `CheckboxGroup` (`selectAll`, `maxSelected`, `columns`)                                                                                 |
| Código de verificación (OTP) o PIN                                 | `PinInput` (`onComplete` para enviar; pegar el código funciona solo)                                                                    |
| Montos de dinero                                                   | `MoneyInput` para editar, `formatMoney()` para mostrar                                                                                  |
| Elegir el mes de trabajo                                           | `MonthNavigator`                                                                                                                        |
| Filtrar por un periodo (desde/hasta)                               | `DateRangePicker` (con atajos); una sola fecha: `DateInput`                                                                             |
| Anti-robots en un formulario público                               | `Turnstile` (cambia `resetKey` tras cada envío)                                                                                         |
| Mostrar un estado                                                  | `Badge`                                                                                                                                 |
| Agrupar información                                                | `Card` + `CardHeader` / `CardBody` / `CardFooter`                                                                                       |
| Aviso fijo en la página / mensaje del servidor                     | `Alert` / `useToast()` (ver **Mensajes**)                                                                                               |
| Confirmar / editar en ventana                                      | `ConfirmationDialog` / `Modal`                                                                                                          |
| Acciones de una fila                                               | `Menu` (⋮)                                                                                                                              |
| Historial / seguimiento de algo en orden                           | `Timeline` (la app convierte sus estados en `items`); pasos que el usuario recorre ahora: `Stepper`                                     |
| Resumen de datos de un registro (solo lectura)                     | `DescriptionList` (etiqueta/valor en columnas)                                                                                          |
| Adjuntar archivos                                                  | `FileUpload` (varios, con validación); una sola imagen con vista previa: `ImageUpload`                                                  |
| Personas en cuadrícula (usuarios, socios, clientes)                | `UserCard`                                                                                                                              |
| Raíz de una app con sesión                                         | `AuthGate` envolviendo `AppShell` (ver decisión 0006)                                                                                   |
| Login único: espera, "Cerraste sesión", error al volver            | `AuthScreen` (`busy={false}`, `description`, `action`, `tone="error"`); sin pantalla de login propia (decisión 0011)                    |
| Cargando                                                           | `Skeleton` (contenido), `LoadingSpinner` (botón), `OverlayLoader` (pantalla), `ProgressBar` (avance)                                    |

```tsx
// app/(panel)/layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppShell, HomeIcon, DocumentIcon } from "@rubenpazch/ui";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      brand={<strong>Finanzas</strong>}
      currentPath={usePathname()}
      linkComponent={Link}
      storageKey="menu-finanzas"
      sections={[
        {
          items: [
            { label: "Inicio", href: "/", icon: <HomeIcon /> },
            {
              label: "Obligaciones",
              href: "/obligaciones",
              icon: <DocumentIcon />,
            },
          ],
        },
      ]}
    >
      {children}
    </AppShell>
  );
}
```

## Mensajes (regla para todas las apps)

| Situación                                                                                                                           | Cómo se muestra                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Dentro de la app** (usuario con sesión): resultado de una acción o error del servidor ("Usuario guardado", "No se pudo eliminar") | **Toast**: `const toast = useToast(); toast.exito("…"); toast.error(err.message);`                                 |
| **Fuera de la app** (sin sesión): login, registro, recuperar contraseña                                                             | **En el formulario**: un texto con `role="alert"` bajo el botón, o `Alert` dentro del formulario. **Nunca toast.** |
| Error de un campo concreto ("Correo inválido")                                                                                      | La prop `error` del campo (`TextInput`, `Select`…), en cualquier pantalla                                          |
| Estado que describe la página y no una acción ("Esta instancia solo permite…", "Sin permisos")                                      | `Alert` en la página (`role="note"` si no debe anunciarse)                                                         |
| Confirmar algo destructivo                                                                                                          | `ConfirmationDialog`. Nunca `window.alert` ni `window.confirm`                                                     |

`AppShell` ya incluye `ToastProvider`, así que en un panel `useToast()` funciona sin configurar nada.
Fuera de `AppShell` (las pantallas públicas) `useToast()` lanza un error a propósito: ahí el mensaje
va en el formulario.

```tsx
function GuardarUsuario() {
  const toast = useToast();
  async function guardar() {
    try {
      await api.guardar(datos);
      toast.exito("Usuario guardado.");
    } catch (err) {
      toast.error((err as Error).message);
    }
  }
}
```

## Valores por defecto que conviene conocer

- `DateInput` y `DatePicker` abren el calendario **a pantalla completa en celulares** (< 640 px):
  sin teclado virtual, con botón "Cerrar", y al elegir la fecha vuelven al campo. En escritorio
  siguen siendo un desplegable. Para desactivarlo: `mobileFullScreen={false}`.
- `Button` es `variant="text"` (sin fondo) por defecto: el botón principal de una acción lleva
  `variant="contained"`, el secundario `variant="outlined"`. Su `type` por defecto es `"button"`:
  para enviar un formulario usa `type="submit"`.
- `TextInput` con `maxLength` muestra un contador de caracteres. Úsalo cuando el límite importa al
  usuario, no como validación de seguridad (esa va en el servidor).

## Textos

La interfaz va en **español**. Varios componentes reciben un objeto `labels` con todos sus textos
(por ejemplo `ImageUpload`, `IdentificationInput`, `PatientDetails`, `PrescriptionCard`):
pásalo siempre completo y en español.

## Si falta un componente

1. Confirma en `COMPONENTES.md` que no existe (revisa también variantes de uno parecido).
2. Si es **reutilizable** (lo usarían otras apps): no lo construyas dentro de la app. Agrégalo a la
   librería [`rubenpazch/lbyte-ui-library`](https://github.com/rubenpazch/lbyte-ui-library)
   siguiendo su `AGENTS.md` (`pnpm generate-package <nombre>`), publícalo y luego úsalo aquí.
   Si no puedes hacerlo ahora, créalo en la app en `src/components/` con tokens `lb-*` y anota
   en el README de la app que debe migrarse a la librería.
3. Si es **específico de esta app** (una composición: tarjeta de una obligación, fila de una
   tabla concreta), créalo en la app **componiendo** componentes de `@rubenpazch/ui`.

## Categorías

`base` (tokens, utilidades) · `acciones` · `formularios` · `navegacion` · `retroalimentacion` ·
`presentacion` · `datos` · `iconos` · `salud` (pacientes y recetas ópticas: úsalos solo en apps
clínicas u ópticas).
