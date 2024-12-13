import { Profiler, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const onRender = (id: string) => {
    console.log('id', id);
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Profiler id="App" onRender={onRender}>
            <App />
        </Profiler>
    </StrictMode>,
)
