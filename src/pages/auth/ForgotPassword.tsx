
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
    <div className="min-h-screen flex">
      {/* Forgot password form section - left side 1/5 width */}
      <div className="w-1/5 min-w-[300px] bg-white dark:bg-slate-900 flex items-center justify-center px-6 z-10">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Forgot Password?</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
            {!submitted 
              ? "Enter your email and we'll send you instructions to reset your password."
              : "Check your email for reset instructions."}
          </p>
          
          {!submitted ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                </Button>
              </form>
            </Form>
          ) : (
            <div className="text-center">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                <p className="text-green-700 dark:text-green-400">
                  We've sent reset instructions to your email. Please check your inbox.
                </p>
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Try Another Email
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <Link to="/auth/login" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center justify-center gap-1">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Abstract colorful wallpaper section - 4/5 width */}
      <div className="w-4/5 relative flex items-center justify-center overflow-hidden">
        <img 
          src="/lovable-uploads/c2582762-c4d7-4d13-9a25-e4e10e590c68.png" 
          alt="Abstract green waves" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-white text-3xl font-bold">HighriseBI</h1>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
