
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeftIcon } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from '@/components/ui/sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    try {
      setIsLoading(true);
      // In a real app, this would call an API to send a reset email
      console.log('Reset password for:', values.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Email sent", {
        description: "Check your inbox for password reset instructions",
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error("Request failed", {
        description: "Unable to send reset instructions. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
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
      
      {/* Forgot password form section - centered card with higher transparency */}
      <div className="relative z-10 self-center">
        <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl w-[440px] rounded-xl shadow-xl p-8">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-center mb-2 text-slate-800 dark:text-white">Forgot Password?</h2>
            <p className="text-center text-slate-700 dark:text-slate-400 mb-6">
              {!submitted 
                ? "Enter your email and we'll send you instructions to reset your password."
                : "Check your email for reset instructions."}
            </p>
            
            {!submitted ? (
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
                  
                  <Button
                    type="submit"
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center">
                <div className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-lg mb-6">
                  <p className="text-slate-800 dark:text-slate-300">
                    We've sent reset instructions to your email. Please check your inbox.
                  </p>
                </div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full bg-white/80 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white"
                >
                  Try Another Email
                </Button>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link to="/auth/login" className="text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white font-medium flex items-center justify-center gap-1">
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
