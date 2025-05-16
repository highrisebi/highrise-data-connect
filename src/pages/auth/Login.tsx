
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, UserPlusIcon } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from '@/components/ui/sonner';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path if it exists
  const from = location.state?.from?.pathname || '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      toast.success("Welcome back!", {
        description: "You've successfully logged in",
      });
      // Redirect to the page they were trying to access, or home
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed", {
        description: "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Coming soon", {
      description: "Google authentication will be available soon",
    });
    // In a real app, this would call a method to initiate Google OAuth
  };

  return (
    <div className="fixed inset-0 flex items-center overflow-hidden">
      {/* Abstract colorful wallpaper section with logo at bottom right */}
      <div className="w-full h-full fixed inset-0">
        <img 
          src="/lovable-uploads/c2582762-c4d7-4d13-9a25-e4e10e590c68.png" 
          alt="Abstract green waves" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-8 right-8 z-10">
          <img 
            src="/lovable-uploads/39739171-e649-42e9-900c-f588d7d31d90.png" 
            alt="HighriseBI Logo" 
            className="h-12 w-auto filter brightness-0 invert" 
          />
        </div>
      </div>
      
      {/* Login form section - floating card with more transparency */}
      <div className="relative z-10 ml-14 self-center">
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl w-[400px] rounded-xl shadow-xl p-8">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-6 dark:text-white text-slate-800 text-center">Welcome!</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 dark:text-white">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field}
                          disabled={isLoading}
                          className="bg-white/80 dark:bg-slate-800/80"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-800 dark:text-white">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="Your password"
                            type={showPassword ? "text" : "password"}
                            {...field}
                            disabled={isLoading}
                            className="bg-white/80 dark:bg-slate-800/80"
                          />
                        </FormControl>
                        <button
                          type="button"
                          className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5" />
                          ) : (
                            <EyeIcon className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <FormMessage />
                      <div className="text-right text-sm">
                        <Link to="/auth/forgot-password" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-medium">
                          Forgot password?
                        </Link>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>
            
            <div className="mt-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white/70 dark:bg-slate-900/70 text-gray-500 dark:text-gray-400">Or</span>
                </div>
              </div>
              
              <div className="mt-5">
                <Button 
                  variant="outline" 
                  onClick={handleGoogleLogin} 
                  className="w-full flex items-center justify-center gap-2 bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700"
                  disabled={isLoading}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Google
                </Button>
              </div>
            </div>
            
            <p className="mt-6 text-center text-sm text-slate-700 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/auth/register" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-medium flex items-center justify-center gap-1 mt-1">
                <UserPlusIcon className="h-4 w-4" />
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
