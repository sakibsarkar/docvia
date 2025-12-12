"use client";

import { FormErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResetPasswordMutation } from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse } from "@/types";
import { Form, Formik } from "formik";
import { Check, Eye, EyeOff, Lock, X } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object({
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

const initialValues = { password: "", confirmPassword: "" };

export default function ConfirmPasswordReset() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("t");

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [router, token]);

  const handleSubmit = async (values: typeof initialValues) => {
    if (!token || isLoading) return;

    const res = await resetPassword({ token, password: values.password });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }
    toast.success("Password reset successful! Please login with your new password.");
    router.push("/login");
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Card with subtle glow */}
      <div className="bg-glow-blue rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Set New Password</h1>
          <p className="text-sm text-muted-foreground">
            Enter your new password below to reset your account password
          </p>
        </div>

        {/* Form */}
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form className="space-y-6" noValidate>
              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  New Password
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
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    className={`bg-input/50 pr-10 text-foreground placeholder:text-muted-foreground ${
                      touched.confirmPassword && errors.confirmPassword ? "border-destructive" : ""
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
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isLoading ? "Resetting Password..." : "Reset Password"}
              </Button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
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
