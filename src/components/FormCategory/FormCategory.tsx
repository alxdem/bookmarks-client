import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { FormCategoryProps } from '@components/FormCategory/FormCategory.props';
import styles from '@components/FormCategory/FormCategory.module.css';
import { useContext, useEffect } from 'react';
import cn from 'classnames';
import Field from '@components/Field/Field';
import Button from '@components/Button/Button';
import SpinnerIcon from '@assets/svg/spinner.svg?react';
import { DataContext } from '@context/DataContext';
import { Category, CategoryEditOrCreate } from '@t/commonTypes';
import useCreateCategory from '@hooks/useCreateCategory';
import useEditCategory from '@hooks/useEditCategory';
import { message } from "@utils/variables.ts";

const FormCategory = ({ type, id, remove }: FormCategoryProps) => {
    const { categories } = useContext(DataContext) || {};

    const isEdit = type === 'categoryUpdate' && id !== undefined;
    const mainBtnText = isEdit ? message.SAVE_TEXT : 'Создать';

    const currentCategory: Category | null = isEdit ? categories?.find(category => category._id === id) || null : null;

    const isEditType = isEdit && Boolean(currentCategory);

    const [createCategory, isLoading] = useCreateCategory();
    const [editCategory] = useEditCategory();

    const {
        handleSubmit,
        control,
        setValue,
    } = useForm<CategoryEditOrCreate>({
        defaultValues: {
            title: '',
            description: '',
            _id: '',
        }
    });

    useEffect(() => {
        if (!isEditType || !currentCategory) return;

        setValue('title', currentCategory?.title);
        setValue('description', currentCategory?.description);
    }, [currentCategory]);

    const formClasses = cn(
        styles.form,
        { [styles.loading]: isLoading }
    );

    const onSubmit: SubmitHandler<CategoryEditOrCreate> = async (payload) => {
        if (isEditType) {
            if (!currentCategory?._id) return;

            await editCategory({ ...payload, _id: currentCategory?._id });
        } else {
            await createCategory({ ...payload });
        }
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
                        className={cn(styles.formElement, styles.field)}
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
                        className={cn(styles.formElement, styles.field)}
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
                {mainBtnText}
            </Button>
            {isEdit &&
                <Button
                    className={cn(styles.button, styles.formElement)}
                    color='danger'
                    type='button'
                    onClick={() => remove(id)}
                >
                    Удалить
                </Button>
            }
            <SpinnerIcon className={styles.loader} />
        </form >
    );
};

export default FormCategory;