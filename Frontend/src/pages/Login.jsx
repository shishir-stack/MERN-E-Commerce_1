import  { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff,  } from 'lucide-react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utiles/Firebase';
import { userDataContext } from '../context/UserContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  let {serverUrl}=useContext(authDataContext)
  let {getCurrentUser}=useContext(userDataContext)

  let navigate=useNavigate();

  const handleSubmit =async (e) => {
    e.preventDefault();
    const {  email, password } = formData;
    try {
      let result= await axios.post(`${serverUrl}/api/auth/login`,{email,password},{withCredentials:true})
      console.log(result.data);
      await getCurrentUser();
      navigate('/');
    } 

    catch (error) {
      if (error.response && error.response.data) {
        const backendMessage = error.response.data.message || error.response.data.error || "Something went wrong";
        alert(`Error: ${backendMessage}`); 
      } else {
        alert("Network error. Please check if your server is running.");
      }
      console.log(error);
    }
    
  };

  const handleGoogleLogin = async () => {
        try {
          const response = await signInWithPopup(auth,provider)
          // console.log(response);
          
          let user =response.user;
          let name= user.displayName;
          let email= user.email;
          
          const result = await axios.post(serverUrl+'/api/auth/googlelogin',{
            name,email
          },{withCredentials:true});
          console.log(result.data);
          
          await getCurrentUser();
          navigate('/');
        } catch (error) {
          console.log(error);
        }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 backdrop-blur-xl shadow-2xl">
        
        {/* Header */}
        <div className="text-center">
          {/* <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-800 text-white border border-neutral-700">
            <LogIn className="h-6 w-6" />
          </div> */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Welcome back</h2>
          <p className="mt-1 text-sm text-neutral-400">Please enter your details to sign in</p>
        </div>

        {/* Google Login Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 hover:border-neutral-700 active:scale-[0.98]"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l3.227-3.11C18.281 1.045 15.45 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.854 11.57-11.77 0-.79-.085-1.393-.19-1.945H12.24z"
            />
          </svg>
          Sign in with Google
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-neutral-800"></div>
          <span className="absolute bg-neutral-900/90 px-3 text-xs uppercase text-neutral-500">Or continue with</span>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium text-neutral-300">Email Address</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <Mail className="h-5 w-5" />
              </div>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3 pl-10 pr-4 text-white placeholder-neutral-600 outline-none transition focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-300">Password</label>
            <div className="relative mt-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
                <Lock className="h-5 w-5" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-3 pl-10 pr-10 text-white placeholder-neutral-600 outline-none transition focus:border-neutral-600 focus:ring-1 focus:ring-neutral-600"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-white py-3 text-sm font-semibold text-black transition hover:bg-neutral-200 active:scale-[0.98] mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-neutral-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-white hover:underline underline-offset-4">
            Sign up for free
          </Link>
        </p>

      </div>
    </div>
  );
}