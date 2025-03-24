import cn from 'classnames';
import Select from 'react-select';
import styles from '@components/FieldSelect/FieldSelect.module.css';
import { FieldSelectProps } from '@components/FieldSelect/FieldSelect.props';

const FieldSelect = ({ options, value = null, className }: FieldSelectProps) => {
    return (
        <Select
            className={cn(className, styles.select)}
            options={options}
            defaultValue={value}
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
    );
}

export default FieldSelect;