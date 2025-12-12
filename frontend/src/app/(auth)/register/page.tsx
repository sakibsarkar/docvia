"use client";

import { FormErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks";
import { useRegisterCustomerMutation } from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse } from "@/types";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { Bot, Check, Eye, EyeOff, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: yup
    .string()
    .required("Password confirmation is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const passwordChecks = [
  { label: "At least 8 characters", check: (pw: string) => pw.length >= 8 },
  { label: "At least one uppercase letter", check: (pw: string) => /[A-Z]/.test(pw) },
  { label: "At least one lowercase letter", check: (pw: string) => /[a-z]/.test(pw) },
  { label: "At least one number", check: (pw: string) => /[0-9]/.test(pw) },
  {
    label: "At least one special character",
    check: (pw: string) => /[@$!%*?&#^()_+\-=[\]{};':"\\|,.<>/?]/.test(pw),
  },
];

const initialValues = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [registerUser, { isLoading }] = useRegisterCustomerMutation();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      if (user.isVerified) {
        router.replace("/");
      } else {
        router.replace("/register/verification");
      }
    }
  }, [user, router]);

  const handleSubmit = async (values: typeof initialValues) => {
    if (isLoading) return;
    const res = await registerUser({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.confirmPassword,
    });

    const error = res?.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }

    const registeredEmail = values.email;
    Cookies.set("verification_email", registeredEmail, { sameSite: "lax" });
    router.replace("/register/verification");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Card with subtle glow */}
        <div className="bg-glow-blue rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-sm text-muted-foreground">
              Sign up to get started with your AI chatbot
            </p>
          </div>

          {/* Form */}
          <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form className="space-y-6" noValidate>
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      className={`bg-input/50 text-foreground placeholder:text-muted-foreground ${
                        touched.firstName && errors.firstName ? "border-destructive" : ""
                      }`}
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormErrorMessage message={errors.firstName} />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      placeholder="Doe"
                      className={`bg-input/50 text-foreground placeholder:text-muted-foreground ${
                        touched.lastName && errors.lastName ? "border-destructive" : ""
                      }`}
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormErrorMessage message={errors.lastName} />
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={`bg-input/50 text-foreground placeholder:text-muted-foreground ${
                      touched.email && errors.email ? "border-destructive" : ""
                    }`}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && <FormErrorMessage message={errors.email} />}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className={`bg-input/50 pr-10 text-foreground placeholder:text-muted-foreground ${
                        touched.password && errors.password ? "border-destructive" : ""
                      }`}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password checklist */}
                  {values.password && (
                    <ul className="mt-2 space-y-1" aria-live="polite">
                      {passwordChecks.map((rule, idx) => {
                        const passed = rule.check(values.password);
                        return (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            {passed ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span className={passed ? "text-green-500" : "text-muted-foreground"}>
                              {rule.label}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {touched.password && errors.password === "Password is required" && (
                    <FormErrorMessage message={errors.password} />
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-foreground">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className={`bg-input/50 pr-10 text-foreground placeholder:text-muted-foreground ${
                        touched.confirmPassword && errors.confirmPassword
                          ? "border-destructive"
                          : ""
                      }`}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      tabIndex={-1}
                      aria-label={
                        showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <FormErrorMessage message={errors.confirmPassword} />
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>
              </Form>
            )}
          </Formik>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary transition-colors hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
