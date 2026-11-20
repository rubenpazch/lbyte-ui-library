import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import FormField from "./FormField";
import { FormRow, FormActions } from "./FormField";
const meta: Meta<typeof FormField> = {
  title: "Formularios/FormField",
  component: FormField,
  tags: ["autodocs"],
};
export default meta;

export const Ejemplo: StoryObj<typeof FormField> = {
  render: () => (
    <>
      <form style={{ maxWidth: 560, display: "grid", gap: 16 }}>
        <FormRow>
          <FormField label="RUC" hint="11 dígitos" required>
            <input />
          </FormField>
          <FormField label="Razón social" error="Obligatorio">
            <input />
          </FormField>
        </FormRow>
        <FormActions>
          <button type="button">Cancelar</button>
          <button type="submit">Guardar</button>
        </FormActions>
      </form>
    </>
  ),
};
