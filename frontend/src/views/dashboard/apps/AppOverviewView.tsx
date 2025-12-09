"use client";
import { DeleteAppPopup, FormErrorMessage } from "@/components";
import type React from "react";

import AppOverviewSkeleton from "@/components/apps/appOverview/AppOverviewSkeleton";
import AppSecret from "@/components/apps/appOverview/AppSecret";
import { useGetAppByIdQuery, useUpdateAppByAppIdMutation } from "@/redux/features/apps/apps.api";
import type { IApp, IQueryMutationErrorResponse } from "@/types";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { CheckCircle, ShieldAlert as CloudAlert } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";

const ACCEPTED_TYPES: string[] = ["image/jpeg", "image/png"] as const;
const MAX_BYTES = 5_00_000;

type TFormValues = Pick<IApp, "appName" | "authorizedOrigin" | "isActive" | "description">;

const schema = yup.object({
  appName: yup.string().required("App name is required"),
  authorizedOrigin: yup
    .string()
    .required("Website URL is required")
    .matches(
      /^https:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
      "Enter a valid root URL (e.g., https://example.com)"
    ),
  isActive: yup.boolean().required(),
  description: yup.string().max(200, "Description can't be longer than 200 characters").optional(),
});

const AppOverviewView = () => {
  const params = useParams<{ appId?: string }>();
  const appId = params?.appId as string;

  const [updateApp, { isLoading: isUpdating }] = useUpdateAppByAppIdMutation();
  const { data, isLoading } = useGetAppByIdQuery(appId);
  const [openPopup, setOpenPopup] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleUpate = async (values: TFormValues, { resetForm }: FormikHelpers<TFormValues>) => {
    const res = await updateApp({
      appId,
      payload: values,
    });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong. Please try again.");
      return;
    }

    toast.success("App updated successfully!");
  };

  const handleAvatarFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidFileType = ACCEPTED_TYPES.includes(file.type);
    const isFileSizeValid = file.size <= MAX_BYTES;

    if (!isValidFileType) {
      toast.error("Please select a valid image file.", {
        description: "Supported file types: .jpg, .png",
      });
      return;
    }

    if (!isFileSizeValid) {
      toast.error("Image file is too large.", {
        description: "Please select a file less than 500KB.",
      });
      return;
    }

    setAvatarFile(file);
  };

  const appData = data?.data;
  const initialValues: TFormValues = {
    appName: appData?.appName || "",
    authorizedOrigin: appData?.authorizedOrigin || "",
    isActive: appData?.isActive || false,
    description: appData?.description || "",
  };

  if (isLoading) {
    return <AppOverviewSkeleton />;
  }

  return (
    <section>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleUpate}>
        {({ errors, touched, status, values }) => {
          const nameHasError = touched.appName && !!errors.appName;
          const domainHasError = touched.authorizedOrigin && !!errors.authorizedOrigin;
          const descriptionHasError = touched.description && !!errors.description;

          return (
            <Form className="bg-glow-blue rounded-md border border-border bg-card/50 p-5 shadow-lg backdrop-blur-sm md:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {/* Left */}
                <div className="flex flex-col gap-6 md:w-1/2">
                  {/* App name */}
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-semibold text-white">
                      App Name
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      This is your app&apos;s visible name.
                    </p>

                    <Field
                      id="appName"
                      name="appName"
                      type="text"
                      autoComplete="off"
                      placeholder="My Custom App"
                      aria-invalid={nameHasError}
                      aria-describedby={nameHasError ? "name-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-input/50 px-3 py-2 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/50 ${
                        nameHasError
                          ? "border-destructive focus:ring-destructive/50"
                          : "border-border hover:border-border/80"
                      }`}
                    />

                    {nameHasError && (
                      <div id="name-error" className="mt-2">
                        <FormErrorMessage message={errors.appName as string} />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <span className="block text-[13px] font-semibold text-white">Status</span>

                    <div className="mt-2 flex items-center justify-between rounded-md border border-border bg-muted/20 px-3 py-2.5">
                      <span
                        className={`text-sm ${values.isActive ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {values.isActive ? "Active" : "Inactive"}
                      </span>

                      <label className="inline-flex items-center">
                        <Field
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          role="switch"
                          aria-checked={values.isActive}
                          className="peer sr-only"
                          disabled={isUpdating}
                        />
                        <span
                          className={`relative inline-block h-5 w-9 rounded-full transition-colors ${values.isActive ? "bg-primary" : "bg-muted"} cursor-pointer peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-primary after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform ${values.isActive ? "after:translate-x-4" : "after:translate-x-0"} `}
                          aria-hidden="true"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Website URL */}
                  <div>
                    <label
                      htmlFor="authorizedOrigin"
                      className="block text-[13px] font-semibold text-white"
                    >
                      Website URL
                    </label>
                    <p className="mt-1 text-xs text-muted-foreground">
                      The site where you&apos;ll embed the chat widget.
                    </p>

                    <Field
                      id="authorizedOrigin"
                      name="authorizedOrigin"
                      type="url"
                      placeholder="https://mydomain.com"
                      autoComplete="off"
                      aria-invalid={domainHasError}
                      aria-describedby={domainHasError ? "domain-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-input/50 px-3 py-2 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/50 ${
                        domainHasError
                          ? "border-destructive focus:ring-destructive/50"
                          : "border-border hover:border-border/80"
                      }`}
                    />

                    {domainHasError && (
                      <div id="domain-error" className="mt-2">
                        <FormErrorMessage message={errors.authorizedOrigin as string} />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-[13px] font-semibold text-white"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="My app description..."
                        className={`mt-1 min-h-[100px] w-full rounded-md border bg-input/50 px-3 py-2 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/50 ${
                          descriptionHasError
                            ? "border-destructive focus:ring-destructive/50"
                            : "border-border hover:border-border/80"
                        }`}
                        defaultValue={""}
                      />
                      <span className="text-[12px] text-muted-foreground">
                        {values.description?.length || 0} / 200
                      </span>
                      {descriptionHasError && (
                        <div id="domain-error" className="mt-2">
                          <FormErrorMessage message={errors.description as string} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-4 md:w-1/2">
                  {/* Image */}
                  <div className="flex items-center gap-x-4">
                    <Image
                      alt="Image preview"
                      src={
                        avatarFile
                          ? URL.createObjectURL(avatarFile)
                          : `https://ui-avatars.com/api/?name=${data?.data?.appName}&size=128`
                      }
                      className="size-24 flex-none rounded-lg border border-border object-cover"
                      width={96}
                      height={96}
                    />

                    <div>
                      <input
                        id="avatarInput"
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        className="hidden"
                        onChange={handleAvatarFileChange}
                      />
                      <label
                        htmlFor="avatarInput"
                        className="inline-flex cursor-pointer rounded border border-border bg-muted/20 px-3 py-2 text-[13px] font-medium text-foreground transition-all hover:border-primary/50 hover:bg-muted/40"
                      >
                        Change Image
                      </label>

                      <p className="mt-1 text-xs/5 text-muted-foreground">JPG or PNG. Max 500KB.</p>
                    </div>
                  </div>

                  {/* App ID (read-only) */}
                  <AppSecret appId={appId} />
                </div>
              </div>

              {/* Save / feedback */}
              <div className="mt-6 flex flex-col items-start justify-start gap-3">
                {status?.saved && (
                  <span className="inline-flex items-center gap-1 text-sm text-green-500">
                    <CheckCircle className="h-4 w-4" />
                    Saved
                  </span>
                )}
                {status?.error && (
                  <span className="inline-flex items-center gap-1 text-sm text-destructive">
                    <CloudAlert className="h-4 w-4" />
                    {status.error}
                  </span>
                )}
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-60"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* Delete */}
      <div className="bg-glow-purple mt-6 flex flex-col gap-4 rounded-md border border-border bg-card/50 p-5 backdrop-blur-sm md:flex-row md:justify-between md:p-6">
        <div>
          <h4 className="mb-1 text-[16px] font-semibold text-white">Delete App</h4>
          <p className="mb-2 text-[12px] text-muted-foreground">
            Permanently delete the app and all its data. This action is irreversible—proceed with
            caution.
          </p>
        </div>
        <button
          onClick={() => setOpenPopup(true)}
          type="button"
          className="rounded-md bg-destructive px-5 py-2 text-sm font-medium whitespace-nowrap text-destructive-foreground transition-all hover:bg-destructive/90"
        >
          Delete App Permanently
        </button>
        <DeleteAppPopup appId={appId} openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </div>
    </section>
  );
};

export default AppOverviewView;
