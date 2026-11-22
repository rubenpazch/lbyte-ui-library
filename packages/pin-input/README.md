# @rubenpazch/pin-input

<!-- catalogo:inicio (generado por pnpm catalogo, no editar) -->

PinInput: código de verificación (OTP) o PIN en casillas, con avance automático, pegar el código completo, autocompletado del SMS (one-time-code) y onComplete.

- **Usar cuando:** Códigos de verificación enviados por correo o SMS, segundo factor (2FA), PIN de pocos dígitos.
- **Evitar cuando:** Contraseñas o textos de largo variable: usa TextInput (type="password").

Se recomienda instalar el paquete completo `@rubenpazch/ui` (incluye este). Por separado:

```bash
npm install @rubenpazch/pin-input
```

## PinInput

Código de verificación (OTP) o PIN en casillas: avanza solo al escribir, retrocede con
borrar, acepta pegar el código completo y el autocompletado del SMS en móviles.

| Prop         | Tipo                                        | Req. | Por defecto                             | Descripción                                                                                    |
| ------------ | ------------------------------------------- | ---- | --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `onChange`   | `(value: string) => void`                   | sí   |                                         | Recibe el código cada vez que cambia.                                                          |
| `value`      | `string`                                    | sí   |                                         | Código escrito hasta ahora (sin huecos: "12" son las dos primeras casillas).                   |
| `autoFocus`  | `boolean`                                   |      | `false`                                 | Pone el foco en la primera casilla vacía al montar.                                            |
| `boxLabel`   | `(index: number, length: number) => string` |      | `(i, n) => `Carácter ${i + 1} de ${n}`` | Nombre accesible de cada casilla. Por defecto "Carácter 1 de 6".                               |
| `className`  | `string`                                    |      |                                         | Clase extra del contenedor.                                                                    |
| `disabled`   | `boolean`                                   |      | `false`                                 | Deshabilita las casillas.                                                                      |
| `error`      | `string`                                    |      |                                         | Mensaje de error; marca las casillas en rojo.                                                  |
| `groupSize`  | `number`                                    |      |                                         | Separa las casillas en grupos de este tamaño (3 → `123 – 456`).                                |
| `hint`       | `string`                                    |      |                                         | Texto de ayuda ("Te lo enviamos por correo").                                                  |
| `id`         | `string`                                    |      |                                         | id de la primera casilla (la etiqueta apunta a ella).                                          |
| `label`      | `string`                                    |      |                                         | Etiqueta del grupo ("Código de verificación").                                                 |
| `length`     | `number`                                    |      | `6`                                     | Número de casillas. Por defecto 6.                                                             |
| `mask`       | `boolean`                                   |      | `false`                                 | Oculta lo escrito como en una contraseña (PIN).                                                |
| `name`       | `string`                                    |      |                                         | name de un input oculto con el código completo (formularios nativos).                          |
| `onComplete` | `(value: string) => void`                   |      |                                         | Se llama una vez cuando se completan todas las casillas (p. ej. para enviar).                  |
| `required`   | `boolean`                                   |      | `false`                                 | Campo obligatorio.                                                                             |
| `size`       | `"sm" \| "md" \| "lg"`                      |      | `md`                                    | Tamaño de las casillas.                                                                        |
| `type`       | `"numeric" \| "alphanumeric"`               |      | `numeric`                               | `numeric` (solo dígitos, teclado numérico) o `alphanumeric` (letras y números, en mayúsculas). |

Tipos: `PinInputProps`.

<!-- catalogo:fin -->
