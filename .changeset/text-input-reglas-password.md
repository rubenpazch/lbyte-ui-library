---
"@rubenpazch/text-input": minor
"@rubenpazch/ui": minor
---

TextInput: `passwordRules` para validar una contraseña nueva con las reglas de tu backend
(`{ id, label, test }`). Se muestran como lista bajo el campo desde el inicio, se marcan al
cumplirse y cuentan para `onValidityChange`. Reemplazan al medidor por composición
(`showPasswordStrength`), así una frase larga sin mayúsculas ni símbolos puede ser válida.
`passwordRulesLabels` cambia el título y el estado que leen los lectores de pantalla.
Sin `passwordRules`, el campo funciona igual que antes.
