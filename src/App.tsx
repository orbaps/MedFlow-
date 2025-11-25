import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Layout } from './components/layout/Layout';
import { HospitalDashboard } from './features/hospital/HospitalDashboard';
import { RetailerDashboard } from './features/retailer/RetailerDashboard';
import LoginPage from './features/auth/LoginPage';

function App() {
    const { currentRole } = useSelector((state: RootState) => state.role);
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />

                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Layout>
                                {currentRole === 'hospital' ? <HospitalDashboard /> : <RetailerDashboard />}
                            </Layout>
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
