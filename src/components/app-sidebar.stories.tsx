import type { Meta, StoryObj } from '@storybook/react';
import * as React from "react";

import { AppSidebar } from './app-sidebar';
import { SidebarProvider } from './ui/sidebar';

const meta = {
  component: AppSidebar,
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <SidebarProvider>
          <Story />
          <div className="flex-1 p-4 bg-background">
            <h1 className="text-2xl font-bold mb-4">Main Content Area</h1>
            <p>This is where the application content appears alongside the sidebar.</p>
          </div>
        </SidebarProvider>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof AppSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Collapsed: Story = {
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', display: 'flex' }}>
        <SidebarProvider defaultOpen={false}>
          <Story />
        </SidebarProvider>
      </div>
    ),
  ],
};

// TODO. (Optional) story for mobile view
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};