import type { Meta, StoryObj } from '@storybook/react';

import { AppSidebar } from './app-sidebar';

const meta = {
  component: AppSidebar,
} satisfies Meta<typeof AppSidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};