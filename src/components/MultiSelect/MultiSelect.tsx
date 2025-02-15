import React, { useEffect, useState } from 'react';
import { MultiSelectProps, Option } from './MultiSelect.types';
import clsx from 'clsx';

export const MultiSelect: React.FC<MultiSelectProps> = ({
                                                            options,
                                                            placeholder = 'Select items...',
                                                            isLoading = false,
                                                            defaultValues = [],
                                                            clearable = true,
                                                            searchable = true,
                                                            onChange,
                                                        }) => {
    const [items, setItems] = useState<Option[]>([]);
    const [selected, setSelected] = useState<Option[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loadOptions = async () => {
            let opts: Option[] = [];
            if (typeof options === 'function') {
                opts = await options();
            } else {
                opts = options;
            }
            setItems(opts);
        };
        loadOptions();
    }, [options]);

    useEffect(() => {
        if (items.length > 0 && defaultValues.length > 0) {
            const preselected = items.filter((opt) =>
                defaultValues.includes(opt.value)
            );
            setSelected(preselected);
        }
    }, [items, defaultValues]);

    const handleSelect = (item: Option) => {
        if (item.disabled) return;
        const alreadySelected = selected.some((opt) => opt.value === item.value);
        let newSelected: Option[];
        if (alreadySelected) {
            newSelected = selected.filter((opt) => opt.value !== item.value);
        } else {
            newSelected = [...selected, item];
        }
        setSelected(newSelected);
        onChange(newSelected);
    };

    const handleClear = () => {
        setSelected([]);
        onChange([]);
    };

    const filteredItems = items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-sm space-y-2">
            <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
          {placeholder}
        </span>
                {clearable && selected.length > 0 && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-xs text-blue-500 hover:underline"
                    >
                        Clear
                    </button>
                )}
            </div>


            {selected.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {selected.map((opt) => (
                        <span
                            key={opt.value}
                            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs dark:bg-blue-900 dark:text-blue-100"
                        >
              {opt.label}
                            <button
                                type="button"
                                className="hover:text-red-500"
                                onClick={() => handleSelect(opt)}
                            >
                &times;
              </button>
            </span>
                    ))}
                </div>
            )}


            {searchable && (
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 border rounded text-sm bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            )}


            <div
                role="listbox"
                aria-multiselectable="true"
                className="border rounded p-2 bg-white dark:bg-gray-800 dark:border-gray-600"
            >
                {isLoading ? (
                    <div className="text-center py-2">Loading...</div>
                ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => {
                        const isChecked = selected.some((opt) => opt.value === item.value);
                        return (
                            <label
                                key={item.value}
                                role="option"
                                aria-selected={isChecked}
                                aria-disabled={item.disabled || undefined}
                                className={clsx(
                                    'flex items-center gap-2 px-2 py-1 cursor-pointer rounded text-sm',
                                    item.disabled && 'opacity-50 cursor-not-allowed',
                                    isChecked && !item.disabled && 'bg-blue-50 dark:bg-blue-900'
                                )}
                            >
                                <input
                                    type="checkbox"
                                    disabled={item.disabled}
                                    checked={isChecked}
                                    onChange={() => handleSelect(item)}
                                />
                                {item.label}
                            </label>
                        );
                    })
                ) : (
                    <div className="text-center py-2 text-sm text-gray-500 dark:text-gray-400">
                        No results found
                    </div>
                )}
            </div>
        </div>
    );
};
