"use client";

import { FormErrorMessage, InputClass } from "@/components";
import { useAppSelector } from "@/hooks";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { useUpdateProfileMutation } from "@/redux/features/user/user.api";
import { IQueryMutationErrorResponse, IUser } from "@/types";
import { Form, Formik } from "formik";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import { Input } from "../ui/input";

const personalInfoFormSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  avatar: yup
    .mixed<File>()
    .nullable()
    .test("fileSize", "File is too large (max 1MB)", (file) => !file || file.size <= 1024 * 1024)
    .test(
      "fileType",
      "Unsupported file format (use JPG, PNG, or GIF)",
      (file) => !file || ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    ),
});

export default function PersonalInfoForm() {
  const { user } = useAppSelector((s) => s.user);

  const [update, { isLoading }] = useUpdateProfileMutation();

  const [upload, { isLoading: isUploading }] = useUploadSingleFileMutation();

  const initialValues = useMemo(
    () => ({
      firstName: user?.first_name ?? "",
      lastName: user?.last_name ?? "",
      email: user?.email ?? "",
      avatar: null,
    }),
    [user]
  );

  // Local preview URL for avatar
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSubmit = async (values: typeof initialValues) => {
    if (isLoading || isUploading) return;

    const payload: Partial<IUser> = {
      first_name: values.firstName,
      last_name: values.lastName,
    };

    if (values.avatar) {
      const form = new FormData();
      form.append("file", values.avatar);

      const res = await upload(form);
      const error = res.error as IQueryMutationErrorResponse;
      if (error) {
        toast.error("Failed to upload avatar");
      } else {
        payload.avatar = res.data?.data;
      }
    }
    const res = await update(payload);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error?.data?.message || "Something went wrong.");
      return;
    }

    toast.success("Profile updated successfully!");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={personalInfoFormSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, setFieldValue }) => (
        <Form className="md:col-span-2">
          <div className="flex flex-col gap-4 rounded-md border border-border bg-card p-6 shadow-md">
            {/* Avatar */}
            <div className="flex items-center gap-x-4">
              <Image
                alt="Avatar preview"
                src={previewUrl ?? "/images/avatar.jpg"}
                className="size-24 flex-none rounded-lg border border-gray-200 object-cover"
                width={100}
                height={100}
              />

              <div>
                <input
                  id="avatarInput"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.currentTarget.files?.[0] ?? null;
                    if (!file) return;
                    // Update Formik state
                    setFieldValue("avatar", file);
                    // Update preview
                    if (previewUrl) URL.revokeObjectURL(previewUrl);
                    setPreviewUrl(file ? URL.createObjectURL(file) : null);
                  }}
                />
                <label
                  htmlFor="avatarInput"
                  className="inline-flex cursor-pointer rounded border border-border bg-input/40 px-3 py-2 text-sm font-medium text-foreground hover:bg-card"
                >
                  Change Profile
                </label>

                <p className="mt-2 text-xs/5 text-gray-400">JPG or PNG. 1MB max.</p>
                {touched.avatar && errors.avatar && (
                  <p className="mt-1 text-[14px] text-red-600">{String(errors.avatar)}</p>
                )}
              </div>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="text-foreground">
                  Your First Name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="First name"
                  className={InputClass(!!(touched.firstName && errors.firstName))}
                  value={values.firstName}
                  onChange={(e) => setFieldValue("firstName", e.target.value)}
                  onBlur={() => void 0}
                  aria-invalid={!!errors.firstName}
                  aria-describedby={errors.firstName ? "firstName-error" : undefined}
                />
                {touched.firstName && errors.firstName && (
                  <FormErrorMessage message={errors.firstName} />
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="text-foreground">
                  Your Last Name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Last name"
                  className={InputClass(!!(touched.lastName && errors.lastName))}
                  value={values.lastName}
                  onChange={(e) => setFieldValue("lastName", e.target.value)}
                  onBlur={() => void 0}
                  aria-invalid={!!errors.lastName}
                  aria-describedby={errors.lastName ? "lastName-error" : undefined}
                />
                {touched.lastName && errors.lastName && (
                  <FormErrorMessage message={errors.lastName} />
                )}
              </div>
            </div>

            {/* Email (read-only / non-editable) */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="email" className="text-foreground">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`${InputClass(!!(touched.email && errors.email))}`}
                  value={values.email}
                  readOnly
                  disabled
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  title="Email cannot be changed"
                />
                {touched.email && errors.email && <FormErrorMessage message={errors.email} />}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={isUploading || isLoading}
                className="btn-primary w-full"
              >
                {isUploading || isLoading ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
