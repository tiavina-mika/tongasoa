import type { FormValues } from '../src/types';
import type { Meta, StoryObj } from '@storybook/react-vite';

import Form from '../src/components/Form';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    values: {
      control: 'object',
      description: 'Form values including name and optional photo.',
      defaultValue: { name: '' },
    },
    onSubmit: { action: 'submitted' },
  },
};

export default meta;

export const Default: StoryObj<typeof Form> = {
  args: {
    values: { name: '' } as FormValues,
  },
};

export const WithName: StoryObj<typeof Form> = {
  args: {
    values: { name: 'Mika' } as FormValues,
  },
};
