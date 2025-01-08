import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({ children, className, isDisabled, type = 'default' }: ButtonProps) => {
    const classes = cn(styles.button, styles[type], className);

    return (
        <button
            className={classes}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default Button;