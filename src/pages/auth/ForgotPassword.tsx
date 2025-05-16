
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MailIcon, ArrowLeftIcon } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header with graphic element */}
          <div className="h-16 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center mt-12 shadow-lg">
              <MailIcon className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="px-8 py-12 pt-16">
            <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Forgot Password?</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
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
                        <FormLabel>Email</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              {...field}
                              className="pl-10" 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <MailIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button
                    type="submit"
                    className="w-full py-6"
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
                  onClick={() => form.reset() || setSubmitted(false)}
                  variant="outline"
                  className="w-full"
                >
                  Try Another Email
                </Button>
              </div>
            )}
            
            <div className="mt-8 text-center">
              <Link to="/auth/login" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 font-medium flex items-center justify-center gap-1">
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
