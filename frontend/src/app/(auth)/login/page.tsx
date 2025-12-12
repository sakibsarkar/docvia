"use client";

import { FormErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useLoginUserMutation } from "@/redux/features/user/user.api";
import { setUser, updateUser } from "@/redux/features/user/user.slice";
import { IQueryMutationErrorResponse } from "@/types";
import { Form, Formik } from "formik";
import { Bot, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean(),
});

const initialValues = { email: "", password: "", rememberMe: false };

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { user } = useAppSelector((state) => state.user);

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await loginUser({ email: values.email, password: values.password });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }

    const data = res?.data?.data;

    if (!data?.result?.isVerified) {
      dispatch(updateUser({ isVerified: false, email: values.email }));
      toast.error("Please verify your email", { description: "Please try again" });
      router.push("/register/verification");
      return;
    }

    dispatch(setUser(data?.result || null));
    router.push("/dashboard");

    toast.success("Login successful");
  };

  return (
    <div className="relative w-full">
      {/* Card with subtle glow */}
      <div className="bg-glow-blue rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            submitCount,
            handleChange,
            handleBlur,
            isSubmitting,
            setFieldValue,
          }) => {
            const showEmailError = !!errors.email && (touched.email || submitCount > 0);
            const showPasswordError = !!errors.password && (touched.password || submitCount > 0);

            return (
              <Form className="space-y-6" noValidate>
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
                      showEmailError ? "border-destructive" : ""
                    }`}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? "email-error" : undefined}
                  />
                  {showEmailError && <FormErrorMessage message={errors.email as string} />}
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
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className={`bg-input/50 pr-10 text-foreground placeholder:text-muted-foreground ${
                        showPasswordError ? "border-destructive" : ""
                      }`}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={showPasswordError}
                      aria-describedby={showPasswordError ? "password-error" : undefined}
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
                  {showPasswordError && <FormErrorMessage message={errors.password as string} />}
                </div>

                {/* Remember me + Forgot password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={values.rememberMe}
                      onCheckedChange={(checked) => setFieldValue("rememberMe", checked)}
                    />
                    <label htmlFor="rememberMe" className="cursor-pointer text-sm text-foreground">
                      Remember me
                    </label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </Form>
            );
          }}
        </Formik>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-primary transition-colors hover:text-primary/80"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
