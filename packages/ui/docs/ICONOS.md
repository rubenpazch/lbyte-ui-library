<!-- GENERADO por scripts/catalogo.mjs desde packages/icons/src/iconos.ts. No editar a mano. -->

# Iconos de @rubenpazch/ui

113 iconos SVG. Se importan por nombre y solo los que uses entran en el bundle:

```tsx
import { TrashIcon, PlusIcon } from "@rubenpazch/ui";

<TrashIcon size="sm" />; // sm 16px · md 20px · lg 24px; color = currentColor
```

Reglas: usa el color del texto (`currentColor`); un botón solo con icono necesita `aria-label` (usa `IconButton`). Si no hay un icono adecuado, no lo dibujes en la app: agrégalo a `packages/icons` (ver su README).

## acciones

| Icono            | Usar para                                          | Palabras clave                                  |
| ---------------- | -------------------------------------------------- | ----------------------------------------------- |
| `PlusIcon`       | Botón de crear o agregar un registro.              | agregar, nuevo, crear, sumar, más               |
| `MinusIcon`      | Restar una cantidad o contraer.                    | quitar, restar, menos, reducir                  |
| `EditIcon`       | Acción de editar un registro.                      | editar, lápiz, modificar, cambiar               |
| `TrashIcon`      | Acción destructiva de eliminar (con confirmación). | eliminar, borrar, basura, papelera              |
| `CopyIcon`       | Copiar un valor al portapapeles o duplicar.        | copiar, duplicar, portapapeles                  |
| `DownloadIcon`   | Descargar o exportar un archivo.                   | descargar, bajar, exportar                      |
| `UploadIcon`     | Subir o importar un archivo.                       | subir, cargar, importar                         |
| `PrintIcon`      | Imprimir un documento o comprobante.               | imprimir, impresora                             |
| `RefreshIcon`    | Recargar datos o reintentar.                       | actualizar, recargar, sincronizar, reintentar   |
| `SearchIcon`     | Campo o botón de búsqueda.                         | buscar, lupa, encontrar                         |
| `FilterIcon`     | Abrir o aplicar filtros de una lista.              | filtrar, embudo, filtros                        |
| `SortIcon`       | Ordenar columnas o listas.                         | ordenar, orden, ascendente, descendente         |
| `ZoomInIcon`     | Ampliar una imagen o vista.                        | acercar, ampliar, zoom                          |
| `ZoomOutIcon`    | Reducir una imagen o vista.                        | alejar, reducir, zoom                           |
| `SettingsIcon`   | Ir a configuración o ajustes.                      | configuración, ajustes, engranaje, preferencias |
| `LinkIcon`       | Enlace externo o copiar enlace.                    | enlace, vínculo, url, compartir                 |
| `DragHandleIcon` | Asa para reordenar arrastrando.                    | arrastrar, mover, reordenar, asa                |
| `CheckOutIcon`   | Registrar una salida o cerrar sesión.              | salida, cerrar sesión, salir, checkout          |
| `EyeIcon`        | Ver detalle o mostrar contraseña.                  | ver, mostrar, visible, ojo                      |
| `EyeCheckIcon`   | Marcar como revisado o visto.                      | revisado, visto, verificado, ojo                |
| `LockIcon`       | Contenido protegido o campo bloqueado.             | candado, bloqueado, seguro, privado             |
| `LockOpenIcon`   | Desbloquear o acceso concedido.                    | desbloquear, abierto, acceso                    |
| `EyeOffIcon`     | Ocultar contraseña o contenido.                    | ocultar, no visible, ojo tachado                |
| `SaveIcon`       | Guardar cambios.                                   | guardar, disquete, grabar                       |
| `QrCodeIcon`     | Códigos QR (pagos, MFA).                           | código qr, escanear, qr                         |
| `PowerIcon`      | Activar o desactivar algo.                         | apagar, encender, activar, desactivar           |

## navegacion

| Icono              | Usar para                               | Palabras clave                               |
| ------------------ | --------------------------------------- | -------------------------------------------- |
| `ArrowLeftIcon`    | Volver o ir al elemento anterior.       | atrás, volver, izquierda, anterior           |
| `ArrowRightIcon`   | Ir al siguiente paso o elemento.        | siguiente, adelante, derecha, continuar      |
| `ArrowDetailsIcon` | Abrir el detalle de una fila o tarjeta. | detalle, ver más, flecha                     |
| `ChevronIcon`      | Indicador de desplegable o acordeón.    | desplegar, chevron, expandir, flecha         |
| `ChevronBarIcon`   | Ir al inicio o al final (paginación).   | primero, último, extremo, chevron            |
| `CloseIcon`        | Cerrar un modal, panel o aviso.         | cerrar, x, cancelar, salir                   |
| `HomeIcon`         | Enlace a la página de inicio.           | inicio, casa, principal, dashboard           |
| `MenuIcon`         | Abrir el menú lateral en móvil.         | menú, hamburguesa, navegación                |
| `MenuGridIcon`     | Lanzador de aplicaciones o módulos.     | aplicaciones, cuadrícula, módulos, apps      |
| `MoreIcon`         | Botón ⋮ de más opciones.                | más opciones, puntos, kebab, menú contextual |
| `LogInIcon`        | Botón de iniciar sesión.                | iniciar sesión, entrar, ingresar, login      |
| `LogOutIcon`       | Botón de cerrar sesión.                 | cerrar sesión, salir, logout                 |
| `ExternalLinkIcon` | Enlace que abre otra pestaña.           | abrir en otra pestaña, enlace externo        |
| `DashboardIcon`    | Panel o tablero principal.              | panel, tablero, inicio, resumen              |

