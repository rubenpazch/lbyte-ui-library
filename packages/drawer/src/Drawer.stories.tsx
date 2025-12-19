import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Drawer, { DrawerProps } from "./Drawer";
import Button from "@rubenpazch/button";

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "A flexible drawer component that slides in from any direction with modern styling and accessibility features.",
      },
    },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["left", "right", "top", "bottom"],
      description: "Direction from which the drawer slides in",
    },
    size: {
      control: "select", 
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Size of the drawer",
    },
    variant: {
      control: "select",
      options: ["default", "modal", "persistent", "temporary"],
      description: "Visual variant of the drawer",
    },
    showBackdrop: {
      control: "boolean",
      description: "Whether to show backdrop overlay",
    },
    closeOnBackdropClick: {
      control: "boolean", 
      description: "Whether clicking backdrop closes drawer",
    },
    closeOnEscape: {
      control: "boolean",
      description: "Whether pressing escape closes drawer",
    },
    trapFocus: {
      control: "boolean",
      description: "Whether to trap focus within drawer",
    },
    showCloseButton: {
      control: "boolean",
      description: "Whether to show default close button",
    },
  },
};

export default meta;

// Basic drawer demo component
const DrawerDemo = (props: Partial<DrawerProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        {...props}
      >
        <div style={{ padding: "20px" }}>
          <h3>Drawer Content</h3>
          <p>This is the drawer content. You can put any React elements here.</p>
          <Button onClick={() => setIsOpen(false)} variant="outline">
            Close Drawer
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: () => <DrawerDemo />,
  parameters: {
    docs: {
      description: {
        story: "Default drawer sliding from the right with medium size.",
      },
    },
  },
};

export const Directions: Story = {
  render: () => (
    <div style={{ padding: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <DrawerDemo direction="left" />
      <DrawerDemo direction="right" />
      <DrawerDemo direction="top" />
      <DrawerDemo direction="bottom" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Drawers can slide in from any direction: left, right, top, or bottom.",
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ padding: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <DrawerDemo size="sm" />
      <DrawerDemo size="md" />
      <DrawerDemo size="lg" />
      <DrawerDemo size="xl" />
      <DrawerDemo size="full" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different sizes available: sm (320px), md (400px), lg (500px), xl (600px), and full (100%).",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ padding: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <DrawerDemo variant="default" />
      <DrawerDemo variant="modal" />
      <DrawerDemo variant="persistent" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual variants: default, modal (with backdrop), persistent (no backdrop), and temporary (mobile-friendly).",
      },
    },
  },
};

export const WithoutBackdrop: Story = {
  render: () => <DrawerDemo showBackdrop={false} />,
  parameters: {
    docs: {
      description: {
        story: "Drawer without backdrop overlay.",
      },
    },
  },
};

export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: "20px" }}>
        <Button onClick={() => setIsOpen(true)}>
          Open Navigation Drawer
        </Button>
        
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          direction="left"
          size="md"
          variant="modal"
        >
          <div style={{ 
            padding: "20px", 
            height: "100%", 
            display: "flex", 
            flexDirection: "column" 
          }}>
            <div style={{ 
              borderBottom: "1px solid rgba(255,255,255,0.1)", 
              paddingBottom: "15px",
              marginBottom: "20px"
            }}>
              <h2 style={{ margin: 0, color: "white" }}>Navigation</h2>
            </div>
            
            <nav style={{ flex: 1 }}>
              <ul style={{ 
                listStyle: "none", 
                padding: 0, 
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}>
                <li>
                  <Button variant="ghost" style={{ width: "100%", justifyContent: "flex-start" }}>
                    Dashboard
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" style={{ width: "100%", justifyContent: "flex-start" }}>
                    Projects
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" style={{ width: "100%", justifyContent: "flex-start" }}>
                    Team
                  </Button>
                </li>
                <li>
                  <Button variant="ghost" style={{ width: "100%", justifyContent: "flex-start" }}>
                    Settings
                  </Button>
                </li>
              </ul>
            </nav>
            
            <div style={{ marginTop: "auto", paddingTop: "20px" }}>
              <Button 
                onClick={() => setIsOpen(false)} 
                variant="outline"
                style={{ width: "100%" }}
              >
                Close
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of a navigation drawer with custom content and styling.",
      },
    },
  },
};

export const Playground: Story = {
  args: {
    direction: "right",
    size: "md",
    variant: "default",
    showBackdrop: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    trapFocus: true,
    showCloseButton: true,
  },
  render: (args) => <DrawerDemo {...args} />,
  parameters: {
    docs: {
      description: {
        story: "Interactive playground to test all drawer properties.",
      },
    },
  },
};
