# @rubenpazch/icons

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Más de 60 iconos SVG como componentes React (y MaterialIcon para Material Icons).

- **Usar cuando:** Cualquier icono de la interfaz; combínalos con Button, IconButton, Chip o InfoRow.
- **Evitar cuando:** Ilustraciones grandes o logos de marca.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/icons
```

Iconos: `ArrowDetailsIcon`, `ArchiveIcon`, `BrandingIcon`, `BusinessPlanIcon`, `CalendarIcon`, `CheckIcon`, `CheckOutIcon`, `CheckmarkIcon`, `ChecksIcon`, `ChevronBarIcon`, `ChevronIcon`, `ClinicalNotesIcon`, `CityIcon`, `ClockIcon`, `CloseIcon`, `CopyIcon`, `CoinsHandIcon`, `CoinsAcceptedIcon`, `MenuGridIcon`, `DocumentIcon`, `DownloadIcon`, `DragHandleIcon`, `EditIcon`, `EmailIcon`, `ErrorIcon`, `ExclamationTriangleIcon`, `EyeIcon`, `EyeCheckIcon`, `FilterIcon`, `FoldersIcon`, `GalleryPhotoIcon`, `GlassesIcon`, `HomeIcon`, `InfoIcon`, `LinkIcon`, `LocationIcon`, `ManualIdentifierIcon`, `MapIcon`, `MenuIcon`, `MinusIcon`, `MoreIcon`, `NotificationIcon`, `PatientIcon`, `PatientListIcon`, `PatientsIcon`, `PhoneIcon`, `WhatsAppIcon`, `PlusIcon`, `PrescriptionIcon`, `PresentationChartIcon`, `PrintIcon`, `RefreshIcon`, `SearchIcon`, `SettingsIcon`, `SortIcon`, `SpinnerIcon`, `SystemIdentifierIcon`, `TrashIcon`, `ArrowLeftIcon`, `ArrowRightIcon`, `RobotOffIcon`, `UploadIcon`, `UserManagementIcon`, `UserPlusIcon`, `UserSelectIcon`, `UsersIcon`, `WalletOpenIcon`, `ZoomInIcon`, `ZoomOutIcon`, `RobotIcon`, `TargetIcon`, `MaterialIcon`, `ReceiptIcon`.

Otras exportaciones: `ICONOS`.

Tipos: `IconoInfo`, `CategoriaIcono`.

<!-- catalogo:fin -->

## Ver los iconos

Galería única en Storybook: **https://ui.lbyte.pe → Iconos / Galería**. Se busca por nombre o por
palabra en español, y un clic copia el `import`. Para la IA: `@rubenpazch/ui/docs/ICONOS.md`.

## Agregar un icono

```bash
pnpm icono:nuevo Factura ./factura.svg dinero "factura, comprobante, boleta" "Comprobantes de pago."
pnpm catalogo
```

Crea `src/FacturaIcon.tsx` (tamaños `sm`/`md`/`lg`, `currentColor`, decorativo por defecto o con
`title` si transmite información), lo exporta y agrega sus metadatos en `src/iconos.ts`.
Un test falla si un icono no tiene metadatos.

Categorías: `acciones`, `navegacion`, `estado`, `archivos`, `comunicacion`, `personas`,
`dinero`, `salud`, `lugares`, `otros`.

**Origen de los SVG:** usa un set de licencia libre y trazo de 24×24 para que se vean coherentes, como
[Lucide](https://lucide.dev) (ISC) o [Tabler](https://tabler.io/icons) (MIT). `ReceiptIcon` proviene de Lucide.

## Por qué agregar iconos no hace pesadas las apps

El paquete se publica con **un archivo por icono** (`dist/esm/<Nombre>.js`, `sideEffects: false`).
El bundler de la app (Next.js, Vite) solo incluye los iconos que importa, sin importar cuántos haya:

| Lo que importa la app | Peso en el bundle (minificado) |
| --------------------- | ------------------------------ |
| 1 icono               | ~1,3 KB                        |
| 5 iconos              | ~3 KB                          |
| los 72                | ~55 KB                         |

El paquete en npm sí crece (≈1 KB por icono), pero eso solo afecta la descarga de `node_modules`,
no lo que recibe el usuario. Antes de esta versión todo iba en un único archivo y 1 icono costaba ~22 KB.

Si algún día se necesitan cientos de iconos genéricos, la opción es usar `lucide-react` directamente para
esos y dejar en esta librería solo los propios de Lbyte (salud, SUNAT, marca).
