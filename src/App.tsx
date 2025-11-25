import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Layout } from './components/layout/Layout';
import { HospitalDashboard } from './features/hospital/HospitalDashboard';
import { RetailerDashboard } from './features/retailer/RetailerDashboard';
import RoleSelectionPage from './features/auth/RoleSelectionPage';

function App() {
    const { currentRole } = useSelector((state: RootState) => state.role);

    // Render dashboard based on selected role
    const renderDashboard = () => {
        switch (currentRole) {
            case 'hospital':
                return <HospitalDashboard />;
            case 'retailer':
                return <RetailerDashboard />;
            case 'superadmin':
                // TODO: Create SuperAdmin dashboard
                return <div className="p-8"><h1 className="text-2xl font-bold">Super Admin Dashboard (Coming Soon)</h1></div>;
            case 'patient':
                // TODO: Create Patient dashboard
                return <div className="p-8"><h1 className="text-2xl font-bold">Patient Dashboard (Coming Soon)</h1></div>;
            default:
                return <Navigate to="/select-role" />;
        }
    };

    return (
        <Router>
            <Routes>
                {/* Role Selection Page */}
                <Route path="/select-role" element={<RoleSelectionPage />} />

                {/* Main Dashboard */}
                <Route
                    path="/"
                    element={
                        currentRole ? (
                            <Layout>
                                {renderDashboard()}
                            </Layout>
                        ) : (
                            <Navigate to="/select-role" />
                        )
                    }
                />

                {/* Redirect any unknown routes to role selection */}
                <Route path="*" element={<Navigate to="/select-role" />} />
            </Routes>
        </Router>
    );
}

export default App;
