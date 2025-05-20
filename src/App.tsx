
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Footer from "@/components/layout/Footer";

// Query client
import { queryClient } from "@/lib/queryClient";

// Layout wrapper component to conditionally render header/footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth/');
  
  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <Homepage />
              </Layout>
            } />
            <Route path="/community" element={
              <Layout>
                <Community />
              </Layout>
            } />
            <Route path="/community/:id" element={
              <Layout>
                <Post />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <Contact />
              </Layout>
            } />
            <Route path="/services" element={
              <Layout>
                <Services />
              </Layout>
            } />
            
            {/* Protected routes */}
            <Route path="/editor" element={
              <Layout>
                <AuthGuard>
                  <Editor />
                </AuthGuard>
              </Layout>
            } />
            <Route path="/editor/:id" element={
              <Layout>
                <AuthGuard>
                  <Editor />
                </AuthGuard>
              </Layout>
            } />
            
            {/* Auth routes - no header/footer */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            
            {/* Catch-all route */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
