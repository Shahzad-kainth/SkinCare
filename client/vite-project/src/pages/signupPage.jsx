import {useEffect} from 'react';
import {signupUser} from '../features/authSlice'
import {useSelector,useDispatch} from 'react-redux';
import { NavLink,useNavigate } from 'react-router';
import {useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {z} from 'zod';
function SignupPage(){
     const signupSchema = z.object({
         name: z.string().min(3, 'Name is required'),
         emailId: z.string().email('Invalid email address'),
         password: z.string().min(8, 'Password must be at least 8 characters'),
      });
       const dispatch=useDispatch();
       const navigate=useNavigate();
      const {
        register,
        handleSubmit,
        formState: { errors },
      }=useForm({
        resolver:zodResolver(signupSchema)
      })
    const user = useSelector((state) => state.auth.user); 
      const onSubmit=(data)=>{
        dispatch(signupUser(data));
      }
        useEffect(() => {
            if(user){
            navigate('/login')
            }
        }, [user, navigate]);
      return (
  <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 px-4">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('emailId')}
            className={`w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.emailId ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId.message}</p>}
        </div>

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
             SignUp
             </button>
      </form>
      <p className="text-center text-gray-500 mt-4">
        Already have an account?{' '}
        <NavLink to="/signin" className="text-blue-500 hover:underline">
          SignIn
        </NavLink>
      </p>
    </div>
  </div>
);
   
}

export default SignupPage;