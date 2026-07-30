import type { Meta, StoryObj } from "@storybook/react";
import Link from "./Link";
import { BrowserRouter } from "react-router-dom";
const meta: Meta<typeof Link> = {
  title: "Common/Link",
  component: Link,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  parameters: { layout: "centered" },
  args: {
    to: "/about",
    target: "_self",
    children: "About",
    color: "primary",
    size: "md",
    underline: "hover",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "secondary", "success", "error", "info", "inherit"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    underline: {
      control: { type: "select" },
      options: ["none", "hover", "always"],
    },
    to: { control: "text" },
    children: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Link>;
export const Default: Story = {
  args: {
    to: "/",
    children: "Home Link",
  },
};
export const Primary: Story = {
  args: {
    to: "/about",
    color: "primary",
    children: "Primary Link",
  },
};
export const Secondary: Story = {
  args: {
    to: "/services",
    color: "secondary",
    children: "Secondary Link",
  },
};
export const Success: Story = {
  args: {
    to: "/success",
    color: "success",
    children: "Success Link",
  },
};
export const Error: Story = {
  args: {
    to: "/error",
    color: "error",
    children: "Error Link",
  },
};
export const Info: Story = {
  args: {
    to: "/info",
    color: "info",
    children: "Info Link",
  },
};
export const SmallSize: Story = {
  args: {
    to: "/small",
    size: "sm",
    children: "Small Link",
  },
};
export const MediumSize: Story = {
  args: {
    to: "/medium",
    size: "md",
    children: "Medium Link",
  },
};
export const LargeSize: Story = {
  args: {
    to: "/large",
    size: "lg",
    children: "Large Link",
  },
};
export const UnderlineHover: Story = {
  args: {
    to: "/hover",
    underline: "hover",
    children: "Hover to Underline",
  },
};
export const UnderlineAlways: Story = {
  args: {
    to: "/always",
    underline: "always",
    children: "Always Underlined",
  },
};
export const UnderlineNone: Story = {
  args: {
    to: "/none",
    underline: "none",
    children: "No Underline",
  },
};
export const Inherit: Story = {
  args: {
    to: "/inherit",
    color: "inherit",
    children: "Inherited Color",
  },
};

