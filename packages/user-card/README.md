# @rubenpazch/user-card

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Tarjeta de una persona (usuario, socio, cliente): avatar, nombre, correo u otro dato, etiquetas y acciones; las secundarias van en un menú ⋮.

- **Usar cuando:** Listas de personas en cuadrícula: usuarios de un panel, socios, clientes, pacientes.
- **Evitar cuando:** Listas largas o con muchas columnas para comparar: usa DataTable.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/user-card
```

## UserCard

Tarjeta de una persona: avatar, nombre, dato secundario, etiquetas y acciones.
Las acciones principales se ven en el pie; las secundarias van en un menú ⋮ para que la
tarjeta no se llene de botones.

| Prop        | Tipo                         | Req. | Por defecto | Descripción                                                            |
| ----------- | ---------------------------- | ---- | ----------- | ---------------------------------------------------------------------- |
| `name`      | `string`                     | sí   |             | Nombre visible.                                                        |
| `actions`   | `ReactNode`                  |      |             | Acciones principales visibles en el pie (una o dos `Button`).          |
| `as`        | `"article" \| "li" \| "div"` |      | `article`   |                                                                        |
| `avatarSrc` | `string`                     |      |             | Foto. Sin ella se muestran las iniciales del nombre.                   |
| `badges`    | `ReactNode`                  |      |             | Etiquetas (normalmente `Badge`): rol, estado, módulos…                 |
| `children`  | `ReactNode`                  |      |             | Contenido extra entre las etiquetas y el pie.                          |
| `className` | `string`                     |      |             |                                                                        |
| `menuItems` | `MenuItem[]`                 |      |             | Acciones secundarias en el menú ⋮ (editar contraseña, eliminar…).      |
| `menuLabel` | `string`                     |      |             | Texto accesible del botón ⋮. Por defecto "Más acciones para <nombre>". |
| `muted`     | `boolean`                    |      | `false`     | Atenúa la tarjeta (p. ej. usuario inactivo).                           |
| `subtitle`  | `ReactNode`                  |      |             | Dato secundario bajo el nombre: correo, documento, cargo…              |

Otras exportaciones: `initials`.

Tipos: `UserCardProps`.

<!-- catalogo:fin -->
