import MainLayout from './layouts/MainLayout/MainLayout';
import CardList from './components/CardList/CardList';
import { DataProvider } from './context/DataContext';

function App() {
    return (
        <>
            <DataProvider>
                <MainLayout>
                    <CardList />
                </MainLayout>
            </DataProvider>
        </>
    )
}

export default App;
