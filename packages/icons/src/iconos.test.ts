import * as Exportados from "./index";
import { ICONOS } from "./iconos";

const exportados = Object.keys(Exportados).filter((k) => k.endsWith("Icon"));

it("cada icono exportado tiene metadatos en iconos.ts", () => {
  const conInfo = new Set(ICONOS.map((i) => i.nombre));
  expect(exportados.filter((n) => !conInfo.has(n))).toEqual([]);
});

it("los metadatos no nombran iconos que no existen ni se repiten", () => {
  const nombres = ICONOS.map((i) => i.nombre);
  expect(nombres.filter((n) => !exportados.includes(n))).toEqual([]);
  expect(new Set(nombres).size).toBe(nombres.length);
});

it("cada icono tiene palabras clave y uso", () => {
  for (const i of ICONOS) {
    expect(i.palabras.length).toBeGreaterThan(0);
    expect(i.usarPara.length).toBeGreaterThan(5);
  }
});
