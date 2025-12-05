"use client";
import { DeleteAppPopup, FormErrorMessage } from "@/components";
import { useGetAppByIdQuery, useUpdateAppByAppIdMutation } from "@/redux/features/apps/apps.api";
import { IApp, IQueryMutationErrorResponse } from "@/types";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { CheckCircle, CloudAlert } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import AppOverviewSkeleton from "./AppOverviewSkeleton";
import AppSecret from "./AppSecret";

const ACCEPTED_TYPES: string[] = ["image/jpeg", "image/png"] as const;
const MAX_BYTES = 5_00_000; // 0.5MB

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

  isActive: yup.boolean().required(), // NEW
  description: yup.string().max(200, "Description can't be longer than 200 characters").optional(),
});

const AppOverview = () => {
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
            <Form className="rounded-md border border-gray-100 bg-white p-5 shadow md:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {/* Left */}
                <div className="flex flex-col gap-6 md:w-1/2">
                  {/* App name */}
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-semibold text-gray-900">
                      App Name
                    </label>
                    <p className="mt-1 text-xs text-gray-500">This is your app’s visible name.</p>

                    <Field
                      id="appName"
                      name="appName"
                      type="text"
                      autoComplete="off"
                      placeholder="My Custom App"
                      aria-invalid={nameHasError}
                      aria-describedby={nameHasError ? "name-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        nameHasError ? "border-red-400 focus:ring-0" : "border-gray-300"
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
                    <span className="block text-[13px] font-semibold text-gray-900">Status</span>

                    <div className="mt-2 flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2.5">
                      {/* Left text mirrors current state */}
                      <span
                        className={`text-sm ${values.isActive ? "text-gray-700" : "text-gray-500"}`}
                      >
                        {values.isActive ? "Active" : "Inactive"}
                      </span>

                      {/* Switch (accessible, keyboard-friendly) */}
                      <label className="inline-flex items-center">
                        <Field
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          // accessibility
                          role="switch"
                          aria-checked={values.isActive}
                          // hide the native checkbox but keep it focusable
                          className="peer sr-only"
                          disabled={isUpdating}
                        />
                        <span
                          className={`relative inline-block h-5 w-9 rounded-full transition-colors ${values.isActive ? "bg-green-500" : "bg-gray-300"} cursor-pointer peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-blue-500 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform ${values.isActive ? "after:translate-x-4" : "after:translate-x-0"} `}
                          aria-hidden="true"
                        />
                      </label>
                    </div>
                  </div>
                  {/* Website URL */}
                  <div>
                    <label
                      htmlFor="authorizedOrigin"
                      className="block text-[13px] font-semibold text-gray-900"
                    >
                      Website URL
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      The site where you’ll embed the chat widget.
                    </p>

                    <Field
                      id="authorizedOrigin"
                      name="authorizedOrigin"
                      type="url"
                      placeholder="https://mydomain.com"
                      autoComplete="off"
                      aria-invalid={domainHasError}
                      aria-describedby={domainHasError ? "domain-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        domainHasError ? "border-red-400 focus:ring-0" : "border-gray-300"
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
                      className="block text-[13px] font-semibold text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <Field
                        as="textarea"
                        id="description"
                        name="description"
                        placeholder="My app description..."
                        className={`mt-1 min-h-[100px] w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          descriptionHasError ? "border-red-400 focus:ring-0" : "border-gray-300"
                        }`}
                        defaultValue={""}
                      />
                      <span className="text-[12px] text-gray-500">
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
                      className="size-24 flex-none rounded-lg border border-gray-200 object-cover"
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
                        className="inline-flex cursor-pointer rounded border border-gray-300 px-3 py-2 text-[13px] font-medium text-gray-500 hover:bg-gray-50"
                      >
                        Change Image
                      </label>

                      <p className="mt-1 text-xs/5 text-gray-400">JPG or PNG. Max 500KB.</p>
                    </div>
                  </div>

                  {/* App ID (read-only) */}
                  <AppSecret appId={appId} />
                </div>
              </div>

              {/* Save / feedback */}
              <div className="mt-6 flex flex-col items-start justify-start gap-3">
                {status?.saved && (
                  <span className="inline-flex items-center gap-1 text-sm text-green-700">
                    <CheckCircle className="h-4 w-4" />
                    Saved
                  </span>
                )}
                {status?.error && (
                  <span className="inline-flex items-center gap-1 text-sm text-red-700">
                    <CloudAlert className="h-4 w-4" />
                    {status.error}
                  </span>
                )}{" "}
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* Delete */}
      <div className="mt-6 flex justify-between rounded-md border border-gray-200 bg-white p-5 md:p-6">
        <div>
          <h4 className="mb-1 text-[16px] font-semibold text-gray-900">Delete App</h4>
          <p className="mb-2 text-[12px] text-gray-600">
            Permanently delete the app and all its data. This action is irreversible—proceed with
            caution.
          </p>
        </div>
        <button
          onClick={() => setOpenPopup(true)}
          type="button"
          className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete App Permanently
        </button>
        <DeleteAppPopup appId={appId} openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </div>
    </section>
  );
};

export default AppOverview;
