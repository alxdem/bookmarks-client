export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element | JSX.Element[] | string;
    isDisabled?: boolean;
    shape?: 'default' | 'square';
    size?: 'sm' | 'md';
    color?: 'primary' | 'secondary' | 'danger';
}