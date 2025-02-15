import { Meta, StoryObj } from '@storybook/react';
import { MultiSelect } from './MultiSelect';
import { MultiSelectProps } from './MultiSelect.types';

const meta: Meta<MultiSelectProps> = {
    title: 'Components/MultiSelect',
    component: MultiSelect,
    argTypes: {
        onChange: { action: 'changed' },
    },
};

export default meta;
type Story = StoryObj<MultiSelectProps>;

const mockOptions = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { label: 'Alpha', value: 'alpha' },
                { label: 'Beta', value: 'beta' },
                { label: 'Gamma (disabled)', value: 'gamma', disabled: true },
                { label: 'Delta', value: 'delta' },
                { label: 'Omega', value: 'omega' },
            ]);
        }, 500);
    });
};

export const Default: Story = {
    args: {
        options: mockOptions,
        placeholder: 'Pick your favorite options...',
        isLoading: false,
        clearable: true,
        searchable: true,
    },
};

export const LoadingState: Story = {
    args: {
        options: mockOptions,
        placeholder: 'Loading items...',
        isLoading: true,
    },
};

export const PreselectedOptions: Story = {
    args: {
        options: mockOptions,
        defaultValues: ['beta'],
        placeholder: 'Select items...',
        isLoading: false,
    },
};

export const DisabledOptions: Story = {
    args: {
        options: mockOptions,
        placeholder: 'Check how disabled item behaves...',
    },
};
