export interface FieldProps extends React.HTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    className?: string;
    type?: string;
    value?: string;
}