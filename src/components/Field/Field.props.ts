import { OptionProps } from '@components/FieldSelect/FieldSelect.props';

export type InputOrTextarea = HTMLInputElement | HTMLTextAreaElement;

export interface FieldProps extends React.HTMLAttributes<InputOrTextarea> {
    label?: string;
    error?: string;
    className?: string;
    type?: string;
    value?: string;
    selectedValue?: OptionProps;
    options?: OptionProps[];
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}