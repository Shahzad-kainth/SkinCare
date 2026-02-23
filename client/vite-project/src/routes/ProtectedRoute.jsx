import {useEffect} from 'react';
import {Navigate,Outlet} from 'react-router';
import { checkAuth } from '../features/authSlice';
import {useSelector,useDispatch} from 'react-redux';
export default function ProtectedRoute(){
        const status=useSelector((state)=>state.auth.checkAuth.status);
        const user=useSelector((state)=>state.auth.user);
         const dispatch=useDispatch()
           useEffect(()=>{
              if(status==='idle'){
               dispatch(checkAuth())
              }
           },[dispatch,status])
            if (status === "loading" || status==="failed") {
             return <div>Checking Authentication...</div>;
            }
             if (!user && status === "failed") {
              return <Navigate to="/signin" replace />;
             }

             return <Outlet/>
}