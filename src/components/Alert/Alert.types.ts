export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertProps {
    type: AlertType;
    title?: string;
    description?: string;
    variant?: 'default' | 'subtle';
    icon?: React.ReactNode;
    onClose?: () => void;
    children?: React.ReactNode;
}
