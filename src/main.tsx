import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App.tsx';
import './index.css';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <Provider store={store}>
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            background: '#fff',
                            color: '#363636',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            borderRadius: '12px',
                            padding: '16px',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </Provider>
        </ErrorBoundary>
    </StrictMode>,
);
