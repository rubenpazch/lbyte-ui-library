import React, { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import * as Exportados from "./index";
import { ICONOS, type CategoriaIcono } from "./iconos";

const CATEGORIAS: Record<CategoriaIcono, string> = {
  acciones: "Acciones",
  navegacion: "Navegación",
  estado: "Estado",
  archivos: "Archivos",
  comunicacion: "Comunicación",
  personas: "Personas",
  dinero: "Dinero",
  salud: "Salud",
  lugares: "Lugares",
  otros: "Otros",
};

type Tamano = "sm" | "md" | "lg";
type IconoComponente = React.ComponentType<{
  size?: Tamano;
  className?: string;
}>;

const sinTildes = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function GaleriaIconos({ tamano, color }: { tamano: Tamano; color: string }) {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState<CategoriaIcono | "">("");
  const [copiado, setCopiado] = useState<string | null>(null);

  const visibles = useMemo(() => {
    const q = sinTildes(busqueda.trim());
    return ICONOS.filter(
      (ic) =>
        (!categoria || ic.categoria === categoria) &&
        (!q ||
          sinTildes(ic.nombre).includes(q) ||
          ic.palabras.some((p) => sinTildes(p).includes(q))),
    );
  }, [busqueda, categoria]);

  const copiar = (nombre: string) => {
    const texto = `import { ${nombre} } from "@rubenpazch/ui";`;
    navigator.clipboard?.writeText(texto).catch(() => {});
    setCopiado(nombre);
    window.setTimeout(() => setCopiado(null), 1500);
  };

  return (
    <div
      style={{
        fontFamily: "var(--lb-font-sans, system-ui)",
        color: "var(--lb-color-foreground, #111)",
      }}
    >
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 16 }}
      >
        <input
          type="search"
          aria-label="Buscar icono"
          placeholder="Buscar: eliminar, pago, paciente…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            flex: "1 1 16rem",
            padding: "8px 12px",
            border: "1px solid #d4d4d8",
            borderRadius: 8,
            font: "inherit",
          }}
        />
        <select
          aria-label="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as CategoriaIcono | "")}
          style={{
            padding: "8px 12px",
            border: "1px solid #d4d4d8",
            borderRadius: 8,
            font: "inherit",
          }}
        >
          <option value="">Todas las categorías</option>
          {Object.entries(CATEGORIAS).map(([valor, texto]) => (
            <option key={valor} value={valor}>
              {texto}
            </option>
          ))}
        </select>
      </div>
      <p style={{ margin: "0 0 12px", fontSize: 13, color: "#71717a" }}>
        {visibles.length} de {ICONOS.length} iconos · clic para copiar el import
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
          gap: 12,
        }}
      >
        {visibles.map((ic) => {
          const Icono = (
            Exportados as unknown as Record<string, IconoComponente>
          )[ic.nombre];
          return (
            <button
              key={ic.nombre}
              type="button"
              onClick={() => copiar(ic.nombre)}
              title={`${ic.usarPara}\nPalabras: ${ic.palabras.join(", ")}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "16px 8px",
                border: "1px solid #e4e4e7",
                borderRadius: 10,
                background: "transparent",
                cursor: "pointer",
                font: "inherit",
                color: "inherit",
              }}
            >
              <span
                style={{ color, display: "inline-flex" }}
                aria-hidden="true"
              >
                {Icono ? <Icono size={tamano} /> : "?"}
              </span>
              <span style={{ fontSize: 12, fontWeight: 600 }}>
                {copiado === ic.nombre ? "¡Copiado!" : ic.nombre}
              </span>
              <span
                style={{ fontSize: 11, color: "#71717a", textAlign: "center" }}
              >
                {ic.usarPara}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const meta: Meta<typeof GaleriaIconos> = {
  title: "Iconos/Galería",
  component: GaleriaIconos,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Todos los iconos de `@rubenpazch/icons` (también exportados por `@rubenpazch/ui`). Busca por nombre o por palabra en español; un clic copia el `import`. Los metadatos salen de `src/iconos.ts`, la misma fuente que usa la IA (`docs/ICONOS.md`).",
      },
    },
  },
  argTypes: {
    tamano: {
      control: "inline-radio",
      options: ["sm", "md", "lg"],
      name: "Tamaño",
    },
    color: { control: "color", name: "Color" },
  },
  args: { tamano: "lg", color: "#2563eb" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Galeria: Story = { name: "Galería" };
