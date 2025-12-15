import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Email wajib diisi dengan format email yang benar'),
  password: z.string().min(6, 'Password wajib diisi dan minimal 6 karakter'),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  // Only redirect if already authenticated on initial load
  useEffect(() => {
    if (isAuthenticated) {
      console.log('[Login] Already authenticated, redirecting to dashboard');
      navigate('/', { replace: true });
    }
  }, []); // Empty dependency - only run once on mount

  const onSubmit: SubmitHandler<LoginSchemaType> = async (values) => {
    try {
      setLoadingLogin(true);
      console.log('Attempting login with:', { email: values.email });
      
      const result = await login(values);
      
      console.log('Login result:', result);
      
      if (result.success) {
        console.log('[Login] Login successful, waiting for state to save...');
        toast.success('Login successful');
        
        // Small delay to ensure localStorage and state are saved
        setTimeout(() => {
          console.log('[Login] Navigating to dashboard...');
          navigate('/', { replace: true });
        }, 100);
      } else {
        const errorMsg = result.error || 'Login failed';
        console.error('Login failed:', errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: any) {
      console.error('Error signing in:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      const errorMessage = error.response?.data?.message || error.message || 'An error occurred while signing in';
      toast.error(errorMessage);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full xl:w-1/2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <h2 className="mb-5 text-2xl font-bold text-black sm:text-title-xl2">
            Sign In
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register('email')}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="mb-5">
              <button
                type="submit"
                disabled={loadingLogin}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90 disabled:opacity-50"
              >
                {loadingLogin ? (
                  <span className="loading loading-spinner loading-md"></span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
