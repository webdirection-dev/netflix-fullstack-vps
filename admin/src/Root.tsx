import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext/AuthContext';

import App from './components/app/App';

const Root: React.FC = () => {
    return (
        <React.StrictMode>
            <Provider store={store}>
                <AuthContextProvider>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </AuthContextProvider>
            </Provider>
        </React.StrictMode>
    );
};

export default Root;
