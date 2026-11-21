# @rubenpazch/auth-gate

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Puerta de sesión: comprueba el token, confirma con el servidor (/me) y solo entonces pinta la app; mientras, una pantalla neutra. Sin sesión, va al login sin mostrar nada.

- **Usar cuando:** Raíz de toda app con sesión (paneles, módulos), envolviendo AppShell.
- **Evitar cuando:** Pantallas públicas (login, registro, landing).

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/auth-gate
```

## AuthGate

Puerta de sesión para la raíz de toda app con sesión (decisión 0006 de lbyte-contexto):

1. sin token → al login sin pintar nada de la app;
2. con token → pantalla neutra mientras `verify()` (/me) confirma;
3. confirmada → pinta la app; rechazada → al login.
   Un 401 posterior (`logoutEvent`) oculta la app y va al login.

Es experiencia de usuario, no seguridad: la API sigue respondiendo 401.

| Prop                | Tipo                      | Req. | Por defecto   | Descripción                                                                                                                                                                |
| ------------------- | ------------------------- | ---- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`          | `ReactNode`               | sí   |               | La app; recibe lo que devolvió `verify` (usuario, permisos…).                                                                                                              |
| `hasSession`        | `() => boolean`           | sí   |               | Comprobación local inmediata (sin red): ¿hay token o cookie de sesión y no está vencido? Si devuelve false se va al login sin pintar nada de la app.                       |
| `onUnauthenticated` | `() => void`              | sí   |               | Ir al login (p. ej. `window.location.href = AUTH_URL`).                                                                                                                    |
| `verify`            | `() => Promise<T>`        | sí   |               | Confirma la sesión con el servidor (p. ej. `GET /me`). Si rechaza, se va al login.                                                                                         |
| `brand`             | `ReactNode`               |      |               | Marca de la organización sobre el texto (logo o nombre).                                                                                                                   |
| `labels`            | `Partial<AuthGateLabels>` |      |               | Textos; por defecto en español.                                                                                                                                            |
| `logoutEvent`       | `string \| false`         |      | `auth:logout` | Evento global que indica que la sesión terminó (un 401 a mitad de uso). Al recibirlo se oculta la app tras la pantalla neutra y se va al login. Por defecto "auth:logout". |

## AuthScreen

Pantalla neutra a pantalla completa: sin datos ni estructura de la app.

| Prop    | Tipo        | Req. | Por defecto | Descripción |
| ------- | ----------- | ---- | ----------- | ----------- |
| `label` | `string`    | sí   |             |             |
| `brand` | `ReactNode` |      |             |             |

Tipos: `AuthGateProps`, `AuthGateLabels`.

<!-- catalogo:fin -->
