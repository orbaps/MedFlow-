import { Layout } from './components/layout/Layout';
import { HospitalDashboard } from './features/hospital/HospitalDashboard';
import { RetailerDashboard } from './features/retailer/RetailerDashboard';
import { useAppSelector } from './store/hooks';

function App() {
    const { currentRole } = useAppSelector((state) => state.role);

    return (
        <Layout>
            {currentRole === 'hospital' && <HospitalDashboard />}
            {currentRole === 'retailer' && <RetailerDashboard />}
            {/* Fallback for other roles or future expansion */}
            {(currentRole === 'super_admin' || currentRole === 'patient') && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Coming Soon</h2>
                        <p className="text-gray-500">This role dashboard is under development.</p>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default App;
