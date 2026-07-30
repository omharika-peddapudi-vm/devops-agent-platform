import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion";
const meta: Meta<typeof Accordion> = {
  title: "Common/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    title: { control: "text" },
    children: { control: "text" },
    isOpen: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: { control: "select", options: ["elevation", "outlined"] },
    disabled: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Accordion>;
export const Default: Story = {
  args: {
    title: "Accordion Summary",
    children: "Accordion details go here. You can put any content inside.",
    isOpen: false,
    size: "md",
    variant: "outlined",
  },
};
export const Expanded: Story = {
  args: {
    title: "Expanded Accordion",
    children: "This accordion is expanded by default.",
    isOpen: true,
    size: "md",
    variant: "outlined",
  },
};
export const Disabled: Story = {
  args: {
    title: "Disabled Accordion",
    children: "This accordion is disabled and cannot be toggled.",
    isOpen: false,
    disabled: true,
    size: "md",
    variant: "outlined",
  },
};
export const Small: Story = {
  args: {
    title: "Small Accordion",
    children: "This accordion uses the small size.",
    isOpen: false,
    size: "sm",
    variant: "outlined",
  },
};
export const Large: Story = {
  args: {
    title: "Large Accordion",
    children: "This accordion uses the large size.",
    isOpen: false,
    size: "lg",
    variant: "outlined",
  },
};
export const Elevation: Story = {
  args: {
    id: "accordion-elevation",
    title: "Elevation Variant",
    children: "This accordion uses the elevation variant with shadow.",
    isOpen: false,
    size: "md",
    variant: "elevation",
    "aria-label": "Elevation variant accordion",
  },
};

