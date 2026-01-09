/**
 * Signup Page
 * 
 * User registration page with form validation.
 * Calls the auth API for signup.
 */

import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { AuthForm, type AuthFormData } from "@/components/auth/AuthForm";
import { authApi } from "@/lib/api";

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (data: AuthFormData) => {
    // Call the signup API
    const response = await authApi.signup(
      data.name || "",
      data.email,
      data.password
    );

    // Store token and redirect to dashboard
    localStorage.setItem("auth_token", response.token);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
            <p className="mt-2 text-muted-foreground">
              Get started with your free account today
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
            <AuthForm mode="signup" onSubmit={handleSignup} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
