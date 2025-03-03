import React from 'react';
import styles from '@components/Field/Field.module.css';
import { FieldProps } from '@components/Field/Field.props';
import cn from 'classnames';

const Field = React.forwardRef<HTMLInputElement, FieldProps>(({
    label,
    error,
    className,
    type,
    value = '',
    onChange
}, ref) => {
    const classes = cn(
        styles.field,
        className,
        { [styles.isError]: error }
    );

    if (!onChange) return null;

    const fieldType = type || 'text';

    return (
        <label className={classes}>
            <span className={styles.label}>{label}</span>
            <input
                type={fieldType}
                className={styles.input}
                value={value}
                onChange={(value) => onChange(value)}
                ref={ref}
            />
            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
});

export default Field;