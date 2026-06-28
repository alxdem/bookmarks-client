import MainLayout from '@layouts/MainLayout/MainLayout';
import CardList from '@components/CardList/CardList';
import { DataProvider } from '@context/DataProvider';
import { ServiceProvider } from '@context/ServiceContext';
import AuthMiddleware from '@middlewares/AuthMiddleware';

function App() {
    return (
        <>
            <DataProvider>
                <ServiceProvider>
                    <AuthMiddleware>
                        <MainLayout>
                            <CardList />
                        </MainLayout>
                    </AuthMiddleware>
                </ServiceProvider>
            </DataProvider>
        </>
    )
}

export default App;
