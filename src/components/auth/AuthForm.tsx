/**
 * AuthForm Component
 * 
 * Reusable form for login and signup with role selection.
 * Includes validation and error handling.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: AuthFormData) => Promise<void>;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
  role?: "organizer" | "student";
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  general?: string;
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    role: undefined,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = mode === "login";

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!isLogin && !formData.name?.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!isLogin && !formData.role) {
      newErrors.role = "Please select a role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : "An error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof AuthFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const selectRole = (role: "organizer" | "student") => {
    setFormData((prev) => ({ ...prev, role }));
    if (errors.role) {
      setErrors((prev) => ({ ...prev, role: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* General error */}
      {errors.general && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {errors.general}
        </div>
      )}

      {/* Role selection (signup only) */}
      {!isLogin && (
        <div className="space-y-3">
          <Label>I am a</Label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => selectRole("student")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                formData.role === "student"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <User className="h-6 w-6" />
              <span className="font-medium">Student</span>
              <span className="text-xs text-muted-foreground">Browse & register</span>
            </button>
            <button
              type="button"
              onClick={() => selectRole("organizer")}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all",
                formData.role === "organizer"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/50"
              )}
            >
              <Users className="h-6 w-6" />
              <span className="font-medium">Organizer</span>
              <span className="text-xs text-muted-foreground">Create & manage</span>
            </button>
          </div>
          {errors.role && (
            <p className="text-sm text-destructive">{errors.role}</p>
          )}
        </div>
      )}

      {/* Name field (signup only) */}
      {!isLogin && (
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange("name")}
            className={cn(errors.name && "border-destructive")}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name}</p>
          )}
        </div>
      )}

      {/* Email field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@college.edu"
          value={formData.email}
          onChange={handleChange("email")}
          className={cn(errors.email && "border-destructive")}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      {/* Password field */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {isLogin && (
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Forgot password?
            </a>
          )}
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange("password")}
            className={cn("pr-10", errors.password && "border-destructive")}
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password}</p>
        )}
      </div>

      {/* Submit button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isLogin ? "Signing in..." : "Creating account..."}
          </>
        ) : isLogin ? (
          "Sign in"
        ) : (
          "Create account"
        )}
      </Button>

      {/* Toggle link */}
      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <Link
          to={isLogin ? "/signup" : "/login"}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </Link>
      </p>
    </form>
  );
}
