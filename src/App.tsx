import MainLayout from '@layouts/MainLayout/MainLayout';
import CardList from '@components/CardList/CardList';
import { DataProvider } from '@context/DataContext';
import AuthMiddleware from '@middlewares/AuthMiddleware';

function App() {
    return (
        <>
            <DataProvider>
                <AuthMiddleware>
                    <MainLayout>
                        <CardList />
                    </MainLayout>
                </AuthMiddleware>
            </DataProvider>
        </>
    )
}

export default App;
