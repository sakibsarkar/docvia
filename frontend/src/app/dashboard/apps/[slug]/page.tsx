"use client";

import { DeleteAppPopup, FormErrorMessage } from "@/components";
import { CheckCircleIcon, ClipboardIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as yup from "yup";

type FormValues = {
  name: string;
  domain: string;
  avatar: File | null;
  isActive: boolean; // NEW
};

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif"] as const;
type AcceptedType = (typeof ACCEPTED_TYPES)[number];
const MAX_BYTES = 1_000_000; // 1MB

const schema = yup.object({
  name: yup.string().required("App name is required"),
  domain: yup
    .string()
    .required("Website URL is required")
    .matches(
      /^https:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/,
      "Enter a valid root URL (e.g., https://example.com)"
    ),
  avatar: yup
    .mixed<File>()
    .test("file-type", "Only JPG, PNG, or GIF are allowed", (file) =>
      !file ? true : ACCEPTED_TYPES.includes(file.type as AcceptedType)
    )
    .test("file-size", "File must be ≤ 1MB", (file) => (!file ? true : file.size <= MAX_BYTES)),
  isActive: yup.boolean().required(), // NEW
});

export default function AppDetailsPage() {
  const params = useParams<{ slug?: string }>();
  const slug = (params?.slug as string) || "";
  const appId = slug || "app_dummy_123";

  const [copiedAppId, setCopiedAppId] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);

  // Local preview state for avatar
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  const initialValues: FormValues = {
    name: "Your App Name",
    domain: "https://example.com",
    avatar: null,
    isActive: true,
  };

  const copyAppId = async () => {
    try {
      await navigator.clipboard.writeText(appId);
      setCopiedAppId(true);
      setTimeout(() => setCopiedAppId(false), 1200);
    } catch {
      /* ignore */
    }
  };

  interface FormikSetters {
    setSubmitting: (isSubmitting: boolean) => void;
    setStatus: (status: FormStatus | undefined) => void;
  }

  interface FormStatus {
    saved?: true;
    error?: string;
  }

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikSetters
  ): Promise<void> => {
    setStatus(undefined);
    try {
      // TODO: call your API with { appId, ...values }
      // values.avatar is a File | null
      await new Promise((r) => setTimeout(r, 600));
      setStatus({ saved: true as const });
    } catch {
      setStatus({
        error: "Something went wrong while saving. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting, status, setFieldValue, values }) => {
          const nameHasError = touched.name && !!errors.name;
          const domainHasError = touched.domain && !!errors.domain;

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
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="off"
                      aria-invalid={nameHasError}
                      aria-describedby={nameHasError ? "name-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        nameHasError ? "border-red-400 focus:ring-0" : "border-gray-300"
                      }`}
                    />

                    {nameHasError && (
                      <div id="name-error" className="mt-2">
                        <FormErrorMessage message={errors.name as string} />
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
                          disabled={isSubmitting}
                        />
                        <span
                          className={`relative inline-block h-5 w-9 rounded-full transition-colors ${values.isActive ? "bg-green-500" : "bg-gray-300"} peer-focus:outline-2 peer-focus:outline-offset-2 peer-focus:outline-blue-500 after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform ${values.isActive ? "after:translate-x-4" : "after:translate-x-0"} `}
                          aria-hidden="true"
                        />
                      </label>
                    </div>
                  </div>
                  {/* Website URL */}
                  <div>
                    <label
                      htmlFor="domain"
                      className="block text-[13px] font-semibold text-gray-900"
                    >
                      Website URL
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      The site where you’ll embed the chat widget.
                    </p>

                    <Field
                      id="domain"
                      name="domain"
                      type="url"
                      autoComplete="off"
                      aria-invalid={domainHasError}
                      aria-describedby={domainHasError ? "domain-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                        domainHasError ? "border-red-400 focus:ring-0" : "border-gray-300"
                      }`}
                    />

                    {domainHasError && (
                      <div id="domain-error" className="mt-2">
                        <FormErrorMessage message={errors.domain as string} />
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
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className={`mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          domainHasError ? "border-red-400 focus:ring-0" : "border-gray-300"
                        }`}
                        defaultValue={""}
                      />
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
                        previewUrl ??
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                        onChange={(e) => {
                          const file = e.currentTarget.files?.[0] ?? null;
                          setAvatarFile(file);
                          setFieldValue("avatar", file);
                        }}
                      />
                      <label
                        htmlFor="avatarInput"
                        className="inline-flex cursor-pointer rounded border border-gray-300 px-3 py-2 text-[13px] font-medium text-gray-500 hover:bg-gray-50"
                      >
                        Change Image
                      </label>

                      <p className="mt-1 text-xs/5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                      {!!touched.avatar && !!errors.avatar && (
                        <p className="mt-1 text-[14px] text-red-600">{String(errors.avatar)}</p>
                      )}
                    </div>
                  </div>

                  {/* App ID (read-only) */}
                  <div className="rounded-md">
                    <label className="text-[13px] font-medium text-gray-900">App ID</label>
                    <p className="text-[12px] text-gray-600">
                      Used when interacting with the API. This ID is unique to your app and cannot
                      be changed.
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        readOnly
                        disabled
                        className="flex-1 rounded-md border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-700"
                        aria-label="App ID"
                        value={appId}
                      />
                      <button
                        type="button"
                        onClick={copyAppId}
                        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 md:w-[110px]"
                      >
                        {copiedAppId ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircleIcon className="h-4 w-4" /> Copied
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            Copy <ClipboardIcon className="h-4 w-4" />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save / feedback */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>

                {status?.saved && (
                  <span className="inline-flex items-center gap-1 text-sm text-green-700">
                    <CheckCircleIcon className="h-4 w-4" />
                    Saved
                  </span>
                )}

                {status?.error && (
                  <span className="inline-flex items-center gap-1 text-sm text-red-700">
                    <InformationCircleIcon className="h-4 w-4" />
                    {status.error}
                  </span>
                )}
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
}
