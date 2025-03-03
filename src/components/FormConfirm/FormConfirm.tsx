import { FormConfirmProps } from '@components/FormConfirm/FormConfirm.props';
import styles from '@components/FormConfirm/FormConfirm.module.css';
import Button from '@components/Button/Button';
import SpinnerIcon from '@assets/svg/spinner.svg?react';
import cn from 'classnames';

const FormConfirm = ({
    text,
    rejectText = 'Отмена',
    confirmText = 'Ок',
    isLoading = false,
    reject,
    confirm
}: FormConfirmProps) => {
    const formClasses = cn(
        styles.form,
        { [styles.loading]: isLoading }
    );
    return (
        <form className={formClasses}>
            {text && <p className={styles.text}>{text}</p>}
            <Button
                color='primary'
                type='button'
                onClick={confirm}
            >
                {confirmText}
            </Button>
            <Button
                color='danger'
                type='button'
                onClick={reject}
            >
                {rejectText}
            </Button>
            <SpinnerIcon className={styles.loader} />
        </form>
    );
};

export default FormConfirm;