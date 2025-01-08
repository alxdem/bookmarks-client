import React from 'react';
import styles from './Field.module.css';
import { FieldProps } from './Field.props';
import cn from 'classnames';

const Field = React.forwardRef<HTMLInputElement, FieldProps>(({ label, error, className, type, onChange }, ref) => {
    const classes = cn(
        styles.field,
        className,
        { [styles.isError]: error }
    );

    const fieldType = type || 'text';

    return (
        <label className={classes}>
            <span className={styles.label}>{label}</span>
            <input
                type={fieldType}
                className={styles.input}
                onChange={onChange}
                ref={ref}
            />
            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
});

export default Field;