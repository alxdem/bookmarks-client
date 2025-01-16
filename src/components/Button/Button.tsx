import { ButtonProps } from '@components/Button/Button.props';
import styles from '@components/Button/Button.module.css';
import cn from 'classnames';

const Button = ({
    children,
    className,
    isDisabled,
    type = 'default',
    size = 'md',
    color = 'primary',
    ...rest
}: ButtonProps) => {
    const classes = cn(styles.button, styles[type], styles[size], styles[color], className);

    return (
        <button
            className={classes}
            disabled={isDisabled}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;