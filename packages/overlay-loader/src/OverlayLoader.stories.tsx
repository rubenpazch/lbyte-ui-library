import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import OverlayLoader from "./OverlayLoader";
import InlineLoader from "./InlineLoader";

const meta: Meta<typeof OverlayLoader> = {
  title: "Retroalimentación/OverlayLoader",
  component: OverlayLoader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "`OverlayLoader` cubre la pantalla mientras se procesa algo que bloquea (guardar, emitir comprobante). `InlineLoader` muestra la carga dentro de una sección. Para listas que cargan usa `Skeleton`.",
      },
      story: { inline: false, iframeHeight: 320 },
    },
  },
  args: {
    visible: true,
    title: "Guardando",
    message: "Esto puede tardar unos segundos…",
    variant: "default",
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "success", "danger"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof OverlayLoader>;

export const Overlay: Story = {};

export const EnLinea: StoryObj<typeof InlineLoader> = {
  name: "InlineLoader (en una sección)",
  render: () => (
    <div style={{ padding: 24, display: "grid", gap: 16 }}>
      <div
        style={{ height: 160, border: "1px solid #e4e4e7", borderRadius: 8 }}
      >
        <InlineLoader message="Cargando pagos…" fill />
      </div>
      <InlineLoader message="Sincronizando" variant="success" />
    </div>
  ),
};
