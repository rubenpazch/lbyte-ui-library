# @rubenpazch/pin-input

## 0.1.0

### Minor Changes

- 0564acb: Formularios:

  - `TextInput`: `startAddon` y `endAddon`, bloques pegados al campo (texto como "S/" o ".pe", o un
    botón). Un texto pegado se agrega a la descripción accesible del campo.
  - `CheckboxGroup` (en `@rubenpazch/checkbox-input`): grupo de casillas con `fieldset`/`legend`,
    ayuda, error, "Seleccionar todos" (indeterminado), `maxSelected`, `columns` y `name` para
    formularios nativos.
  - Nuevo paquete `@rubenpazch/pin-input`: `PinInput` para códigos OTP o PIN, con avance automático,
    borrar hacia atrás, flechas, pegar el código completo, `autocomplete="one-time-code"`,
    `onComplete`, `mask`, `groupSize` y modo alfanumérico.
