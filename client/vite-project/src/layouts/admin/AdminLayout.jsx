import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router';

function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-emerald-50">

      
      <div className="w-64 fixed top-0 left-0 h-screen">
        <AdminSideBar />
      </div>

      {/* Main content with margin-left equal to sidebar width */}
      <div className="flex-1 flex flex-col ml-64 min-h-screen">

        {/* Header stays on top */}
        <div className="sticky top-0 z-10">
          <AdminHeader />
        </div>

        {/* Main scrollable content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">
          <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 p-6 min-h-[80vh]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;