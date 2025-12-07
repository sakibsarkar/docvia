import { IApp } from "@/types";
import dateUtils from "@/utils/date";
import Image from "next/image";
import ChangeConnectedDoc from "./ChangeConnectedDoc";

const ConnectedDoc = ({ app }: { app: IApp }) => {
  return (
    <>
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-gray-900">Connected Google Doc</h2>
          <p className="text-sm text-gray-500">Manage your connected Google Document file.</p>
        </div>

        {/* Current File Display */}
        <div className="mb-6">
          <label className="mb-3 block text-sm font-medium text-primary">Current File</label>

          <div className="flex items-center justify-between rounded-md border border-slate-200 bg-gray-50 p-4">
            <div className="flex items-center gap-3">
              <Image src="/images/google/docs.png" alt="Google Doc Icon" width={24} height={24} />
              <div className="flex flex-col gap-[0.5px]">
                <span className="font-medium text-primary">{app?.googleDocName || "Unknown"}</span>
                <span className="text-[12px] font-medium text-primary">
                  Connected on : {dateUtils.formatToMMMdddYYYY(app?.createdAt)}
                </span>
              </div>
            </div>

            <ChangeConnectedDoc appId={app?.id} currentDocId={app?.googleDocId} />
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
    </>
  );
};

export default ConnectedDoc;
