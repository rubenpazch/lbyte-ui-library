# PrescriptionEyeCard

Generated component package.

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

Datos de un ojo de la receta óptica (PrescriptionEyeCard) y campo individual (PrescriptionFieldCard).

- **Usar cuando:** Mostrar o comparar los valores de un ojo en apps de óptica.
- **Evitar cuando:** Cualquier dato que no sea una receta óptica.

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/prescription-eye-card
```

## PrescriptionEyeCard

| Prop              | Tipo                                         | Req. | Por defecto | Descripción |
| ----------------- | -------------------------------------------- | ---- | ----------- | ----------- |
| `eye`             | `"OD" \| "OI"`                               | sí   |             |             |
| `eyeInfo`         | `PrescriptionEyeInfo`                        | sí   |             |             |
| `labels`          | `PrescriptionEyeCardLabels`                  | sí   |             |             |
| `prismBaseLookup` | `{ getNameByKey: (key: string) => string; }` | sí   |             |             |

<!-- catalogo:fin -->
