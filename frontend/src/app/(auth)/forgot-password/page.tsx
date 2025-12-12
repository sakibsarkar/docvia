"use client";

import { FormErrorMessage } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForgotPasswordMutation } from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse } from "@/types";
import { Form, Formik } from "formik";
import { ArrowLeft, Bot, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const initialValues = { email: "" };

export default function PasswordReset() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (values: typeof initialValues) => {
    if (isLoading) return;
    const res = await forgotPassword({ email: values.email });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }
    toast.success("Password reset link sent to your email");
    setIsSubmitted(true);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Card with subtle glow */}
      <div className="bg-glow-blue rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-xl">
        {/* Back to login link */}
        <Link
          href="/login"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to login
        </Link>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Reset Password</h1>
          <p className="text-sm text-muted-foreground">
            {isSubmitted
              ? "Check your email for password reset instructions"
              : "Enter your email and we'll send you a link to reset your password"}
          </p>
        </div>

        {!isSubmitted ? (
          <>
            {/* Form */}
            <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
              {({ values, errors, touched, submitCount, handleChange, handleBlur }) => {
                const showEmailError = !!errors.email && (touched.email || submitCount > 0);

                return (
                  <Form className="space-y-6" noValidate>
                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          className={`bg-input/50 pl-10 text-foreground placeholder:text-muted-foreground ${
                            showEmailError ? "border-destructive" : ""
                          }`}
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={showEmailError}
                          aria-describedby={showEmailError ? "email-error" : undefined}
                        />
                      </div>
                      {showEmailError && <FormErrorMessage message={errors.email as string} />}
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </Form>
                );
              }}
            </Formik>
          </>
        ) : (
          <>
            {/* Success message */}
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm text-foreground">
                We&apos;ve sent a password reset link to your email address. Please check your inbox
                and follow the instructions.
              </p>
            </div>

            {/* Resend link */}
            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Didn&apos;t receive the email? Try again
              </button>
            </div>
          </>
        )}

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
