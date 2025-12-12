"use client";

import { FormErrorMessage } from "@/components";
import {
  useSendVerificationOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse } from "@/types";
import dateUtils from "@/utils/date";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

const validationSchema = yup.object({
  otp: yup
    .string()
    .required("Please enter your OTP!")
    .matches(/^\d{6}$/, "Please enter a valid 6‑digit OTP"),
});

const Verification = () => {
  const [sendVerificationOtp] = useSendVerificationOtpMutation();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [email] = useState<string>(() => Cookies.get("verification_email") || "");
  const router = useRouter();

  // Per-email keys (survive strict-mode remounts & reloads within the same tab/session)
  const sentKey = email ? `otpSent:${email}` : "";
  const cooldownKey = email ? `otpCooldownEnd:${email}` : "";

  const restoreRemainingFromStorage = (): number => {
    if (typeof window === "undefined" || !cooldownKey) return 0;
    const end = sessionStorage.getItem(cooldownKey);
    if (!end) return 0;
    const endMs = Number(end);
    const secs = Math.floor((endMs - Date.now()) / 1000);
    return secs > 0 ? secs : 0;
  };

  interface OtpPayload {
    remainingSecond?: number;
    cooldownEnd?: string;
  }

  const setCooldownFromPayload = (payload: OtpPayload | undefined): void => {
    const remainingSecond = payload?.remainingSecond;
    const cooldownEndISO = payload?.cooldownEnd;

    let secs: number = 0;
    let endMs: number = 0;

    if (typeof remainingSecond === "number") {
      secs = Math.max(0, remainingSecond);
      endMs = Date.now() + secs * 1000;
    } else if (cooldownEndISO) {
      endMs = new Date(cooldownEndISO).getTime();
      secs = Math.floor((endMs - Date.now()) / 1000);
      if (secs < 0) secs = 0;
    }

    setRemainingTime(secs);

    if (typeof window !== "undefined" && endMs > 0) {
      if (sentKey) sessionStorage.setItem(sentKey, "1");
      if (cooldownKey) sessionStorage.setItem(cooldownKey, String(endMs));
    }
  };

  useEffect(() => {
    if (!email) {
      toast.error("Email is missing. Please register again.");
      router.replace("/register");
      return;
    }

    // Restore any existing cooldown (so timer shows immediately on reload)
    const restored = restoreRemainingFromStorage();
    if (restored > 0) setRemainingTime(restored);

    // If already sent in this session, don't auto-send again
    if (typeof window !== "undefined" && sentKey && sessionStorage.getItem(sentKey) === "1") {
      return;
    }

    const sendOtpOnce = async () => {
      const response = await sendVerificationOtp({ email });
      const error = response?.error as IQueryMutationErrorResponse | undefined;

      if (error) {
        toast.error(error?.data?.message || "Failed to send verification code.");
        return;
      }

      if (response?.data?.success) {
        toast.success("Please check your email for verification.");
      }

      const payload = response?.data?.data;
      // setCooldownFromPayload(payload);
    };

    sendOtpOnce();
  }, [email, router, sendVerificationOtp, sentKey, cooldownKey]);

  // Cooldown countdown
  useEffect(() => {
    if (remainingTime <= 0) {
      // Clear stored cooldown when it expires
      if (typeof window !== "undefined" && cooldownKey) {
        sessionStorage.removeItem(cooldownKey);
      }
      return;
    }
    const id = setInterval(() => {
      setRemainingTime((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [remainingTime, cooldownKey]);

  const handleResend = async () => {
    if (!email) return;
    const response = await sendVerificationOtp({ email });

    const error = response?.error as IQueryMutationErrorResponse | undefined;
    if (error) {
      toast.error(error?.data?.message || "Failed to resend verification code.");
      return;
    }

    if (response?.data?.success) {
      toast.success("Verification code resent. Please check your email.");
    }

    const payload = response?.data?.data;
    // setCooldownFromPayload(payload);
  };

  const handleVerify = async (values: { otp: string }): Promise<void> => {
    if (!email) {
      toast.error("Email is missing. Please register again.");
      router.replace("/register");
      return;
    }

    const response = await verifyOtp({ email, otp: values.otp });
    const error = response?.error as IQueryMutationErrorResponse | undefined;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      return;
    }

    toast.success("OTP verified successfully! Please Login.");

    // Clean up
    Cookies.remove("verification_email");
    if (typeof window !== "undefined") {
      if (sentKey) sessionStorage.removeItem(sentKey);
      if (cooldownKey) sessionStorage.removeItem(cooldownKey);
    }

    // Redirect (default to login)
    const redirect = Cookies.get("redirect") || "/login";
    Cookies.remove("redirect");
    router.replace(redirect);
  };

  return (
    <div className="bg-glow-blue rounded-2xl border border-border/50 bg-card/40 p-8 backdrop-blur-xl">
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={handleVerify}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <div>
            {/* Header */}
            <div className="mb-6">
              <h2 className="text-center font-poppins text-3xl font-semibold text-foreground">
                Verification
              </h2>
              {email && (
                <p className="mt-2 text-center text-sm text-gray-500">
                  We sent a code to{" "}
                  <span className="font-medium text-muted-foreground">{email}</span>
                </p>
              )}
            </div>

            <Form className="mb-4 flex flex-col gap-4" noValidate>
              {/* OTP */}
              <div>
                <label className="text-foreground" htmlFor="otp">
                  OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  autoComplete="one-time-code"
                  placeholder="Enter Your Verification Code"
                  className={`w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                    touched.otp && errors.otp ? "border-red-400 focus:ring-0" : "border-gray-300"
                  }`}
                  value={values.otp}
                  onChange={(e) => {
                    const digitsOnly = e.target.value.replace(/\D/g, "");
                    handleChange({ target: { name: "otp", value: digitsOnly.slice(0, 6) } });
                  }}
                  onBlur={handleBlur}
                />
                {touched.otp && errors.otp && <FormErrorMessage message={errors.otp} />}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex w-full justify-center rounded-lg bg-blue-600 px-3 py-2 text-base font-semibold text-white shadow-md transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 disabled:opacity-70"
                >
                  {isSubmitting || isLoading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </Form>

            <span className="text-sm text-gray-500">
              Didn&apos;t receive the code?{" "}
              {remainingTime > 0 ? (
                <>Resend in {dateUtils.formatSecondsToMMSS(remainingTime)}</>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={remainingTime > 0}
                  className="ml-1 cursor-pointer font-bold text-blue-500 hover:text-blue-600"
                >
                  Resend
                </button>
              )}
            </span>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Verification;
