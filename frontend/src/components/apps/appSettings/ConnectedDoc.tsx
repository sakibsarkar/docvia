import Image from "next/image";
import { useState } from "react";
import SelectGoogleDoc from "../SelectGoogleDoc";

const ConnectedDoc = () => {
  const [googleDocFile, setGoogleDocFile] = useState("Sales Presentation Q4 2024");
  const [isChanging, setIsChanging] = useState(false);

  const handleChange = () => {};

  return (
    <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-gray-900">Connected Google Doc</h2>
        <p className="text-sm text-gray-500">Manage your connected Google Document file.</p>
      </div>

      {/* Current File Display */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-gray-700">Current File</label>

        <div className="flex items-center justify-between rounded-md border border-slate-200 bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <Image src="/images/google/docs.png" alt="Google Doc Icon" width={24} height={24} />
            <span className="font-medium text-gray-700">{googleDocFile}</span>
          </div>
          {isChanging ? (
            <SelectGoogleDoc onDocSelect={(doc) => handleChange()} />
          ) : (
            <button
              onClick={() => setIsChanging(true)}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Change
            </button>
          )}
        </div>
      </div>

      {/* Help Text */}
      <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
        <p className="text-sm text-blue-800">
          <span className="font-medium">Note:</span> This file will be used for all integration
          operations and document generation tasks.
        </p>
      </div>
    </div>
  );
};

export default ConnectedDoc;
