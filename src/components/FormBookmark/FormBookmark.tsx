import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Field from '@components/Field/Field';
import cn from 'classnames';
import styles from '@components/FormBookmark/FormBookmark.module.css';
import Button from '@components/Button/Button';
import { BookmarkEditOrCreate } from '@t/commonTypes';
import useCreateBookmark from '@hooks/useCreateBookmark';
import SpinnerIcon from '@assets/svg/spinner.svg?react';

const FormBookmark = () => {
    const [createBookmark, isLoading] = useCreateBookmark();

    const {
        handleSubmit,
        control,
    } = useForm<BookmarkEditOrCreate>();

    const formClasses = cn(
        styles.form,
        { [styles.loading]: isLoading }
    );

    const onSubmit: SubmitHandler<BookmarkEditOrCreate> = async (payload) => {
        await createBookmark(payload);
    };

    return (
        <form className={formClasses} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name='title'
                control={control}
                rules={{
                    required: 'Введите название'
                }}
                render={({ field, fieldState: { error } }) => (
                    <Field
                        className={cn(styles.formElement, styles.field)}
                        label='Название'
                        {...field}
                        error={error?.message}
                        ref={field.ref}
                    />
                )}
            />
            <Controller
                name='url'
                control={control}
                rules={{
                    required: 'Введите ссылку'
                }}
                render={({ field, fieldState: { error } }) => (
                    <Field
                        className={cn(styles.formElement, styles.field)}
                        label='Ссылка'
                        {...field}
                        error={error?.message}
                        ref={field.ref}
                    />
                )}
            />
            <Controller
                name='description'
                control={control}
                render={({ field }) => (
                    <Field
                        className={cn(styles.formElement, styles.field)}
                        label='Описание'
                        type='textarea'
                        {...field}
                        ref={field.ref}
                    />
                )}
            />
            <Button
                className={cn(styles.button, styles.formElement)}
            >
                Сохранить
            </Button>
            <SpinnerIcon className={styles.loader} />
        </form>
    );
};

export default FormBookmark;