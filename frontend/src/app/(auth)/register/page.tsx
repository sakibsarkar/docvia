"use client";

import { FormErrorMessage, InputClass } from "@/components";
import { useAppSelector } from "@/hooks";
import { useRegisterCustomerMutation } from "@/redux/features/user/user.api";
import type { IQueryMutationErrorResponse } from "@/types";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
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
      /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/,
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
    check: (pw: string) => /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw),
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

    const registeredEmail = res?.data?.data?.email || values.email;
    Cookies.set("verification_email", registeredEmail, { sameSite: "lax" });
    router.replace("/register/verification");
  };

  return (
    <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <div>
          {/* Header */}
          <div className="mb-6">
            <Image
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=600"
              className="mx-auto mb-4 h-10 w-auto"
              width={40}
              height={40}
              priority
            />
            <h2 className="text-center font-poppins text-3xl font-semibold text-gray-700">
              Register
            </h2>
          </div>

          {/* Form */}
          <Form className="mb-4 flex flex-col gap-6" noValidate>
            <div className="flex flex-col gap-4">
              {/* First Name & Last Name */}
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="label" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    className={InputClass(!!(touched.firstName && errors.firstName))}
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.firstName && errors.firstName && (
                    <FormErrorMessage message={errors.firstName} />
                  )}
                </div>
                <div className="w-1/2">
                  <label className="label" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className={InputClass(!!(touched.lastName && errors.lastName))}
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
              <div>
                <label className="label" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={InputClass(!!(touched.email && errors.email))}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.email && errors.email && <FormErrorMessage message={errors.email} />}
              </div>

              {/* Password */}
              <div>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={InputClass(!!(touched.password && errors.password))}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-3 bottom-0 my-auto text-gray-400"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                  </button>
                </div>

                {/* Password checklist */}
                {values.password && (
                  <ul className="mt-2 ml-1 space-y-1" aria-live="polite">
                    {passwordChecks.map((rule, idx) => {
                      const passed = rule.check(values.password);
                      const color = passed
                        ? "text-green-600"
                        : errors.password
                          ? "text-red-500"
                          : "text-gray-500";
                      return (
                        <li key={idx} className="flex items-center text-sm">
                          <span className={color}>{passed ? "✔️" : "❌"}</span>
                          <span className={`${color} ml-2`}>{rule.label}</span>
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
              <div>
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    className={InputClass(!!(touched.confirmPassword && errors.confirmPassword))}
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-3 bottom-0 my-auto text-gray-400"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    tabIndex={-1}
                    aria-label={
                      showConfirmPassword ? "Hide confirm password" : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-5 w-5" />
                    ) : (
                      <EyeOff className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <FormErrorMessage message={errors.confirmPassword} />
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className="btn-primary flex w-full justify-center"
              >
                {isSubmitting || isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </Form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-500 transition hover:text-blue-600"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </Formik>
  );
}
