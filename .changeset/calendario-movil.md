---
"@rubenpazch/date-input": minor
"@rubenpazch/date-picker": minor
"@rubenpazch/shared": minor
"@rubenpazch/ui": minor
---

Calendario a pantalla completa en celulares (< 640 px) en `DateInput` y `DatePicker`: barra con el nombre del campo y "Cerrar", días más grandes para el dedo, sin teclado virtual (`inputMode="none"`), sin scroll detrás y con el foco dentro; al elegir la fecha se cierra y vuelve al campo. En escritorio no cambia. Se desactiva con `mobileFullScreen={false}`. `shared` suma `useMediaQuery` y `MOBILE_QUERY`.
