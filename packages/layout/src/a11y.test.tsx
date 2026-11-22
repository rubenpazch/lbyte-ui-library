import React from "react";
import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);
import { Inline, Spacer, Stack } from "./Flex";
import { Grid, GridItem } from "./Grid";
import { Container } from "./Container";

// Accesibilidad automática (axe): debe pasar sin violaciones.
it("no tiene problemas de accesibilidad (axe)", async () => {
  render(
    <Container as="main">
      <Stack>
        <Inline as="header">
          <h1>Clientes</h1>
          <Spacer />
          <button type="button">Nuevo</button>
        </Inline>
        <Grid as="ul" columns={{ base: 1, md: 3 }}>
          <GridItem as="li">Uno</GridItem>
          <GridItem as="li" span={2}>
            Dos
          </GridItem>
        </Grid>
      </Stack>
    </Container>,
  );
  const resultado = await axe(document.body, {
    rules: { region: { enabled: false } },
  });
  expect(resultado).toHaveNoViolations();
});
