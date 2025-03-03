export interface FormConfirmProps {
    text?: string;
    rejectText?: string;
    confirmText?: string;
    isLoading?: boolean;
    reject: () => void;
    confirm: () => void;
}