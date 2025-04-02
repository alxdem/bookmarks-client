import { LabelProps } from '@components/Label/Label.props';

export interface OptionProps {
    value: string;
    label: string;
}

export interface FieldSelectProps extends LabelProps {
    options?: OptionProps[];
    value?: OptionProps;
    onChange: (value: string) => void;
    className?: string;
}