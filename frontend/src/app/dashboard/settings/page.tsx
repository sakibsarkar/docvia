"use client";

import { useState } from "react";
import { ChangePasswordForm, DeleteAccountPopup, PersonalInfoForm } from "@/components";

export default function SettingsPage() {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div className="min-h-screen">
      <div>
        <h1 className="sr-only">Account Settings</h1>

        <div className="divide-y divide-gray-200">
          {/* Personal Information */}
          <section className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 pb-10 xl:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Update your personal information such as First Name, Last Name and Profile Picture.
              </p>
            </div>

            <PersonalInfoForm />
          </section>

          {/* Change password */}
          <section className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 py-10 xl:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Change Password</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Update your password associated with your account.
              </p>
            </div>

            <ChangePasswordForm />
          </section>

          {/* Delete account */}
          <section className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 pt-10 xl:grid-cols-3">
            <div>
              <h2 className="text-base/7 font-semibold text-gray-900">Delete Account</h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                No longer want to use our service? You can delete your account here. This action is
                not reversible. All information related to this account will be deleted permanently.
              </p>
            </div>

            <div className="md:col-span-2">
              <div className="flex flex-col items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-4 shadow-md md:flex-row md:items-start md:p-6">
                <p className="self-center text-sm/6 text-gray-600">This cannot be undone.</p>
                <button onClick={() => setOpenPopup(true)} type="submit" className="btn-danger">
                  Yes, Delete My Account
                </button>
              </div>
            </div>

            <DeleteAccountPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
          </section>
        </div>
      </div>
    </div>
  );
}
