import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { AlertProps } from './Alert.types';
import { FaCheckCircle } from 'react-icons/fa';

const meta: Meta<AlertProps> = {
    title: 'Components/Alert',
    component: Alert,
    argTypes: {
        onClose: { action: 'closed' },
        icon: { control: false },
    },
};

export default meta;
type Story = StoryObj<AlertProps>;

export const Success: Story = {
    args: {
        type: 'success',
        children: 'Operation completed successfully!',
    },
};

export const WarningWithTitle: Story = {
    args: {
        type: 'warning',
        title: 'Update Available',
        description: 'A new version is ready to install.',
    },
};

export const InfoSubtleWithIcon: Story = {
    args: {
        type: 'info',
        variant: 'subtle',
        icon: <FaCheckCircle />,
        onClose: () => {},
        children: 'Custom content here with an optional close button.',
    },
};

export const ErrorDescriptionOnly: Story = {
    args: {
        type: 'error',
        description: 'There was an error processing your request.',
    },
};
