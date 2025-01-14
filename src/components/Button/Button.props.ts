export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element | JSX.Element[] | string;
    isDisabled?: boolean;
    type?: 'default' | 'square';
    size?: 'sm' | 'md';
    color?: 'primary' | 'secondary';
}