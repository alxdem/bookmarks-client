import cn from 'classnames';
import Select, { SelectInstance, SingleValue } from 'react-select';
import styles from '@components/FieldSelect/FieldSelect.module.css';
import { FieldSelectProps, OptionProps } from '@components/FieldSelect/FieldSelect.props';
import {forwardRef} from 'react';
import Label from '@components/Label/Label';

const FieldSelect = forwardRef<SelectInstance<OptionProps>, FieldSelectProps>(({
    options,
    value,
    onChange,
    className,
    label,
    error,
}, ref) => {
    const classes = cn(
        styles.field,
        className,
        { [styles.isError]: error }
    );

    return (
        <Label
            label={label}
            error={error}
            className={classes}
        >
            <Select<OptionProps>
                ref={ref}
                className={styles.select}
                options={options}
                defaultValue={options?.find((option) => option.value === value?.value)}
                onChange={(option: SingleValue<OptionProps>) => onChange(option?.value || '')}
                classNames={{
                    container: () => styles.container,
                    control: ({ isFocused }) => cn(
                        styles.control,
                        isFocused && styles.controlFocused,
                    ),
                    dropdownIndicator: () => styles.dropdownIndicator,
                    indicatorsContainer: () => styles.indicatorsContainer,
                    indicatorSeparator: () => styles.indicatorsSeparator,
                    input: () => styles.input,
                    menu: () => styles.menu,
                    menuList: () => styles.menuList,
                    menuPortal: () => styles.menuPortal,
                    option: ({ isSelected, isFocused }) => cn(
                        styles.option,
                        isSelected && styles.optionSelected,
                        isFocused && styles.optionFocused,
                    ),
                    valueContainer: () => styles.valueContainer,
                    singleValue: () => styles.singleValue,
                }}
            />
        </Label>
    );
});

export default FieldSelect;