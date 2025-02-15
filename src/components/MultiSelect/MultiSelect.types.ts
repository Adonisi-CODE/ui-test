export interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

export interface MultiSelectProps {
    options: () => Promise<Option[]> | Option[];
    placeholder?: string;
    isLoading?: boolean;
    defaultValues?: string[];
    clearable?: boolean;
    searchable?: boolean;
    onChange: (selected: Option[]) => void;
}
