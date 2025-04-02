import React from 'react';
import styles from '@components/Field/Field.module.css';
import { FieldProps, InputOrTextarea } from '@components/Field/Field.props';
import cn from 'classnames';
import Label from '@components/Label/Label';

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

    let element: JSX.Element | null = null;

    switch (type) {
        case 'textarea':
            element = <textarea
                className={cn(styles.defaultInput, styles.textarea)}
                value={value}
                onChange={onChange}
                ref={ref as React.Ref<HTMLTextAreaElement>}
                {...props}
            />;
            break;
        default:
            element = <input
                type={type}
                className={cn(styles.defaultInput, styles.input)}
                value={value}
                onChange={onChange}
                ref={ref as React.Ref<HTMLInputElement>}
                {...props}
            />;
    }

    return (
        <Label
            label={label}
            error={error}
            className={classes}
        >
            {element}
        </Label>
    );
});

export default Field;