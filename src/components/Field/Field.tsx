import React from 'react';
import styles from '@components/Field/Field.module.css';
import { FieldProps, InputOrTextarea } from '@components/Field/Field.props';
import cn from 'classnames';

const Field = React.forwardRef<InputOrTextarea, FieldProps>(({
    label,
    error,
    className,
    type = 'text',
    value = '',
    onChange,
    ...props
}, ref) => {
    const classes = cn(
        styles.field,
        className,
        { [styles.isError]: error }
    );

    if (!onChange) return null;

    return (
        <label className={classes}>
            <span className={styles.label}>{label}</span>
            {type === 'textarea' ? (
                <textarea
                    className={cn(styles.defaultInput, styles.textarea)}
                    value={value}
                    onChange={(value) => onChange(value)}
                    ref={ref as React.Ref<HTMLTextAreaElement>}
                    {...props}
                />
            ) : (
                <input
                    type={type}
                    className={cn(styles.defaultInput, styles.input)}
                    value={value}
                    onChange={(value) => onChange(value)}
                    ref={ref as React.Ref<HTMLInputElement>}
                    {...props}
                />
            )}
            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
});

export default Field;