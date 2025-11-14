import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import List from './components/Guests/List';
import Add from './components/Guests/Add';
import DetailleGuest from './components/Guests/DetailleGuest';
import Control from './pages/Controle';
import Historiq from './pages/Historique';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection vers le tableau de bord admin par défaut */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* Admin Dashboard Route with nested routes */}
        <Route 
          path="/admin-dashboard" 
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested child routes inside AdminDashboard */}
          <Route path="/admin-dashboard/Bébés/List" element={<List />} />
          <Route path="/admin-dashboard/Bébés/Add" element={<Add />} />
          <Route path="/admin-dashboard/Bébés/DetailleGuest/:roomNumber" element={<DetailleGuest />} />
          <Route path="/admin-dashboard/pages/Controle" element={<Control />} />
          <Route path="/admin-dashboard/pages/Historique" element={<Historiq />} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
