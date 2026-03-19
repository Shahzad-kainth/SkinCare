import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router';

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-stone-50">

      {/* Sidebar — hidden on mobile, fixed on desktop */}
      <div className="hidden md:block w-64 fixed top-0 left-0 h-screen z-20">
        <AdminSideBar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-10">
          <AdminHeader />
        </div>
        {/* Scrollable content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;