## estado

| Icono                     | Usar para                                 | Palabras clave                             |
| ------------------------- | ----------------------------------------- | ------------------------------------------ |
| `CheckIcon`               | Estado de éxito o completado.             | correcto, éxito, listo, círculo check      |
| `CheckmarkIcon`           | Marca simple de seleccionado o hecho.     | marca, check, aceptado, seleccionado       |
| `ChecksIcon`              | Varios elementos confirmados o leído.     | doble check, leído, varios, confirmados    |
| `ErrorIcon`               | Mensaje o estado de error.                | error, fallo, incorrecto                   |
| `ExclamationTriangleIcon` | Advertencia que requiere atención.        | advertencia, alerta, peligro, atención     |
| `InfoIcon`                | Mensaje informativo o ayuda.              | información, ayuda, detalle, i             |
| `NotificationIcon`        | Acceso a notificaciones.                  | notificación, campana, aviso, alerta       |
| `SpinnerIcon`             | Indicador de carga en línea (en botones). | cargando, espera, progreso, spinner        |
| `ClockIcon`               | Hora, duración o estado pendiente.        | hora, tiempo, pendiente, reloj             |
| `CalendarIcon`            | Campos de fecha o citas.                  | fecha, calendario, día, agenda             |
| `TargetIcon`              | Metas u objetivos.                        | objetivo, meta, diana, enfoque             |
| `ShieldCheckIcon`         | Seguridad o verificación en dos pasos.    | seguridad, protegido, verificado, 2fa, mfa |
| `TrendingUpIcon`          | Indicador que sube.                       | sube, aumento, crecimiento, ganancia       |
| `TrendingDownIcon`        | Indicador que baja.                       | baja, disminución, pérdida                 |
| `CircleXIcon`             | Estado rechazado o anulado.               | rechazado, anulado, cancelado, x           |
| `HelpIcon`                | Ayuda o preguntas frecuentes.             | ayuda, pregunta, duda, soporte             |
| `HistoryIcon`             | Historial o auditoría de cambios.         | historial, auditoría, antes, cambios       |

## archivos

| Icono                   | Usar para                              | Palabras clave                               |
| ----------------------- | -------------------------------------- | -------------------------------------------- |
| `DocumentIcon`          | Documentos o comprobantes.             | documento, archivo, pdf, hoja                |
| `FoldersIcon`           | Agrupar documentos o categorías.       | carpetas, archivos, categorías               |
| `ArchiveIcon`           | Archivar registros o ver el histórico. | archivar, caja, histórico                    |
| `GalleryPhotoIcon`      | Imágenes o galería de fotos.           | imagen, foto, galería                        |
| `PresentationChartIcon` | Reportes y estadísticas.               | reporte, gráfico, estadísticas, presentación |
| `MaterialIcon`          | Materiales o recursos.                 | material, recurso, insumo                    |
| `ChartBarIcon`          | Reportes con gráfico de barras.        | gráfico de barras, estadísticas, reporte     |
| `ChartPieIcon`          | Distribución o porcentajes.            | gráfico circular, distribución, porcentaje   |
| `ClipboardListIcon`     | Listas de tareas o pendientes.         | tareas, pendientes, checklist                |
| `FileTextIcon`          | Documentos de texto.                   | archivo de texto, documento, contrato        |
| `FileSpreadsheetIcon`   | Exportar a Excel o hojas de cálculo.   | excel, hoja de cálculo, exportar             |

## comunicacion

| Icono            | Usar para                              | Palabras clave                         |
| ---------------- | -------------------------------------- | -------------------------------------- |
| `EmailIcon`      | Correo electrónico.                    | correo, email, mensaje, sobre          |
| `PhoneIcon`      | Número de teléfono o llamar.           | teléfono, llamar, celular              |
| `WhatsAppIcon`   | Contacto por WhatsApp.                 | whatsapp, chat, mensaje                |
| `RobotIcon`      | Asistente de IA o proceso automático.  | robot, ia, asistente, bot, automático  |
| `RobotOffIcon`   | IA o automatización desactivada.       | robot apagado, ia desactivada, sin bot |
| `SendIcon`       | Enviar un mensaje o documento.         | enviar, mandar, avión de papel         |
| `SmartphoneIcon` | Dispositivo móvil o app autenticadora. | celular, móvil, dispositivo, app       |

