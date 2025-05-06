import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import Field from '@components/Field/Field';
import cn from 'classnames';
import styles from '@components/FormBookmark/FormBookmark.module.css';
import Button from '@components/Button/Button';
import { BookmarkEditOrCreate } from '@t/commonTypes';
import useCreateBookmark from '@hooks/useCreateBookmark';
import SpinnerIcon from '@assets/svg/spinner.svg?react';
import { useContext, useEffect } from 'react';
import { DataContext } from '@context/DataContext';
import { FormBookmarkProps } from '@components/FormBookmark/FormBookmark.props';
import useEditBookmark from '@hooks/useEditBookmark';
import FieldSelect from '@components/FieldSelect/FieldSelect';
import { message } from '@utils/variables';

const FormBookmark = ({ type, id }: FormBookmarkProps) => {
    const [createBookmark, isLoading] = useCreateBookmark();
    const [editBookmark, isEditLoading] = useEditBookmark();
    const { activeCategoryId, categoriesForSelect, bookmarks } = useContext(DataContext) || {};

    const isEdit = type === 'bookmarkUpdate' && id !== undefined;
    const currentBookmark = isEdit ? bookmarks?.find(bookmark => bookmark._id === id) || null : null;
    const isEditType = isEdit && Boolean(currentBookmark);

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm<BookmarkEditOrCreate>();

    const formClasses = cn(
        styles.form,
        { [styles.loading]: isLoading || isEditLoading }
    );

    const onSubmit: SubmitHandler<BookmarkEditOrCreate> = async (payload) => {
        if (isEditType) {
            if (!currentBookmark?._id) return;

            await editBookmark({ ...payload, _id: currentBookmark?._id });
        } else {
            await createBookmark({...payload});
        }
    };

    const activeOption = categoriesForSelect?.find(category => category.value === activeCategoryId);

    useEffect(() => {
        if (!isEditType || !currentBookmark) {
            return;
        }

        const {title, description, url, categoryId} = currentBookmark;

        setValue('title', title);
        setValue('description', description);
        setValue('url', url);
        setValue('categoryId', categoryId);
    }, [currentBookmark]);

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
                name='categoryId'
                control={control}
                render={({ field }) => (
                    <FieldSelect
                        className={cn(styles.formElement, styles.field)}
                        label='Категория'
                        options={categoriesForSelect}
                        {...field}
                        value={activeOption}
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
                {message.SAVE_TEXT}
            </Button>
            <SpinnerIcon className={styles.loader} />
        </form>
    );
};

export default FormBookmark;