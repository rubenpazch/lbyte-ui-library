# Publicar en npm

## Cómo funciona hoy

1. Cada PR con cambios en un paquete lleva un **changeset** (`pnpm changeset`).
2. Al integrar en `main`, `release.yml` abre (o actualiza) el PR **"chore: version packages"**.
3. Al integrar ese PR, `release.yml` publica en npm las versiones nuevas y, si publicó algo,
   despliega Storybook en https://ui.lbyte.pe.

La autenticación con npm puede ser de dos formas; `release.yml` elige según la variable
`NPM_TRUSTED_PUBLISHING` del repositorio:

| Variable `NPM_TRUSTED_PUBLISHING` | Cómo se autentica                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| no existe (estado actual)         | token `NPM_TOKEN_UI_LIBRARY` (granular, salta 2FA; **npm lo revoca en enero de 2027**)             |
| `true`                            | **Trusted Publishing (OIDC)**: GitHub Actions se identifica ante npm; no hay ningún token guardado |

## Pasar a Trusted Publishing (hacerlo antes de enero de 2027)

Trusted Publishing le dice a npm: "confía en las publicaciones que vengan del workflow
`release.yml` del repo `rubenpazch/lbyte-ui-library`". Se configura **una vez por paquete**.
El script `scripts/trusted-publishing.mjs` lo hace para todos.

### 1. Inicia sesión en npm (en tu PC, con la cuenta dueña de los paquetes)

```bash
npm login --auth-type=web
```

Se abre el navegador; entra y confirma con tu 2FA. En la pantalla de 2FA, marca la opción de
no volver a pedirlo durante unos minutos si aparece: así el paso 3 no te pide un código por paquete.

### 2. Prueba sin cambiar nada

```bash
pnpm trusted-publishing --dry-run
```

Lista los ~52 paquetes y lo que haría con cada uno.

### 3. Configura todos los paquetes

```bash
pnpm trusted-publishing
```

- Si npm pide un código 2FA, escríbelo en la terminal (o confirma en el navegador).
- Es **idempotente**: si se corta o algún paquete falla, vuelve a ejecutarlo y solo hará los que falten.
- Al final muestra `Configurados: N · ya estaban: M · fallidos: 0`.

Para ver uno: `npx npm@latest trust list @rubenpazch/button`.
En la web: npmjs.com → paquete → **Settings → Trusted Publisher**.

### 4. Activa el modo OIDC en GitHub

```bash
gh variable set NPM_TRUSTED_PUBLISHING --body true --repo rubenpazch/lbyte-ui-library
```

(o en GitHub: _Settings → Secrets and variables → Actions → **Variables** → New repository variable_).

### 5. Comprueba con la siguiente publicación

Al integrar el próximo "chore: version packages", el log del job **Release** no debe decir
`creating one with NPM_TOKEN`, y la página del paquete en npm mostrará la insignia de
**provenance** enlazando al commit.

Si falla, borra la variable (`gh variable delete NPM_TRUSTED_PUBLISHING --repo rubenpazch/lbyte-ui-library`)
y se vuelve al token sin tocar código.

### 6. Limpia

Cuando una publicación por OIDC haya salido bien:

- Borra los secrets `NPM_TOKEN_UI_LIBRARY` y `NPM_TOKEN` del repo, y el Environment `NPM_TOKEN`.
- Revoca el token en npmjs.com → _Access Tokens_.
- Opcional, más estricto: en cada paquete, _Settings → Publishing access →
  "Require two-factor authentication and disallow tokens"_. Trusted Publishing sigue funcionando.

## Paquetes nuevos

Un paquete que **todavía no existe en npm** no se puede configurar con Trusted Publishing.
Al crear uno:

1. Se publica la primera vez con el flujo normal. Si el repo ya está en modo OIDC, publícalo
   una vez desde tu PC: `cd packages/<paquete> && npm publish --access public`.
2. Después: `pnpm trusted-publishing` (solo configura el nuevo).

## Requisitos (ya cumplidos en `release.yml`)

- `permissions: id-token: write` en el job.
- npm ≥ 11.5.1 (el workflow ejecuta `npm install -g npm@11`).
- Runner alojado por GitHub (`ubuntu-latest`).
- `repository.url` en cada `package.json` apuntando a este repo (`pnpm catalogo:check` lo valida).
