import { createContext, useEffect, useState } from 'react';
import MainLayout from './layouts/MainLayout/MainLayout';
import CardList from './components/CardList/CardList';
import useGetCategories from './hooks/useGetCategories';
import { Category } from './types/common';

interface DataObjectProps {
    categories: Category[];
    activeCategory: string;
}

const initialDataObject: DataObjectProps = {
    categories: [],
    activeCategory: '',
};

interface ContextProps {
    dataObject: DataObjectProps;
    setDataObject: (value: DataObjectProps) => void;
}

export const DataContext = createContext<ContextProps>({
    dataObject: initialDataObject,
    setDataObject: () => { },
});

function App() {
    const [dataObject, setDataObject] = useState<ContextProps['dataObject']>(initialDataObject);
    const categories = useGetCategories();

    useEffect(() => {
        if (categories.length) {
            setDataObject({
                ...dataObject,
                categories: categories,
                activeCategory: categories[0]._id,
            });
        }
    }, [categories]);

    return (
        <>
            <DataContext.Provider value={{
                dataObject,
                setDataObject,
            }}>
                <MainLayout>
                    <CardList />
                </MainLayout>
            </DataContext.Provider>
        </>
    )
}

export default App;