## personas

| Icono                  | Usar para                              | Palabras clave                              |
| ---------------------- | -------------------------------------- | ------------------------------------------- |
| `UsersIcon`            | Lista o gestión de usuarios.           | usuarios, personas, grupo, equipo           |
| `UserPlusIcon`         | Invitar o crear un usuario.            | agregar usuario, invitar, nuevo usuario     |
| `UserSelectIcon`       | Asignar o elegir una persona.          | seleccionar usuario, asignar, persona       |
| `UserManagementIcon`   | Administración de usuarios y roles.    | administrar usuarios, roles, permisos       |
| `ManualIdentifierIcon` | Identificación ingresada a mano.       | identificador manual, documento, dni        |
| `SystemIdentifierIcon` | Identificador generado por el sistema. | identificador del sistema, código, id       |
| `BrandingIcon`         | Configuración de marca o logo.         | marca, logo, identidad, empresa             |
| `KeyIcon`              | Contraseñas y claves de acceso.        | llave, contraseña, clave, acceso            |
| `FingerprintIcon`      | Passkeys o acceso biométrico.          | huella, biometría, passkey, llave de acceso |
| `UserCogIcon`          | Ajustes de la cuenta del usuario.      | perfil, cuenta, ajustes de usuario          |
| `BriefcaseIcon`        | Cargos, empleos o negocios.            | trabajo, cargo, empleo, negocio             |

## dinero

| Icono               | Usar para                                  | Palabras clave                             |
| ------------------- | ------------------------------------------ | ------------------------------------------ |
| `WalletOpenIcon`    | Saldos, caja o billetera.                  | billetera, cartera, saldo, caja            |
| `CoinsHandIcon`     | Pagos o cobros.                            | pago, cobro, monedas, dinero               |
| `CoinsAcceptedIcon` | Pago confirmado o cobrado.                 | pago aceptado, cobrado, pagado             |
| `BusinessPlanIcon`  | Planes, presupuestos o finanzas.           | plan, negocio, finanzas, presupuesto       |
| `ReceiptIcon`       | Comprobantes de pago (boletas y facturas). | factura, comprobante, boleta, recibo       |
| `BankIcon`          | Cuentas o entidades bancarias.             | banco, entidad financiera, cuenta bancaria |
| `CreditCardIcon`    | Pagos con tarjeta.                         | tarjeta, crédito, débito, pago con tarjeta |
| `BanknoteIcon`      | Pagos en efectivo o montos.                | billete, efectivo, dinero, soles           |
| `CalculatorIcon`    | Cálculos o simulaciones.                   | calculadora, cálculo, totales              |
| `PiggyBankIcon`     | Ahorros o reservas.                        | ahorro, alcancía, reserva                  |

## salud

| Icono               | Usar para                         | Palabras clave                        |
| ------------------- | --------------------------------- | ------------------------------------- |
| `PatientIcon`       | Un paciente.                      | paciente, persona, historia clínica   |
| `PatientsIcon`      | Varios pacientes.                 | pacientes, varios, atención           |
| `PatientListIcon`   | Listado de pacientes.             | lista de pacientes, padrón, registro  |
| `ClinicalNotesIcon` | Notas o historia clínica.         | notas clínicas, historia, evolución   |
| `PrescriptionIcon`  | Recetas médicas.                  | receta, prescripción, medicamento     |
| `GlassesIcon`       | Recetas de lentes u oftalmología. | lentes, anteojos, oftalmología, vista |

## lugares

| Icono          | Usar para                  | Palabras clave                           |
| -------------- | -------------------------- | ---------------------------------------- |
| `LocationIcon` | Una dirección o ubicación. | ubicación, dirección, pin, lugar         |
| `MapIcon`      | Ver en mapa o zonas.       | mapa, ruta, zona                         |
| `CityIcon`     | Ciudad, sede o distrito.   | ciudad, edificios, sede, distrito        |
| `BuildingIcon` | Empresas u organizaciones. | empresa, organización, edificio, oficina |
| `GlobeIcon`    | Sitio web o idioma.        | web, idioma, internet, mundo             |

## otros

| Icono         | Usar para                          | Palabras clave                              |
| ------------- | ---------------------------------- | ------------------------------------------- |
| `TagIcon`     | Etiquetas o categorías.            | etiqueta, categoría, precio                 |
| `ListIcon`    | Vista de lista.                    | lista, elementos, viñetas                   |
| `StarIcon`    | Favoritos o calificaciones.        | favorito, destacado, estrella, calificación |
| `SunIcon`     | Cambiar a tema claro.              | claro, día, tema claro, sol                 |
| `MoonIcon`    | Cambiar a tema oscuro.             | oscuro, noche, tema oscuro, luna            |
| `PaletteIcon` | Personalizar colores o apariencia. | colores, tema, apariencia, marca            |
