import styles from '@components/Field/Field.module.css';
import cn from 'classnames';
import { LabelProps } from '@components/Label/Label.props';

const Label = ({
    label,
    error,
    className,
    children,
}: LabelProps) => {
    const classes = cn(
        styles.label,
        className,
        { [styles.isError]: error }
    );

    return (
        <label className={classes}>
            <span className={styles.text}>{label}</span>
            {children}
            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
};

export default Label;