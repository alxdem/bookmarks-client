import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({ children, className, isDisabled }: ButtonProps) => {
    return (
        <button
            className={cn(styles.button, className)}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default Button;