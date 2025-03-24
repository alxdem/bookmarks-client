interface OptionProps {
    value: string;
    label: string;
}

export interface FieldSelectProps extends React.HTMLAttributes<HTMLSelectElement> {
    options: OptionProps[];
    value?: OptionProps | null;
}