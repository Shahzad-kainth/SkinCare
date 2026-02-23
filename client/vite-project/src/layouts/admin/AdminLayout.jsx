import AdminSideBar from './AdminSideBar';
import AdminHeader from './AdminHeader'
import {Outlet} from 'react-router'
function AdminLayout(){
     return(
        <div className="min-h-screen flex bg-gray-100">
            <AdminSideBar/>
             <div className='flex-1 flex flex-col'>
            <AdminHeader/>
                <main className='flex-1 p-6'><Outlet/></main>
             </div>
        </div>
     )
}
export default AdminLayout;