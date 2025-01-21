import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { CategoryCreateFormProps, CategoryCreateFormResponse } from '@components/FormCategoryCreate/FormCategoryCreate.props';
import styles from '@components/FormCategoryCreate/FormCategoryCreate.module.css';
import { useContext, useState } from 'react';
import cn from 'classnames';
import Field from '@components/Field/Field';
import Button from '@components/Button/Button';
import SpinnerIcon from '@assets/svg/spinner.svg?react';
import { DataContext } from '@context/DataContext';
import { ServiceContext } from '@context/ServiceContext';

const FormCategoryCreate = () => {
    const userId = '673b3e623f2c79dde1aa2e4d';
    const [isLoading, setIsLoading] = useState(false);
    const { token, addCategory } = useContext(DataContext) || {};
    const { setModalClose } = useContext(ServiceContext) || {};

    const {
        handleSubmit,
        control,
    } = useForm<CategoryCreateFormProps>();

    const formClasses = cn(
        styles.form,
        { [styles.loading]: isLoading }
    );

    const onSubmit: SubmitHandler<CategoryCreateFormProps> = async (payload) => {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ ...payload, userId }),
        });
        const data: CategoryCreateFormResponse = await res.json();

        if (!data._id) return;

        if (addCategory) {
            addCategory(data);
        }

        if (setModalClose) {
            setModalClose();
        }

        setIsLoading(false);
    };

    return (
        <form className={formClasses} onSubmit={handleSubmit(onSubmit)} >
            <Controller
                name='title'
                control={control}
                rules={{
                    required: 'Введите название категории'
                }}
                render={({ field, fieldState: { error } }) => (
                    <Field
                        className={styles.formElement}
                        label='Название'
                        {...field}
                        error={error?.message}
                        ref={field.ref}
                    />
                )}
            />
            <Controller
                name='description'
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Field
                        className={styles.formElement}
                        label='Описание'
                        {...field}
                        error={error?.message}
                        ref={field.ref}
                    />
                )}
            />
            <Button
                className={cn(styles.button, styles.formElement)}
            >
                Создать
            </Button>
            <SpinnerIcon className={styles.loader} />
        </form >
    );
};

export default FormCategoryCreate;