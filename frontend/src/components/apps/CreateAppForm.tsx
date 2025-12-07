"use client";

import { FormErrorMessage } from "@/components";
import { useCreateAppMutation } from "@/redux/features/apps/apps.api";
import type { IQueryMutationErrorResponse } from "@/types";
import { Field, Form, Formik } from "formik";
import { Link, Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as yup from "yup";
import SelectGoogleDoc from "./SelectGoogleDoc";

const schemaStepWebsite = yup.object({
  appName: yup.string().required("App Name is required"),
  websiteUrl: yup
    .string()
    .required("Website URL is required")
    .matches(
      /^(https?:\/\/)(localhost(:\d+)?|127\.0\.0\.1(:\d+)?|(\w+\.)+\w{2,})(:\d+)?(\/)?$/,
      "Enter a valid root URL (e.g., https://example.com or http://localhost:3000)"
    ),
  selectedDocId: yup.string().required("Please select a Google Doc"),
  docName: yup.string().required("Please select a Google Doc"),
});

const steps = [
  { id: 0, title: "App Name" },
  { id: 1, title: "Website URL" },
  { id: 2, title: "Connect Google Docs" },
] as const;

const CreateAppForm = ({ setOpenPopup }: { setOpenPopup: (open: boolean) => void }) => {
  const [step, setStep] = useState<(typeof steps)[number]["id"]>(0);

  const [createApp, { isLoading: isCreating }] = useCreateAppMutation();

  const initialValues = {
    appName: "",
    websiteUrl: "",
    selectedDocId: "",
    docName: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    const res = await createApp({
      appName: values.appName,
      authorizedOrigin: values.websiteUrl,
      googleDocId: values.selectedDocId,
      googleDocName: values.docName,
    });
    const error = res.error as IQueryMutationErrorResponse;

    if (error) {
      toast.error(error?.data?.message || "Failed to create app");
      return;
    }

    toast.success("App created successfully!");
    setOpenPopup(false);
  };

  return (
    <section className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-black">Create a New App</h2>
        <p className="mt-1 text-sm/6 text-gray-500">
          Step {step + 1} of {steps.length}
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={schemaStepWebsite}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          isSubmitting,
          validateForm,
          setTouched,
          submitCount,
          setFieldValue,
        }) => {
          const next = async () => {
            const errs = await validateForm();

            if (step === 0) setTouched({ appName: true }, false);
            if (step === 1) setTouched({ websiteUrl: true }, false);
            // Do NOT touch selectedDocId here; we only want to show its error on submit.

            const canGoNext =
              (step === 0 && !errs.appName) ||
              (step === 1 && !errs.websiteUrl) ||
              (step === 2 && !errs.selectedDocId);

            if (canGoNext) {
              setStep((s) => Math.min(s + 1, steps.length - 1) as 0 | 1 | 2);
            }
          };

          const back = () => setStep((s) => Math.max(0, s - 1) as 0 | 1 | 2);

          const busy = isSubmitting || isCreating;

          return (
            <Form className="md:col-span-3">
              <div className="max-w=[800px] flex flex-col gap-6 rounded-md border border-gray-200 bg-white p-5 md:p-6">
                {/* STEP 1: App Name */}
                {step === 0 && (
                  <div className="w-full">
                    <label htmlFor="appName" className="block text-sm font-medium text-gray-900">
                      App Name
                    </label>
                    <p className="my-2 text-sm text-gray-500">This is your app’s visible name.</p>
                    <div className="relative">
                      <Pencil className="absolute top-0 bottom-0 left-2 my-auto h-4 w-4 text-gray-400" />
                      <Field
                        id="appName"
                        name="appName"
                        autoComplete="off"
                        disabled={busy}
                        className={`w-full rounded-md border py-2 pr-3 pl-8 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          touched.appName && errors.appName
                            ? "border-red-400 focus:ring-0"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    {touched.appName && errors.appName && (
                      <FormErrorMessage message={errors.appName as string} />
                    )}
                  </div>
                )}

                {/* STEP 2: Website URL */}
                {step === 1 && (
                  <div className="w-full">
                    <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-900">
                      Website URL
                    </label>
                    <p className="my-2 text-sm leading-6 text-gray-500">
                      The site where you’ll embed the chat widget. And make sure the provided url
                      doest end up with a{" "}
                      <span className="rounded-[4px] bg-border p-[3px] font-semibold">/</span> or{" "}
                      <span className="rounded-[4px] bg-border p-[3px] font-semibold">
                        /pathname
                      </span>
                    </p>
                    <div className="relative">
                      <Link className="absolute top-0 bottom-0 left-2 my-auto h-4 w-4 text-gray-400" />
                      <Field
                        id="websiteUrl"
                        name="websiteUrl"
                        inputMode="url"
                        autoComplete="url"
                        disabled={busy}
                        className={`w-full rounded-md border py-2 pr-3 pl-8 text-sm outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                          touched.websiteUrl && errors.websiteUrl
                            ? "border-red-400 focus:ring-0"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    {touched.websiteUrl && errors.websiteUrl && (
                      <FormErrorMessage message={errors.websiteUrl as string} />
                    )}
                  </div>
                )}

                {/* STEP 3: REQUIRED — Select a Google Doc */}
                {step === 2 && (
                  <SelectGoogleDoc
                    onDocSelect={(doc) => {
                      setFieldValue("selectedDocId", doc.id);
                      setFieldValue("docName", doc.name);
                    }}
                  />
                )}

                {/* Nav buttons */}
                <div className="mt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0 || busy}
                    className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Back
                  </button>

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={busy}
                      className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={busy}
                      className="rounded-md bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-50"
                    >
                      {busy ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default CreateAppForm;
