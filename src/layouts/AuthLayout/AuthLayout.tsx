import { useContext, useState } from 'react';
import { DataContext } from '../../context/DataContext';
import Field from '../../components/Field/Field';
import Button from '../../components/Button/Button';
import styles from './AuthLayout.module.css';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import SpinnerIcon from '../../assets/svg/spinner.svg?react';
import cn from 'classnames';

const AuthLayout = () => {
    const PASSWORD_MIN_LENGHT = 6;

    const { setToken } = useContext(DataContext) || {};
    const [formMessage, setFormMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    type AuthFormProps = {
        name: string;
        password: string;
    };

    const {
        handleSubmit,
        control,
    } = useForm<AuthFormProps>();

    if (!setToken) {
        throw Error('Метод setToken не найден в контексте');
    }

    const formClasses = cn(
        styles.form,
        { [styles.loading]: isLoading }
    );

    const onSubmit: SubmitHandler<AuthFormProps> = async (payload) => {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const { token, message } = await res.json();

        if (message) {
            setFormMessage(message);
        } else {
            setFormMessage('');
        }

        if (token) {
            localStorage.setItem('token', token);
            setToken(token);
        } else {
            localStorage.removeItem('token');
            setToken(null);
        }

        setIsLoading(false);
    };

    return (
        <section className={styles.inner}>
            <form className={formClasses} onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name='name'
                    control={control}
                    rules={{
                        required: 'Введите логин',
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            className={styles.formElement}
                            label='Имя пользователя'
                            {...field}
                            error={error?.message}
                            ref={field.ref}
                        />
                    )}
                />
                <Controller
                    name='password'
                    control={control}
                    rules={{
                        required: 'Введите пароль',
                        minLength: {
                            value: PASSWORD_MIN_LENGHT,
                            message: `Пароль должен быть не короче ${PASSWORD_MIN_LENGHT} символов`
                        }
                    }}
                    render={({ field, fieldState: { error } }) => (
                        <Field
                            className={styles.formElement}
                            label='Пароль'
                            type='password'
                            {...field}
                            error={error?.message}
                            ref={field.ref}
                        />
                    )}
                />
                {formMessage && <p className={cn(styles.message, styles.formElement)}>{formMessage}</p>}
                <Button
                    className={cn(styles.button, styles.formElement)}
                >
                    Войти
                </Button>
                <SpinnerIcon className={styles.loader} />
            </form>
        </section>
    );
};

export default AuthLayout;