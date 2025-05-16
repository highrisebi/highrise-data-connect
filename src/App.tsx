
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, AuthGuard } from "@/hooks/useAuth";

// Pages
import Homepage from "@/pages/Homepage";
import Community from "@/pages/Community";
import Contact from "@/pages/Contact";
import Services from "@/pages/Services";
import Editor from "@/pages/Editor";
import Post from "@/pages/Post";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import NotFound from "@/pages/NotFound";

// Layout
import Header from "@/components/layout/Header";

// Query client
import { queryClient } from "@/lib/queryClient";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/community" element={<Community />} />
                <Route path="/community/:id" element={<Post />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services" element={<Services />} />
                
                {/* Protected routes */}
                <Route 
                  path="/editor" 
                  element={
                    <AuthGuard>
                      <Editor />
                    </AuthGuard>
                  } 
                />
                <Route 
                  path="/editor/:id" 
                  element={
                    <AuthGuard>
                      <Editor />
                    </AuthGuard>
                  } 
                />
                
                {/* Auth routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/register" element={<Register />} />
                <Route path="/auth/forgot-password" element={<ForgotPassword />} />
                
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
