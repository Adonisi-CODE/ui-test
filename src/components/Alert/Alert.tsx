import React from 'react';
import { AlertProps, AlertType } from './Alert.types';
import clsx from 'clsx';
import {
    FaCheckCircle,
    FaExclamationCircle,
    FaExclamationTriangle,
    FaInfoCircle,
} from 'react-icons/fa';

const baseClasses =
    'relative w-full p-4 rounded-lg border flex items-start gap-3 transition-colors';

const subtleClasses =
    'bg-neutral-100 border-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100';

const typeStyles: Record<AlertType, { container: string; icon: React.ReactNode }> = {
    success: {
        container:
            'border-green-300 bg-white text-green-800 dark:bg-green-700 dark:border-green-600 dark:text-green-100',
        icon: <FaCheckCircle />,
    },
    error: {
        container:
            'border-red-300 bg-white text-red-800 dark:bg-red-700 dark:border-red-600 dark:text-red-100',
        icon: <FaExclamationCircle />,
    },
    warning: {
        container:
            'border-yellow-300 bg-white text-yellow-800 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100',
        icon: <FaExclamationTriangle />,
    },
    info: {
        container:
            'border-blue-300 bg-white text-blue-800 dark:bg-blue-700 dark:border-blue-600 dark:text-blue-100',
        icon: <FaInfoCircle />,
    },
};

export const Alert: React.FC<AlertProps> = ({
                                                type,
                                                title,
                                                description,
                                                variant = 'default',
                                                icon,
                                                onClose,
                                                children,
                                            }) => {
    const style = typeStyles[type];
    const showIcon = icon !== undefined ? icon : style.icon;

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={clsx(
                baseClasses,
                variant === 'subtle' ? subtleClasses : style.container
            )}
        >
            {showIcon && (
                <div className="flex-shrink-0 text-xl mt-1">{showIcon}</div>
            )}

            <div className="flex-1 text-sm">
                {title && <div className="font-semibold">{title}</div>}
                {(description || children) && (
                    <div className="mt-1">{description || children}</div>
                )}
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    aria-label="Close alert"
                    className="ml-4 text-sm font-medium"
                >
                    &times;
                </button>
            )}
        </div>
    );
};
