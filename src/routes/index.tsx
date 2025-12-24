import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

// Main Pages
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import CctvDetail from '@/pages/CctvDetail';
import BodyWorm from '@/pages/BodyWorm';
import BodyWormDetail from '@/pages/BodyWormDetail';
import Helmet from '@/pages/Helmet';
import HelmetDetail from '@/pages/HelmetDetail';

// Manage Pages - Dashboard
import DashboardPage from '@/pages/manage/dashboard';

// Manage Pages - CCTV
import CctvListPage from '@/pages/manage/cctv';
import CctvCreatePage from '@/pages/manage/cctv/create';
import CctvEditPage from '@/pages/manage/cctv/edit';

// Manage Pages - Helmet
import HelmetListPage from '@/pages/manage/helmet';
import HelmetCreatePage from '@/pages/manage/helmet/create';
import HelmetEditPage from '@/pages/manage/helmet/edit';

// Manage Pages - Body Worm
import BodyWormListPage from '@/pages/manage/body-worm';
import BodyWormCreatePage from '@/pages/manage/body-worm/create';
import BodyWormEditPage from '@/pages/manage/body-worm/edit';

// Manage Pages - User
import UserListPage from '@/pages/manage/user';

// Manage Pages - Role
import RoleListPage from '@/pages/manage/role';

// Manage Pages - Region
import RegionListPage from '@/pages/manage/region';

// Manage Pages - Layout
import LayoutListPage from '@/pages/manage/layout';
import LayoutEditPage from '@/pages/manage/layout/edit';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        {/* Main Dashboard Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/cctv/:id" element={<CctvDetail />} />
        <Route path="/body-worm" element={<BodyWorm />} />
        <Route path="/body-worm/:id" element={<BodyWormDetail />} />
        <Route path="/helmet" element={<Helmet />} />
        <Route path="/helmet/:id" element={<HelmetDetail />} />
        
        {/* Management Routes */}
        <Route path="/manage/dashboard" element={<DashboardPage />} />
        
        {/* CCTV Management */}
        <Route path="/manage/cctv" element={<CctvListPage />} />
        <Route path="/manage/cctv/create" element={<CctvCreatePage />} />
        <Route path="/manage/cctv/:id/edit" element={<CctvEditPage />} />
        
        {/* Helmet Management */}
        <Route path="/manage/helmet" element={<HelmetListPage />} />
        <Route path="/manage/helmet/create" element={<HelmetCreatePage />} />
        <Route path="/manage/helmet/:id/edit" element={<HelmetEditPage />} />
        
        {/* Body Worm Management */}
        <Route path="/manage/body-worm" element={<BodyWormListPage />} />
        <Route path="/manage/body-worm/create" element={<BodyWormCreatePage />} />
        <Route path="/manage/body-worm/:id/edit" element={<BodyWormEditPage />} />
        
        {/* User Management */}
        <Route path="/manage/user" element={<UserListPage />} />
        
        {/* Role Management */}
        <Route path="/manage/role" element={<RoleListPage />} />
        
        {/* Region Management */}
        <Route path="/manage/region" element={<RegionListPage />} />
        
        {/* Layout Management */}
        <Route path="/manage/layout" element={<LayoutListPage />} />
        <Route path="/manage/layout/:id/edit" element={<LayoutEditPage />} />
      </Route>
    </Routes>
  );
}
