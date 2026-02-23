import { useEffect } from "react";
import { loginUser } from "../features/authSlice";
import { useSelector,useDispatch } from "react-redux";
import { NavLink,useNavigate } from "react-router";
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';

function LoginPage(){
      const loginSchema = z.object({
         emailId: z.string().email('Invalid email address'),
         password: z.string().min(8, 'Password must be at least 8 characters'),
      });
      const dispatch=useDispatch();
      const navigate=useNavigate();
      const {
        register,
        handleSubmit,
        reset,
        formState:{errors}
      }=useForm({
            resolver:zodResolver(loginSchema),
             mode: "onChange"
        })
         
        const user=useSelector((state)=>state.auth.user)
        const onSubmit=(data)=>{
            dispatch(loginUser(data))
            // reset();
        }
        useEffect(() => {
        if (user) {
           navigate('/admin');
        }
        }, [user, navigate]);

        return(
            <div className="min-h-screen min-w-screen flex justify-center items-center  bg-gradient-to-r from-blue-400 to-purple-600 px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                     <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign In</h2>
                     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* email Input */}
                        <div>
                             <input 
                              type="email"
                              placeholder="Email"
                              {...register('emailId')}
                              className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.emailId ? 'border-red-500' : 'border-gray-300'}`}
                              >
                             </input>
                              {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId.message}</p>}
                        </div>
                        {/* password input */}
                        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
             <button 
             type='submit'
             className='w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-semibold transition duration-300'
             >
             Sign In
             </button>
                </form>
                 <p className="text-center text-gray-500 mt-4">
                         Register Here?{' '}
                 <NavLink to="/signup" className="text-blue-500 hover:underline">
                     Sign Up
                   </NavLink>
                  </p>
            </div>
            
            </div>
            
        )
}

export default LoginPage;