import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Flex, { Inline, Spacer, Stack, type FlexProps } from "./Flex";
import { Grid, GridItem } from "./Grid";
import { Center } from "./Center";
import { Container } from "./Container";

// Solo para la demo: cajas visibles. En una app irían Card, Button, etc.
const Caja = ({
  children,
  alto,
}: {
  children?: React.ReactNode;
  alto?: string;
}) => (
  <div
    style={{
      padding: "var(--lb-space-3)",
      minHeight: alto,
      background: "var(--lb-color-primary-subtle)",
      border: "1px solid var(--lb-color-primary-border)",
      borderRadius: "var(--lb-radius-md)",
      fontFamily: "var(--lb-font-sans)",
      fontSize: "var(--lb-font-size-sm)",
    }}
  >
    {children}
  </div>
);

const Marco = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      border: "1px dashed var(--lb-color-border)",
      borderRadius: "var(--lb-radius-md)",
    }}
  >
    {children}
  </div>
);

const meta: Meta<FlexProps> = {
  title: "Maquetación/Flex",
  component: Flex as any,
  tags: ["autodocs"],
  args: {
    direction: "row",
    gap: 4,
    align: "center",
    justify: "start",
    wrap: false,
    padding: 4,
  },
  argTypes: {
    direction: {
      control: "inline-radio",
      options: ["row", "column", "row-reverse", "column-reverse"],
    },
    gap: { control: "select", options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16] },
    padding: {
      control: "select",
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    align: {
      control: "inline-radio",
      options: ["start", "center", "end", "stretch", "baseline"],
    },
    justify: {
      control: "inline-radio",
      options: ["start", "center", "end", "between", "around", "evenly"],
    },
  },
};
export default meta;

/** Juega con las props: dirección, espacio, alineación y distribución. */
export const Playground: StoryObj<FlexProps> = {
  render: (args) => (
    <Marco>
      <Flex {...args} style={{ minHeight: "12rem" }}>
        <Caja>Uno</Caja>
        <Caja alto="5rem">Dos (más alto)</Caja>
        <Caja>Tres</Caja>
      </Flex>
    </Marco>
  ),
};

/** Columna en móvil, fila desde `md` (768px). Cambia el ancho de la vista para verlo. */
export const Responsive: StoryObj = {
  render: () => (
    <Flex direction={{ base: "column", md: "row" }} gap={{ base: 2, md: 6 }}>
      <Caja>Filtros</Caja>
      <Flex grow>
        <Caja>Contenido (ocupa el resto con `grow`)</Caja>
      </Flex>
      <Flex hide={{ base: true, lg: false }}>
        <Caja>Solo desde lg</Caja>
      </Flex>
    </Flex>
  ),
};

export const StackVertical: StoryObj = {
  name: "Stack",
  render: () => (
    <Stack gap={3}>
      <Caja>Sección 1</Caja>
      <Caja>Sección 2</Caja>
      <Caja>Sección 3</Caja>
    </Stack>
  ),
};

export const InlineConSpacer: StoryObj = {
  name: "Inline + Spacer",
  render: () => (
    <Stack gap={6}>
      <Inline>
        <Caja>Logo</Caja>
        <Spacer />
        <Caja>Ayuda</Caja>
        <Caja>Salir</Caja>
      </Inline>
      <Inline justify="end">
        <Caja>Cancelar</Caja>
        <Caja>Guardar</Caja>
      </Inline>
      <Inline gap={1}>
        {["Lima", "Arequipa", "Cusco", "Trujillo", "Piura", "Chiclayo"].map(
          (c) => (
            <Caja key={c}>{c}</Caja>
          ),
        )}
      </Inline>
    </Stack>
  ),
};

export const CentrarPantalla: StoryObj = {
  name: "Center",
  render: () => (
    <Stack gap={6}>
      <Marco>
        <Center minHeight="16rem" gap={2} centerText>
          <Caja>Centrado en ambos ejes</Caja>
          <Caja>(p. ej. un login con minHeight=&quot;screen&quot;)</Caja>
        </Center>
      </Marco>
      <Marco>
        <Center axis="horizontal" padding={4}>
          <Caja>Solo horizontal</Caja>
        </Center>
      </Marco>
    </Stack>
  ),
};

export const GrillaFija: StoryObj = {
  name: "Grid: columnas fijas",
  render: () => (
    <Grid columns={{ base: 1, sm: 2, lg: 4 }}>
      <Caja>1</Caja>
      <Caja>2</Caja>
      <GridItem span={{ base: "full", lg: 2 }}>
        <Caja>Ocupa 2 columnas en lg, toda la fila antes</Caja>
      </GridItem>
      <Caja>4</Caja>
      <Caja>5</Caja>
    </Grid>
  ),
};

export const GrillaAutomatica: StoryObj = {
  name: "Grid: columnas automáticas",
  render: () => (
    <Grid minItemWidth="12rem" gap={3}>
      {Array.from({ length: 7 }, (_, i) => (
        <Caja key={i}>Tarjeta {i + 1}</Caja>
      ))}
    </Grid>
  ),
};

export const Pagina: StoryObj = {
  name: "Página completa",
  render: () => (
    <Container size="md" paddingY={6}>
      <Stack gap={6}>
        <Inline justify="between">
          <Caja>Título de la página</Caja>
          <Caja>Acción principal</Caja>
        </Inline>
        <Grid columns={{ base: 1, md: 3 }}>
          <Caja>Indicador</Caja>
          <Caja>Indicador</Caja>
          <Caja>Indicador</Caja>
        </Grid>
        <Caja alto="8rem">Contenido</Caja>
      </Stack>
    </Container>
  ),
};
