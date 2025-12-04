"use client";

import * as yup from "yup";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { FormErrorMessage } from "@/components";
import { IQueryMutationErrorResponse } from "@/types/queryMutationErrorResponse";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setToken, setUser, updateUser } from "@/redux/features/user/user.slice";
import { useLoginUserMutation } from "@/redux/features/user/user.api";

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
    router.push("/dashboard")

    toast.success("Login successful");
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
      hasError ? "border-red-400 focus:ring-0" : "border-gray-300"
    }`;

  return (
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
                Login
              </h2>
            </div>

            {/* Form */}
            <Form className="mb-4 flex flex-col gap-6" noValidate>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <div className="w-full">
                  <label className="label" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-label="Email address"
                    className={inputClass(showEmailError)}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={showEmailError}
                    aria-describedby={showEmailError ? "email-error" : undefined}
                  />
                  {showEmailError && <FormErrorMessage message={errors.email as string} />}
                </div>

                {/* Password */}
                <div>
                  <label className="label" htmlFor="password">
                    Password
                  </label>
                  <div className="relative h-full w-full">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      aria-label="Password"
                      className={inputClass(showPasswordError)}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={showPasswordError}
                      aria-describedby={showPasswordError ? "password-error" : undefined}
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-3 bottom-0 my-auto text-gray-400"
                      onClick={() => setShowPassword((prev) => !prev)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <EyeIcon className="h-5 w-5" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {showPasswordError && <FormErrorMessage message={errors.password as string} />}
                </div>
              </div>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between">
                <label
                  htmlFor="rememberMe"
                  className="mb-0 flex items-center gap-2 text-sm text-gray-900"
                >
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={values.rememberMe}
                    onChange={(e) => setFieldValue("rememberMe", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    aria-checked={values.rememberMe}
                  />
                  Remember me
                </label>

                <div className="text-sm">
                  <Link
                    href="/password-reset"
                    className="font-semibold text-blue-500 transition hover:text-blue-600"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-70"
                >
                  {isSubmitting || isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>

            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-500 transition hover:text-blue-600"
              >
                Register
              </Link>
            </p>
          </div>
        );
      }}
    </Formik>
  );
}
