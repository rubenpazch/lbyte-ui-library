---
"@rubenpazch/button": patch
"@rubenpazch/alert": minor
---

- `Button`: `type="button"` por defecto. Antes, un `Button` sin `type` dentro de un `<form>` lo enviaba (en HTML el tipo por defecto es `submit`). Para enviar, usa `type="submit"`.
- `Alert`: prop `role` para avisos fijos (`"note"`), que no se anuncian como urgentes.
