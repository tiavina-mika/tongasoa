import type { Meta, StoryObj } from '@storybook/react-vite';

import Tongasoa from '../src/pages/Tongasoa';

const meta: Meta<typeof Tongasoa> = {
  title: 'Pages/Tongasoa',
  component: Tongasoa,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Tongasoa> = {
  args: {},
};
