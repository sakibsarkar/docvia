"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useMemo, useState } from "react";
import * as yup from "yup";

import { DeleteWidgetPopup, FormErrorMessage } from "@/components";
import { CircleCheck, Clipboard, ClipboardCheck, CloudAlert, Plus } from "lucide-react";
import { useParams } from "next/navigation";

type FormValues = {
  name: string;
  domain: string;
  avatar: File | null;
  isActive: boolean;
};

type Widget = {
  id: string;
  name: string;
  domain: string;
  isActive: boolean;
  avatarUrl?: string;
};

const schema = yup.object({
  name: yup.string().required("App name is required"),
  domain: yup
    .string()
    .required("Website URL is required")
    .matches(
      /^https:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+.*/,
      "Enter a valid URL (e.g., https://example.com)"
    ),
  isActive: yup.boolean().required(),
});

const WidgetDropdown = ({
  widgets,
  selectedId,
  onChange,
}: {
  widgets: Widget[];
  selectedId: string;
  onChange: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const selected = widgets.find((w) => w.id === selectedId);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest?.("#widget-dd")) setOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, []);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [open]);

  return (
    <div id="widget-dd" className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex w-[340px] items-center justify-between gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
      >
        <span className="max-w-[340px] truncate">
          {selected ? `${selected.name} (${selected.id})` : "Select a widget"}
        </span>
        {/* Arrow icon */}
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          tabIndex={-1}
          className="absolute z-20 mt-2 w-[340px] overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl"
        >
          <ul className="max-h-64 overflow-y-auto py-1">
            {widgets.map((w) => {
              const active = w.id === selectedId;
              return (
                <li key={w.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(w.id);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50 ${active ? "bg-gray-50" : ""}`}
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium text-gray-900">{w.name}</div>
                      <div className="truncate text-[12px] text-gray-500">{w.id}</div>
                    </div>
                    <span
                      className={`ml-3 inline-flex h-5 items-center rounded-full px-2 text-[11px] ${w.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
                    >
                      {w.isActive ? "Active" : "Inactive"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const ChatWidget = () => {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [openPopup, setOpenPopup] = useState(false);
  const params = useParams<{ slug?: string }>();
  const slug = (params?.slug as string) || "";

  const widgets: Widget[] = useMemo(
    () => [
      {
        id: "app_dummy_123",
        name: "Your Widget Name",
        domain: "https://example.com/chat/689b6d59f0b6331925c09759/1j2fi6a0d",
        isActive: true,
      },
      {
        id: "app_store_001",
        name: "Storefront Support",
        domain: "https://store.example.com",
        isActive: true,
      },
      {
        id: "app_docs_777",
        name: "Docs Helper",
        domain: "https://docs.example.com",
        isActive: false,
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string>(
    slug && widgets.some((w) => w.id === slug) ? slug : widgets[0]?.id
  );

  const selectedWidget = widgets.find((w) => w.id === selectedId) ?? widgets[0];

  const initialValues: FormValues = {
    name: selectedWidget?.name ?? "",
    domain: selectedWidget?.domain ?? "",
    avatar: null,
    isActive: selectedWidget?.isActive ?? true,
  };

  const copyToClipboard = async (text: string, onDone: () => void) => {
    try {
      await navigator.clipboard.writeText(text);
      onDone();
      setTimeout(() => onDone(), 1500); // revert after 1.5s
    } catch {
      // ignore
    }
  };

  // 4) Replace your existing copyWidgetId with a call to the generic helper:
  const copyWidgetId = (id: string) => copyToClipboard(id, () => setCopiedId((v) => !v));

  // 5) Add a new copier for the direct chat link:
  const copyDirectLink = (link: string) => copyToClipboard(link, () => setCopiedLink((v) => !v));

  const onSubmit = async (
    values: FormValues,
    { setSubmitting, setStatus }: FormikHelpers<FormValues>
  ): Promise<void> => {
    setStatus(undefined);
    try {
      // TODO: call your API with { widgetId: selectedId, ...values }
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
      {/* Top bar with custom dropdown */}
      <div className="mb-6 rounded-md border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <label className="mb-0 text-sm font-medium text-gray-900">Select Widget</label>
            <WidgetDropdown widgets={widgets} selectedId={selectedId} onChange={setSelectedId} />
          </div>

          <button className="flex items-center gap-1 rounded bg-blue-500 px-4 py-2 text-[14px] text-white hover:bg-blue-600">
            <Plus className="h-4 w-4 text-white" /> Add Widget
          </button>
        </div>
      </div>

      {/* Form */}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting, status, values }) => {
          const nameHasError = touched.name && !!errors.name;

          return (
            <Form className="rounded-md border border-gray-100 bg-white p-5 shadow md:p-6">
              <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                {/* Left */}
                <div className="flex flex-col gap-6 md:w-1/2">
                  {/* App name */}
                  <div>
                    <label htmlFor="name" className="block text-[13px] font-semibold text-gray-900">
                      Widget Name
                    </label>
                    <p className="mt-1 text-xs text-gray-500">
                      This is your widget’s visible name.
                    </p>

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="off"
                      aria-invalid={nameHasError}
                      aria-describedby={nameHasError ? "name-error" : undefined}
                      className={`mt-3 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 ${nameHasError ? "border-red-400 focus:ring-0" : "border-gray-300"}`}
                    />

                    {nameHasError && (
                      <div id="name-error" className="mt-2">
                        <FormErrorMessage message={errors.name as string} />
                      </div>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <span className="block text-[13px] font-semibold text-gray-900">
                      Widget Status
                    </span>

                    <div className="mt-2 flex items-center justify-between rounded-md border border-gray-100 bg-gray-50 px-3 py-2.5">
                      <span
                        className={`text-sm ${values.isActive ? "text-gray-700" : "text-gray-500"}`}
                      >
                        {values.isActive ? "Active" : "Inactive"}
                      </span>

                      <label className="mb-0 inline-flex items-center">
                        <Field
                          id="isActive"
                          name="isActive"
                          type="checkbox"
                          role="switch"
                          aria-checked={values.isActive}
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

                  {/* Widget ID (read-only) */}
                  <div className="rounded-md">
                    <label className="text-[13px] font-medium text-gray-900">Widget ID</label>
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
                        value={selectedWidget?.id ?? ""}
                      />
                      <button
                        type="button"
                        onClick={() => copyWidgetId(selectedWidget?.id ?? "")}
                        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 md:w-[110px]"
                        aria-live="polite"
                      >
                        <span className="flex items-center gap-1">
                          {copiedId ? (
                            <span className="flex items-center gap-1 text-green-500">
                              Copied <ClipboardCheck className="h-4 w-4 text-green-500" />{" "}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              Copy
                              <Clipboard className="h-4 w-4" />
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Direct Chat Link (read-only) */}
                  <div className="">
                    <label
                      htmlFor="chat-link"
                      className="block text-[13px] font-semibold text-gray-900"
                    >
                      Direct Chat Link
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        id="chat-link"
                        readOnly
                        disabled
                        className="flex-1 rounded-md border border-gray-200 bg-gray-100 px-3 py-2.5 text-sm text-gray-700"
                        aria-label="Direct Chat Link"
                        value={selectedWidget?.domain ?? ""} // <<< show the actual link
                      />
                      <button
                        type="button"
                        onClick={() => copyDirectLink(selectedWidget?.domain ?? "")}
                        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 md:w-[110px]"
                        aria-live="polite"
                      >
                        <span className="flex items-center gap-1">
                          {copiedLink ? (
                            <span className="flex items-center gap-1 text-green-500">
                              Copied <ClipboardCheck className="h-4 w-4 text-green-500" />{" "}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              Copy
                              <Clipboard className="h-4 w-4" />
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-4 md:w-1/2">
                  {/* Widget Code */}
                  <div className="rounded-md">
                    <label className="text-[13px] font-medium text-gray-900">Widget Code</label>
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

                {/* Status messages */}
                <span className="min-h-[20px]">
                  {status?.saved && (
                    <span className="inline-flex items-center gap-1 text-sm text-green-700">
                      <CircleCheck className="h-4 w-4" />
                      Saved
                    </span>
                  )}
                  {status?.error && (
                    <span className="inline-flex items-center gap-1 text-sm text-red-700">
                      <CloudAlert className="h-4 w-4" />
                      {status.error}
                    </span>
                  )}
                </span>
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* Delete */}
      <div className="mt-6 flex justify-between rounded-md border border-gray-200 bg-white p-5 md:p-6">
        <div>
          <h4 className="mb-1 text-[16px] font-semibold text-gray-900">Delete Widget</h4>
          <p className="mb-2 text-[12px] text-gray-600">
            Delete the widget and all its data. This action is irreversible—proceed with caution.
          </p>
        </div>
        <button
          onClick={() => setOpenPopup(true)}
          type="button"
          className="rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete Widget
        </button>
        <DeleteWidgetPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
      </div>
    </section>
  );
};

export default ChatWidget;
