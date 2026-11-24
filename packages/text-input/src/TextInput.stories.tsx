import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { EmailIcon, PhoneIcon, UsersIcon } from "@rubenpazch/icons";
import TextInput, { type TextInputProps } from "./TextInput";

// Mock function for action logging in Storybook
const fn = () => () => {};

const meta: Meta<TextInputProps> = {
  title: "Formularios/TextInput",
  component: TextInput as any,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
TextInput is a versatile input component with built-in validation, character counting, and password strength checking.

**Features:**
- Email validation with typo suggestions
- Password strength indicator
- Character counter with visual feedback
- Error and warning states
- Icon support
- Multiple input types (text, email, password, tel, url)
- Accessibility support

**Usage:**
\`\`\`tsx
<TextInput
  label="Email"
  value={email}
  onChange={setEmail}
  type="email"
  validateEmail
  required
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: "text",
      description: "Current value of the input",
    },
    onChange: {
      action: "changed",
      description: "Callback when value changes",
    },
    label: {
      control: "text",
      description: "Label text displayed above the input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    type: {
      control: "select",
      options: ["text", "email", "tel", "password", "url"],
      description: "Input type",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    warning: {
      control: "text",
      description: "Warning message to display",
    },
    hint: {
      control: "text",
      description: "Hint text displayed below input",
    },
    required: {
      control: "boolean",
      description: "Shows required asterisk",
    },
    disabled: {
      control: "boolean",
      description: "Disables the input",
    },
    validateEmail: {
      control: "boolean",
      description: "Enables email validation",
    },
    showPasswordStrength: {
      control: "boolean",
      description: "Shows password strength indicator",
    },
    passwordRules: {
      control: false,
      description:
        "Reglas propias de la contraseña ({ id, label, test }); reemplazan al medidor por composición",
    },
    maxLength: {
      control: "number",
      description: "Maximum character length",
    },
    requiredMessage: {
      control: "text",
      description: "Custom message for required fields",
    },
  },
};

export default meta;
type Story = StoryObj<TextInputProps>;

// Default story
export const Default: Story = {
  args: {
    value: "",
    onChange: fn(),
    placeholder: "Enter text...",
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: "Username",
    value: "",
    onChange: fn(),
    placeholder: "johndoe",
  },
};

// Required field
export const Required: Story = {
  args: {
    label: "Email Address",
    value: "",
    onChange: fn(),
    placeholder: "john@example.com",
    required: true,
    requiredMessage: "Este campo es obligatorio",
    type: "email",
  },
};

export const RequiredMessage: Story = {
  args: {
    label: "Full Name",
    value: "",
    onChange: fn(),
    placeholder: "John Doe",
    required: true,
    requiredMessage: "Por favor ingrese su nombre completo",
  },
};

// With error
export const WithError: Story = {
  args: {
    label: "Username",
    value: "ab",
    onChange: fn(),
    error: "Username must be at least 3 characters",
  },
};

// With hint
export const WithHint: Story = {
  args: {
    label: "Password",
    value: "",
    onChange: fn(),
    type: "password",
    hint: "Password must be at least 8 characters",
  },
};

export const WithIcon: Story = {
  args: {
    label: "Email",
    value: "",
    onChange: fn(),
    placeholder: "john@example.com",
    type: "email",
    icon: <EmailIcon size="sm" />,
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "Cannot edit this",
    onChange: fn(),
    disabled: true,
  },
};

// Email validation
export const EmailValidation: Story = {
  render: (args) => {
    const [email, setEmail] = useState("");

    return (
      <div className="space-y-4">
        <TextInput
          {...args}
          value={email}
          onChange={setEmail}
          label="Email Address"
          type="email"
          validateEmail
          required
          placeholder="john@example.com"
        />

        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Try these examples:</h3>
          <ul className="text-sm space-y-1">
            <li>• Valid: test@gmail.com</li>
            <li>• Typo suggestion: test@gmial.com</li>
            <li>• Invalid: notanemail</li>
          </ul>
        </div>
      </div>
    );
  },
  args: {
    value: "",
    onChange: fn(),
  },
};

// Email with typo suggestion
export const EmailWithTypoSuggestion: Story = {
  args: {
    label: "Email",
    value: "user@gmial.com",
    onChange: fn(),
    type: "email",
    validateEmail: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates automatic typo detection and correction suggestions for common email domains.",
      },
    },
  },
};

// Valid email
export const ValidEmail: Story = {
  args: {
    label: "Email",
    value: "user@example.com",
    onChange: fn(),
    type: "email",
    validateEmail: true,
  },
};

// Contraseña con las reglas del backend (passwordRules)
export const PasswordRules: Story = {
  render: (args) => {
    const [password, setPassword] = useState("");
    const [valida, setValida] = useState(false);

    return (
      <div className="space-y-4">
        <TextInput
          {...args}
          value={password}
          onChange={setPassword}
          onValidityChange={setValida}
          label="Contraseña nueva"
          type="password"
          autoComplete="new-password"
          required
          passwordRules={[
            {
              id: "largo",
              label: "12 caracteres o más",
              test: (v) => v.length >= 12,
            },
            {
              id: "bordes",
              label: "Sin espacios al inicio ni al final",
              test: (v) => v.length > 0 && v === v.trim(),
            },
            {
              id: "app",
              label: "Que no contenga el nombre de la app",
              test: (v) => v.length > 0 && !/cienciano/i.test(v),
            },
          ]}
        />
        <p className="text-sm">
          {valida ? "Lista para guardar." : "Aún no cumple todas las reglas."}
        </p>
      </div>
    );
  },
  args: {
    value: "",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Las reglas vienen de la app (por ejemplo, de la política del backend). Se ven desde el inicio, se marcan al cumplirse y `onValidityChange` solo da true cuando se cumplen todas. Reemplazan al medidor por composición: una frase larga como «mi perro come mango» es válida sin mayúsculas ni símbolos.",
      },
    },
  },
};

// Password with strength indicator
export const PasswordStrength: Story = {
  render: (args) => {
    const [password, setPassword] = useState("");

    return (
      <div className="space-y-4">
        <TextInput
          {...args}
          value={password}
          onChange={setPassword}
          label="Create Password"
          type="password"
          showPasswordStrength
          required
          placeholder="Enter a strong password"
        />

        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Try these passwords:</h3>
          <ul className="text-sm space-y-1">
            <li>• Weak: abc</li>
            <li>• Fair: Test123</li>
            <li>• Strong: MyP@ssw0rd!</li>
            <li>• Very Strong: MySecureP@ssw0rd2024!</li>
          </ul>
        </div>
      </div>
    );
  },
  args: {
    value: "",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows real-time password strength evaluation with visual indicators and requirement checklist.",
      },
    },
  },
};

// Max length with character counter
export const WithMaxLength: Story = {
  render: (args) => {
    const [text, setText] = useState("");

    return (
      <TextInput
        {...args}
        value={text}
        onChange={setText}
        label="Short Description"
        placeholder="Enter up to 100 characters"
        maxLength={100}
        hint="Brief description of your product"
      />
    );
  },
  args: {
    value: "",
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Displays character counter with color coding: normal (blue), warning (amber at 80%), error (red at 100%).",
      },
    },
  },
};

export const WithPattern: Story = {
  render: (args) => {
    const [username, setUsername] = useState("");
    const [touched, setTouched] = useState(false);
    const pattern = "^[a-zA-Z0-9_]+$";
    const hasError =
      touched && username.length > 0 && !new RegExp(pattern).test(username);

    return (
      <TextInput
        {...args}
        value={username}
        onChange={setUsername}
        onBlur={() => setTouched(true)}
        label="Username"
        placeholder="john_doe"
        pattern={pattern}
        error={hasError ? "Solo letras, números y guiones bajos" : ""}
        hint="Usa solo letras, números y _"
      />
    );
  },
  args: {
    value: "",
    onChange: fn(),
  },
};

// Different input types
export const TelephoneNumber: Story = {
  args: {
    label: "Phone Number",
    value: "",
    onChange: fn(),
    type: "tel",
    placeholder: "+1 (555) 123-4567",
  },
};

export const Website: Story = {
  args: {
    label: "Website URL",
    value: "",
    onChange: fn(),
    type: "url",
    placeholder: "https://example.com",
  },
};

// Form example
export const CompleteForm: Story = {
  args: {
    value: "",
    onChange: fn(),
  },
  render: () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      password: "",
      website: "",
      bio: "",
      referral: "REF-2024",
    });
    const [touched, setTouched] = useState({
      name: false,
      email: false,
      phone: false,
      password: false,
      website: false,
      bio: false,
    });

    const handleChange = (field: string) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleBlur = (field: keyof typeof touched) => () => {
      setTouched((prev) => ({ ...prev, [field]: true }));
    };

    const errors = {
      name:
        touched.name && formData.name.trim().length < 3
          ? "El nombre debe tener al menos 3 caracteres"
          : "",
      email:
        touched.email && formData.email.trim().length === 0
          ? "El correo es obligatorio"
          : "",
      phone:
        touched.phone &&
        formData.phone &&
        !/^\+?[0-9\s()-]+$/.test(formData.phone)
          ? "Formato de teléfono inválido"
          : "",
      password:
        touched.password && formData.password.length < 8
          ? "La contraseña debe tener al menos 8 caracteres"
          : "",
      website:
        touched.website &&
        formData.website &&
        !/^https?:\/\/.+/.test(formData.website)
          ? "La URL debe iniciar con http:// o https://"
          : "",
      bio:
        touched.bio && formData.bio.length > 120
          ? "La biografía supera el límite"
          : "",
    };

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            User Registration
          </h2>

          <div className="space-y-6">
            <TextInput
              label="Full Name"
              value={formData.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              placeholder="John Doe"
              required
              requiredMessage="El nombre es obligatorio"
              error={errors.name}
              icon={<UsersIcon size="sm" />}
            />

            <TextInput
              label="Email Address"
              value={formData.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              type="email"
              validateEmail={touched.email}
              placeholder="john@example.com"
              required
              requiredMessage="El correo es obligatorio"
              error={errors.email}
              icon={<EmailIcon size="sm" />}
            />

            <TextInput
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange("phone")}
              onBlur={handleBlur("phone")}
              type="tel"
              placeholder="+1 (555) 123-4567"
              error={errors.phone}
              icon={<PhoneIcon size="sm" />}
            />

            <TextInput
              label="Password"
              value={formData.password}
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              type="password"
              showPasswordStrength
              required
              hint="Must be at least 8 characters with mixed case, numbers, and symbols"
              error={errors.password}
            />

            <TextInput
              label="Website"
              value={formData.website}
              onChange={handleChange("website")}
              onBlur={handleBlur("website")}
              type="url"
              placeholder="https://yourwebsite.com"
              error={errors.website}
            />

            <TextInput
              label="Short Bio"
              value={formData.bio}
              onChange={handleChange("bio")}
              onBlur={handleBlur("bio")}
              placeholder="Tell us about yourself"
              maxLength={120}
              hint="Máximo 120 caracteres"
              error={errors.bio}
            />

            <TextInput
              label="Referral Code"
              value={formData.referral}
              onChange={handleChange("referral")}
              disabled
              hint="Campo deshabilitado"
            />

            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete registration form demonstrating various TextInput features working together.",
      },
    },
  },
};

// Interactive playground
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <TextInput {...args} value={value} onChange={setValue} />

        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Current Value:</h3>
          <code className="bg-white px-3 py-1 rounded">
            {value || "(empty)"}
          </code>
        </div>
      </div>
    );
  },
  args: {
    value: "",
    label: "Interactive Input",
    placeholder: "Type something...",
    onChange: fn(),
  },
};

// Ver / ocultar contraseña (activo por defecto con type="password")
export const ContrasenaConBotonVer: Story = {
  name: "Contraseña con botón para ver",
  render: (args) => {
    const [value, setValue] = React.useState("MiClave2026");
    return <TextInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Contraseña",
    type: "password",
    hint: "El ojo muestra u oculta lo escrito; showPasswordToggle={false} lo quita.",
  },
};

// Acción junto a la etiqueta (ayuda, enlace)
export const ConAccionEnLaEtiqueta: Story = {
  name: "Con acción junto a la etiqueta",
  render: (args) => {
    const [value, setValue] = React.useState("");
    return <TextInput {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: "Remitente",
    placeholder: "Nombre o razón social",
    labelAction: (
      <a href="#ayuda" style={{ fontSize: "0.8125rem" }}>
        ¿Qué es el remitente?
      </a>
    ),
  },
};

// Bloques pegados al campo (input group)
export const ConBloquesPegados: Story = {
  name: "Con bloques pegados (startAddon / endAddon)",
  render: () => {
    const [monto, setMonto] = React.useState("150.00");
    const [dominio, setDominio] = React.useState("miempresa");
    const [ruc, setRuc] = React.useState("");
    return (
      <div style={{ display: "grid", gap: 16, maxWidth: 420 }}>
        <TextInput
          label="Monto"
          value={monto}
          onChange={setMonto}
          startAddon="S/"
          inputMode="decimal"
        />
        <TextInput
          label="Dominio"
          value={dominio}
          onChange={setDominio}
          startAddon="https://"
          endAddon=".pe"
        />
        <TextInput
          label="RUC"
          value={ruc}
          onChange={setRuc}
          placeholder="11 dígitos"
          endAddon={
            <button
              type="button"
              style={{
                padding: "0 var(--lb-space-4)",
                border: 0,
                background: "var(--lb-color-primary)",
                color: "var(--lb-color-primary-foreground)",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Buscar
            </button>
          }
        />
        <TextInput
          label="Peso"
          value="72"
          onChange={() => {}}
          endAddon="kg"
          error="Fuera de rango"
        />
      </div>
    );
  },
};
