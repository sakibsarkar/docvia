"use client";

import { FormErrorMessage, InputClass } from "@/components";
import { useChangePasswordMutation } from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse } from "@/types";
import { Form, Formik, FormikHelpers } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import { Input } from "../ui/input";

const passwordSchema = yup
  .string()
  .required("New Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Must contain at least one uppercase letter")
  .matches(/[a-z]/, "Must contain at least one lowercase letter")
  .matches(/[0-9]/, "Must contain at least one number")
  .matches(
    /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/\?]/,
    "Must contain at least one special character"
  );

const schema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: passwordSchema,
  confirmPassword: yup
    .string()
    .required("Please confirm your new password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

const passwordChecks = [
  { label: "At least 8 characters", check: (pw: string) => pw.length >= 8 },
  { label: "At least one uppercase letter", check: (pw: string) => /[A-Z]/.test(pw) },
  { label: "At least one lowercase letter", check: (pw: string) => /[a-z]/.test(pw) },
  { label: "At least one number", check: (pw: string) => /[0-9]/.test(pw) },
  {
    label: "At least one special character",
    check: (pw: string) => /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
  },
];

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    if (isLoading) return;

    if (values.currentPassword === values.newPassword) {
      return toast.error("New password must be different from current password.");
    }

    const res = await changePassword({
      oldPassword: values.currentPassword,
      password: values.newPassword,
    });

    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      resetForm();
      return;
    }

    toast.success("Password changed successfully!");
    resetForm();
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ values, errors, isSubmitting, handleChange, handleBlur, resetForm, touched }) => (
        <Form className="lg:col-span-2">
          <div className="flex flex-col gap-4 rounded-md border border-border bg-card p-4 shadow-md md:p-6">
            {/* Current password */}
            <div>
              <label htmlFor="current-password" className="text-foreground">
                Current Password
              </label>
              <div className="relative">
                <Input
                  id="current-password"
                  placeholder="*******"
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  autoComplete="current-password"
                  value={values.currentPassword}
                  onChange={handleChange}
                  className={InputClass(!!(touched.currentPassword && errors.currentPassword))}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute top-0 right-3 bottom-0 my-auto h-5.5 w-5.5 text-gray-400"
                  onClick={() => setShowCurrent((s) => !s)}
                  tabIndex={-1}
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              {touched.currentPassword && errors.currentPassword && (
                <FormErrorMessage message={errors.currentPassword} />
              )}
            </div>

            {/* New password */}
            <div>
              <label htmlFor="new-password" className="text-foreground">
                New Password
              </label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  placeholder="*******"
                  autoComplete="new-password"
                  value={values.newPassword}
                  onChange={handleChange}
                  className={InputClass(!!(touched.newPassword && errors.newPassword))}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute top-0 right-3 bottom-0 my-auto h-5.5 w-5.5 text-gray-400"
                  onClick={() => setShowNew((s) => !s)}
                  tabIndex={-1}
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>

              {/* Live checklist */}
              {values.newPassword && (
                <ul className="mt-2 ml-1 space-y-1">
                  {passwordChecks.map((rule, idx) => {
                    const passed = rule.check(values.newPassword);
                    const color = passed
                      ? "text-green-600"
                      : errors.newPassword
                        ? "text-red-500"
                        : "text-gray-400";
                    return (
                      <li key={idx} className="flex items-center text-sm">
                        <span className={color}>{passed ? "✔️" : "❌"}</span>
                        <span className={`${color} ml-2`}>{rule.label}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
              {touched.newPassword && errors.newPassword === "New Password is required" && (
                <FormErrorMessage message={errors.newPassword} />
              )}
            </div>

            {/* Confirm password */}
            <div>
              <label htmlFor="confirm-password" className="text-foreground">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  placeholder="*******"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  className={InputClass(!!(touched.confirmPassword && errors.confirmPassword))}
                  onBlur={handleBlur}
                />
                <button
                  type="button"
                  className="absolute top-0 right-3 bottom-0 my-auto h-5.5 w-5.5 text-gray-400"
                  onClick={() => setShowConfirm((s) => !s)}
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <FormErrorMessage message={errors.confirmPassword} />
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={isLoading} className="btn-primary w-full">
                {isLoading ? "Saving…" : "Save"}
              </button>
              <button type="button" onClick={() => resetForm()} className="btn-secondary w-full">
                Reset
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
