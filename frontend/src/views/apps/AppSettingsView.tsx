"use client";
import ConnectedDoc from "@/components/apps/appSettings/ConnectedDoc";
const AppSettingsView = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto w-full">
        {/* Google Doc Settings Card */}
        <ConnectedDoc />

        {/* Additional Settings Section */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Other Settings</h2>

          <div className="space-y-4">
            {/* Setting Item 1 */}
            <div className="border-b border-slate-200 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Auto-sync</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Automatically sync changes from Google Doc
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 transition-colors hover:bg-gray-400">
                  <span className="inline-block h-4 w-4 translate-x-1 transform rounded-full bg-white transition-transform"></span>
                </button>
              </div>
            </div>

            {/* Setting Item 2 */}
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <p className="mt-1 text-xs text-gray-500">Get notified when file is updated</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors hover:bg-green-600">
                  <span className="inline-block h-4 w-4 translate-x-6 transform rounded-full bg-white transition-transform"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettingsView;
