# Avatar

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Avatar de persona (imagen, iniciales o icono) y AvatarGroup para varios.

- **Usar cuando:** Mostrar quién es un usuario, autor o responsable.
- **Evitar cuando:** Logos o imágenes de contenido: usa <img>.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/avatar
```

## Avatar

| Prop        | Tipo                                        | Req. | Por defecto | Descripción                                       |
| ----------- | ------------------------------------------- | ---- | ----------- | ------------------------------------------------- |
| `alt`       | `string`                                    |      | ``          | Alt text for image                                |
| `children`  | `ReactNode`                                 |      |             | Children - can be text, icon, or fallback content |
| `component` | `ElementType<any, keyof IntrinsicElements>` |      | `div`       | Custom component to use instead of default div    |
| `loading`   | `"eager" \| "lazy"`                         |      |             | Image loading strategy                            |
| `onError`   | `ReactEventHandler<HTMLImageElement>`       |      |             | Callback fired when image fails to load           |
| `onLoad`    | `ReactEventHandler<HTMLImageElement>`       |      |             | Callback fired when image loads successfully      |
| `size`      | `"xs" \| "sm" \| "md" \| "lg" \| "xl"`      |      | `md`        | Size of the avatar                                |
| `sizes`     | `string`                                    |      |             | Custom sizes object for more control              |
| `src`       | `string`                                    |      |             | Image source URL                                  |
| `srcSet`    | `string`                                    |      |             | Image srcset for responsive images                |
| `variant`   | `"circular" \| "rounded" \| "square"`       |      | `circular`  | Shape variant of the avatar                       |

## AvatarGroup

| Prop            | Tipo                             | Req. | Por defecto | Descripción                                         |
| --------------- | -------------------------------- | ---- | ----------- | --------------------------------------------------- |
| `children`      | `ReactNode`                      | sí   |             | Avatar children to display                          |
| `max`           | `number`                         |      |             | Maximum number of avatars to show before showing +X |
| `renderSurplus` | `(surplus: number) => ReactNode` |      |             | Custom render function for surplus count            |
| `spacing`       | `number \| "small" \| "medium"`  |      | `medium`    | Spacing between avatars                             |
| `total`         | `number`                         |      |             | Total number of avatars (for showing +X count)      |

Tipos: `AvatarProps`, `AvatarSize`, `AvatarVariant`, `AvatarGroupProps`, `AvatarGroupSpacing`.

<!-- catalogo:fin -->
