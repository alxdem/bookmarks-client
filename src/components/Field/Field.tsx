import React from 'react';
import styles from '@components/Field/Field.module.css';
import { FieldProps, InputOrTextarea } from '@components/Field/Field.props';
import cn from 'classnames';
import FieldSelect from '@components/FieldSelect/FieldSelect';

const Field = React.forwardRef<InputOrTextarea, FieldProps>(({
    label,
    error,
    className,
    type = 'text',
    value = '',
    selectedValue = null,
    options = [],
    onChange,
    ...props
}, ref) => {
    const classes = cn(
        styles.field,
        className,
        { [styles.isError]: error }
    );

    if (!onChange) return null;

    let element: JSX.Element | null = null;

    switch (type) {
        case 'textarea':
            element = <textarea
                className={cn(styles.defaultInput, styles.textarea)}
                value={value}
                onChange={(value) => onChange(value)}
                ref={ref as React.Ref<HTMLTextAreaElement>}
                {...props}
            />;
            break;
        case 'select':
            element = <FieldSelect
                className={cn(styles.defaultInput, styles.select)}
                options={options}
                value={selectedValue}
            />;
            break;
        default:
            element = <input
                type={type}
                className={cn(styles.defaultInput, styles.input)}
                value={value}
                onChange={(value) => onChange(value)}
                ref={ref as React.Ref<HTMLInputElement>}
                {...props}
            />;
    }

    return (
        <label className={classes}>
            <span className={styles.label}>{label}</span>
            {element}
            {error && <span className={styles.error}>{error}</span>}
        </label>
    );
});

export default Field;