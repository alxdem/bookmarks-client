export type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement;

export interface FieldProps extends React.HTMLAttributes<InputOrTextarea> {
    label?: string;
    error?: string;
    className?: string;
    type?: string;
    value?: string;
}