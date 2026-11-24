/**
 * Metadatos de cada icono: la única fuente para la galería de Storybook,
 * el catálogo (docs/catalogo.json, docs/ICONOS.md) y el contexto de la IA.
 *
 * Al agregar un icono, agrégalo aquí: un test falla si falta.
 */
export type CategoriaIcono =
  | "acciones"
  | "navegacion"
  | "estado"
  | "archivos"
  | "comunicacion"
  | "personas"
  | "dinero"
  | "salud"
  | "lugares"
  | "otros";

export interface IconoInfo {
  /** Nombre exportado, p. ej. "TrashIcon". */
  nombre: string;
  categoria: CategoriaIcono;
  /** Palabras en español para buscarlo (sinónimos, lo que representa). */
  palabras: string[];
  /** Cuándo usarlo, en una frase. */
  usarPara: string;
}

const i = (
  nombre: string,
  categoria: CategoriaIcono,
  palabras: string,
  usarPara: string,
): IconoInfo => ({
  nombre,
  categoria,
  palabras: palabras.split(", "),
  usarPara,
});

export const ICONOS: IconoInfo[] = [
  // Acciones
  i(
    "PlusIcon",
    "acciones",
    "agregar, nuevo, crear, sumar, más",
    "Botón de crear o agregar un registro.",
  ),
  i(
    "MinusIcon",
    "acciones",
    "quitar, restar, menos, reducir",
    "Restar una cantidad o contraer.",
  ),
  i(
    "EditIcon",
    "acciones",
    "editar, lápiz, modificar, cambiar",
    "Acción de editar un registro.",
  ),
  i(
    "TrashIcon",
    "acciones",
    "eliminar, borrar, basura, papelera",
    "Acción destructiva de eliminar (con confirmación).",
  ),
  i(
    "CopyIcon",
    "acciones",
    "copiar, duplicar, portapapeles",
    "Copiar un valor al portapapeles o duplicar.",
  ),
  i(
    "DownloadIcon",
    "acciones",
    "descargar, bajar, exportar",
    "Descargar o exportar un archivo.",
  ),
  i(
    "UploadIcon",
    "acciones",
    "subir, cargar, importar",
    "Subir o importar un archivo.",
  ),
  i(
    "PrintIcon",
    "acciones",
    "imprimir, impresora",
    "Imprimir un documento o comprobante.",
  ),
  i(
    "RefreshIcon",
    "acciones",
    "actualizar, recargar, sincronizar, reintentar",
    "Recargar datos o reintentar.",
  ),
  i(
    "SearchIcon",
    "acciones",
    "buscar, lupa, encontrar",
    "Campo o botón de búsqueda.",
  ),
  i(
    "FilterIcon",
    "acciones",
    "filtrar, embudo, filtros",
    "Abrir o aplicar filtros de una lista.",
  ),
  i(
    "SortIcon",
    "acciones",
    "ordenar, orden, ascendente, descendente",
    "Ordenar columnas o listas.",
  ),
  i(
    "ZoomInIcon",
    "acciones",
    "acercar, ampliar, zoom",
    "Ampliar una imagen o vista.",
  ),
  i(
    "ZoomOutIcon",
    "acciones",
    "alejar, reducir, zoom",
    "Reducir una imagen o vista.",
  ),
  i(
    "SettingsIcon",
    "acciones",
    "configuración, ajustes, engranaje, preferencias",
    "Ir a configuración o ajustes.",
  ),
  i(
    "LinkIcon",
    "acciones",
    "enlace, vínculo, url, compartir",
    "Enlace externo o copiar enlace.",
  ),
  i(
    "DragHandleIcon",
    "acciones",
    "arrastrar, mover, reordenar, asa",
    "Asa para reordenar arrastrando.",
  ),
  i(
    "CheckOutIcon",
    "acciones",
    "salida, cerrar sesión, salir, checkout",
    "Registrar una salida o cerrar sesión.",
  ),
  i(
    "EyeIcon",
    "acciones",
    "ver, mostrar, visible, ojo",
    "Ver detalle o mostrar contraseña.",
  ),
  i(
    "EyeCheckIcon",
    "acciones",
    "revisado, visto, verificado, ojo",
    "Marcar como revisado o visto.",
  ),
  // Navegación
  i(
    "ArrowLeftIcon",
    "navegacion",
    "atrás, volver, izquierda, anterior",
    "Volver o ir al elemento anterior.",
  ),
  i(
    "ArrowRightIcon",
    "navegacion",
    "siguiente, adelante, derecha, continuar",
    "Ir al siguiente paso o elemento.",
  ),
  i(
    "ArrowDetailsIcon",
    "navegacion",
    "detalle, ver más, flecha",
    "Abrir el detalle de una fila o tarjeta.",
  ),
  i(
    "ChevronIcon",
    "navegacion",
    "desplegar, chevron, expandir, flecha",
    "Indicador de desplegable o acordeón.",
  ),
  i(
    "ChevronBarIcon",
    "navegacion",
    "primero, último, extremo, chevron",
    "Ir al inicio o al final (paginación).",
  ),
  i(
    "CloseIcon",
    "navegacion",
    "cerrar, x, cancelar, salir",
    "Cerrar un modal, panel o aviso.",
  ),
  i(
    "HomeIcon",
    "navegacion",
    "inicio, casa, principal, dashboard",
    "Enlace a la página de inicio.",
  ),
  i(
    "MenuIcon",
    "navegacion",
    "menú, hamburguesa, navegación",
    "Abrir el menú lateral en móvil.",
  ),
  i(
    "MenuGridIcon",
    "navegacion",
    "aplicaciones, cuadrícula, módulos, apps",
    "Lanzador de aplicaciones o módulos.",
  ),
  i(
    "MoreIcon",
    "navegacion",
    "más opciones, puntos, kebab, menú contextual",
    "Botón ⋮ de más opciones.",
  ),
  // Estado
  i(
    "CheckIcon",
    "estado",
    "correcto, éxito, listo, círculo check",
    "Estado de éxito o completado.",
  ),
  i(
    "CheckmarkIcon",
    "estado",
    "marca, check, aceptado, seleccionado",
    "Marca simple de seleccionado o hecho.",
  ),
  i(
    "ChecksIcon",
    "estado",
    "doble check, leído, varios, confirmados",
    "Varios elementos confirmados o leído.",
  ),
  i(
    "ErrorIcon",
    "estado",
    "error, fallo, incorrecto",
    "Mensaje o estado de error.",
  ),
  i(
    "ExclamationTriangleIcon",
    "estado",
    "advertencia, alerta, peligro, atención",
    "Advertencia que requiere atención.",
  ),
  i(
    "InfoIcon",
    "estado",
    "información, ayuda, detalle, i",
    "Mensaje informativo o ayuda.",
  ),
  i(
    "NotificationIcon",
    "estado",
    "notificación, campana, aviso, alerta",
    "Acceso a notificaciones.",
  ),
  i(
    "SpinnerIcon",
    "estado",
    "cargando, espera, progreso, spinner",
    "Indicador de carga en línea (en botones).",
  ),
  i(
    "ClockIcon",
    "estado",
    "hora, tiempo, pendiente, reloj",
    "Hora, duración o estado pendiente.",
  ),
  i(
    "CalendarIcon",
    "estado",
    "fecha, calendario, día, agenda",
    "Campos de fecha o citas.",
  ),
  i(
    "TargetIcon",
    "estado",
    "objetivo, meta, diana, enfoque",
    "Metas u objetivos.",
  ),
  // Archivos
  i(
    "DocumentIcon",
    "archivos",
    "documento, archivo, pdf, hoja",
    "Documentos o comprobantes.",
  ),
  i(
    "FoldersIcon",
    "archivos",
    "carpetas, archivos, categorías",
    "Agrupar documentos o categorías.",
  ),
  i(
    "ArchiveIcon",
    "archivos",
    "archivar, caja, histórico",
    "Archivar registros o ver el histórico.",
  ),
  i(
    "GalleryPhotoIcon",
    "archivos",
    "imagen, foto, galería",
    "Imágenes o galería de fotos.",
  ),
  i(
    "PresentationChartIcon",
    "archivos",
    "reporte, gráfico, estadísticas, presentación",
    "Reportes y estadísticas.",
  ),
  i(
    "MaterialIcon",
    "archivos",
    "material, recurso, insumo",
    "Materiales o recursos.",
  ),
  // Comunicación
  i(
    "EmailIcon",
    "comunicacion",
    "correo, email, mensaje, sobre",
    "Correo electrónico.",
  ),
  i(
    "PhoneIcon",
    "comunicacion",
    "teléfono, llamar, celular",
    "Número de teléfono o llamar.",
  ),
  i(
    "WhatsAppIcon",
    "comunicacion",
    "whatsapp, chat, mensaje",
    "Contacto por WhatsApp.",
  ),
  i(
    "RobotIcon",
    "comunicacion",
    "robot, ia, asistente, bot, automático",
    "Asistente de IA o proceso automático.",
  ),
  i(
    "RobotOffIcon",
    "comunicacion",
    "robot apagado, ia desactivada, sin bot",
    "IA o automatización desactivada.",
  ),
  // Personas
  i(
    "UsersIcon",
    "personas",
    "usuarios, personas, grupo, equipo",
    "Lista o gestión de usuarios.",
  ),
  i(
    "UserPlusIcon",
    "personas",
    "agregar usuario, invitar, nuevo usuario",
    "Invitar o crear un usuario.",
  ),
  i(
    "UserSelectIcon",
    "personas",
    "seleccionar usuario, asignar, persona",
    "Asignar o elegir una persona.",
  ),
  i(
    "UserManagementIcon",
    "personas",
    "administrar usuarios, roles, permisos",
    "Administración de usuarios y roles.",
  ),
  i(
    "ManualIdentifierIcon",
    "personas",
    "identificador manual, documento, dni",
    "Identificación ingresada a mano.",
  ),
  i(
    "SystemIdentifierIcon",
    "personas",
    "identificador del sistema, código, id",
    "Identificador generado por el sistema.",
  ),
  i(
    "BrandingIcon",
    "personas",
    "marca, logo, identidad, empresa",
    "Configuración de marca o logo.",
  ),
  // Dinero
  i(
    "WalletOpenIcon",
    "dinero",
    "billetera, cartera, saldo, caja",
    "Saldos, caja o billetera.",
  ),
  i(
    "CoinsHandIcon",
    "dinero",
    "pago, cobro, monedas, dinero",
    "Pagos o cobros.",
  ),
  i(
    "CoinsAcceptedIcon",
    "dinero",
    "pago aceptado, cobrado, pagado",
    "Pago confirmado o cobrado.",
  ),
  i(
    "BusinessPlanIcon",
    "dinero",
    "plan, negocio, finanzas, presupuesto",
    "Planes, presupuestos o finanzas.",
  ),
  // Salud (HAL)
  i(
    "PatientIcon",
    "salud",
    "paciente, persona, historia clínica",
    "Un paciente.",
  ),
  i(
    "PatientsIcon",
    "salud",
    "pacientes, varios, atención",
    "Varios pacientes.",
  ),
  i(
    "PatientListIcon",
    "salud",
    "lista de pacientes, padrón, registro",
    "Listado de pacientes.",
  ),
  i(
    "ClinicalNotesIcon",
    "salud",
    "notas clínicas, historia, evolución",
    "Notas o historia clínica.",
  ),
  i(
    "PrescriptionIcon",
    "salud",
    "receta, prescripción, medicamento",
    "Recetas médicas.",
  ),
  i(
    "GlassesIcon",
    "salud",
    "lentes, anteojos, oftalmología, vista",
    "Recetas de lentes u oftalmología.",
  ),
  // Lugares
  i(
    "LocationIcon",
    "lugares",
    "ubicación, dirección, pin, lugar",
    "Una dirección o ubicación.",
  ),
  i("MapIcon", "lugares", "mapa, ruta, zona", "Ver en mapa o zonas."),
  i(
    "CityIcon",
    "lugares",
    "ciudad, edificios, sede, distrito",
    "Ciudad, sede o distrito.",
  ),
  i(
    "ReceiptIcon",
    "dinero",
    "factura, comprobante, boleta, recibo",
    "Comprobantes de pago (boletas y facturas).",
  ),
  i(
    "LockIcon",
    "acciones",
    "candado, bloqueado, seguro, privado",
    "Contenido protegido o campo bloqueado.",
  ),
  i(
    "LockOpenIcon",
    "acciones",
    "desbloquear, abierto, acceso",
    "Desbloquear o acceso concedido.",
  ),
  i(
    "KeyIcon",
    "personas",
    "llave, contraseña, clave, acceso",
    "Contraseñas y claves de acceso.",
  ),
  i(
    "LogInIcon",
    "navegacion",
    "iniciar sesión, entrar, ingresar, login",
    "Botón de iniciar sesión.",
  ),
  i(
    "LogOutIcon",
    "navegacion",
    "cerrar sesión, salir, logout",
    "Botón de cerrar sesión.",
  ),
  i(
    "ShieldCheckIcon",
    "estado",
    "seguridad, protegido, verificado, 2fa, mfa",
    "Seguridad o verificación en dos pasos.",
  ),
  i(
    "FingerprintIcon",
    "personas",
    "huella, biometría, passkey, llave de acceso",
    "Passkeys o acceso biométrico.",
  ),
  i(
    "EyeOffIcon",
    "acciones",
    "ocultar, no visible, ojo tachado",
    "Ocultar contraseña o contenido.",
  ),
  i(
    "UserCogIcon",
    "personas",
    "perfil, cuenta, ajustes de usuario",
    "Ajustes de la cuenta del usuario.",
  ),
  i(
    "BankIcon",
    "dinero",
    "banco, entidad financiera, cuenta bancaria",
    "Cuentas o entidades bancarias.",
  ),
  i(
    "CreditCardIcon",
    "dinero",
    "tarjeta, crédito, débito, pago con tarjeta",
    "Pagos con tarjeta.",
  ),
  i(
    "BanknoteIcon",
    "dinero",
    "billete, efectivo, dinero, soles",
    "Pagos en efectivo o montos.",
  ),
  i(
    "CalculatorIcon",
    "dinero",
    "calculadora, cálculo, totales",
    "Cálculos o simulaciones.",
  ),
  i(
    "PiggyBankIcon",
    "dinero",
    "ahorro, alcancía, reserva",
    "Ahorros o reservas.",
  ),
  i(
    "TrendingUpIcon",
    "estado",
    "sube, aumento, crecimiento, ganancia",
    "Indicador que sube.",
  ),
  i(
    "TrendingDownIcon",
    "estado",
    "baja, disminución, pérdida",
    "Indicador que baja.",
  ),
  i(
    "ChartBarIcon",
    "archivos",
    "gráfico de barras, estadísticas, reporte",
    "Reportes con gráfico de barras.",
  ),
  i(
    "ChartPieIcon",
    "archivos",
    "gráfico circular, distribución, porcentaje",
    "Distribución o porcentajes.",
  ),
  i(
    "CircleXIcon",
    "estado",
    "rechazado, anulado, cancelado, x",
    "Estado rechazado o anulado.",
  ),
  i(
    "HelpIcon",
    "estado",
    "ayuda, pregunta, duda, soporte",
    "Ayuda o preguntas frecuentes.",
  ),
  i(
    "ExternalLinkIcon",
    "navegacion",
    "abrir en otra pestaña, enlace externo",
    "Enlace que abre otra pestaña.",
  ),
  i(
    "BuildingIcon",
    "lugares",
    "empresa, organización, edificio, oficina",
    "Empresas u organizaciones.",
  ),
  i(
    "BriefcaseIcon",
    "personas",
    "trabajo, cargo, empleo, negocio",
    "Cargos, empleos o negocios.",
  ),
  i(
    "TagIcon",
    "otros",
    "etiqueta, categoría, precio",
    "Etiquetas o categorías.",
  ),
  i("ListIcon", "otros", "lista, elementos, viñetas", "Vista de lista."),
  i(
    "DashboardIcon",
    "navegacion",
    "panel, tablero, inicio, resumen",
    "Panel o tablero principal.",
  ),
  i(
    "SendIcon",
    "comunicacion",
    "enviar, mandar, avión de papel",
    "Enviar un mensaje o documento.",
  ),
  i("SaveIcon", "acciones", "guardar, disquete, grabar", "Guardar cambios."),
  i(
    "StarIcon",
    "otros",
    "favorito, destacado, estrella, calificación",
    "Favoritos o calificaciones.",
  ),
  i("SunIcon", "otros", "claro, día, tema claro, sol", "Cambiar a tema claro."),
  i(
    "MoonIcon",
    "otros",
    "oscuro, noche, tema oscuro, luna",
    "Cambiar a tema oscuro.",
  ),
  i(
    "GlobeIcon",
    "lugares",
    "web, idioma, internet, mundo",
    "Sitio web o idioma.",
  ),
  i(
    "QrCodeIcon",
    "acciones",
    "código qr, escanear, qr",
    "Códigos QR (pagos, MFA).",
  ),
  i(
    "SmartphoneIcon",
    "comunicacion",
    "celular, móvil, dispositivo, app",
    "Dispositivo móvil o app autenticadora.",
  ),
  i(
    "ClipboardListIcon",
    "archivos",
    "tareas, pendientes, checklist",
    "Listas de tareas o pendientes.",
  ),
  i(
    "FileTextIcon",
    "archivos",
    "archivo de texto, documento, contrato",
    "Documentos de texto.",
  ),
  i(
    "FileSpreadsheetIcon",
    "archivos",
    "excel, hoja de cálculo, exportar",
    "Exportar a Excel o hojas de cálculo.",
  ),
  i(
    "HistoryIcon",
    "estado",
    "historial, auditoría, antes, cambios",
    "Historial o auditoría de cambios.",
  ),
  i(
    "PowerIcon",
    "acciones",
    "apagar, encender, activar, desactivar",
    "Activar o desactivar algo.",
  ),
  i(
    "PaletteIcon",
    "otros",
    "colores, tema, apariencia, marca",
    "Personalizar colores o apariencia.",
  ),
  i(
    "TrophyIcon",
    "otros",
    "trofeo, copa, campeonato, palmarés, premio",
    "Títulos, palmarés, competiciones y premios.",
  ),
  i(
    "NewspaperIcon",
    "comunicacion",
    "prensa, periódico, noticias, medios, diario",
    "Prensa, noticias y acreditaciones de medios.",
  ),
  i(
    "VideoIcon",
    "archivos",
    "video, cámara, grabación, transmisión, canal",
    "Videos, transmisiones y canales.",
  ),
  i(
    "RadioIcon",
    "estado",
    "en vivo, transmisión, señal, directo, emisión",
    "Algo que ocurre en vivo o se transmite en directo.",
  ),
  i(
    "UndoIcon",
    "acciones",
    "deshacer, revertir, volver atrás, anular",
    "Deshacer la última acción.",
  ),
  i(
    "ArrowLeftRightIcon",
    "acciones",
    "cambio, intercambiar, sustitución, transferir, reemplazo",
    "Cambios, intercambios o sustituciones (p. ej. un cambio de jugador).",
  ),
  i(
    "IdCardIcon",
    "personas",
    "carnet, credencial, socio, identificación, membresía",
    "Carnets, credenciales y membresías.",
  ),
  i(
    "ArrowUpIcon",
    "navegacion",
    "subir, arriba, mover arriba, ordenar",
    "Mover un elemento hacia arriba.",
  ),
  i(
    "ArrowDownIcon",
    "navegacion",
    "bajar, abajo, mover abajo, ordenar",
    "Mover un elemento hacia abajo.",
  ),
  i(
    "FootballIcon",
    "otros",
    "balón, pelota, fútbol, partido, deporte",
    "Partidos y deportes con balón.",
  ),
  i(
    "UserIcon",
    "personas",
    "usuario, persona, cuenta, perfil, mi cuenta",
    "Una persona o la cuenta del usuario.",
  ),
  i(
    "RectangleVerticalIcon",
    "otros",
    "tarjeta, rectángulo, amonestación, carta",
    "Una tarjeta (p. ej. amarilla o roja en un partido).",
  ),
];
