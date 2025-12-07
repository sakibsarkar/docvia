import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateAppByAppIdMutation } from "@/redux/features/apps/apps.api";
import { IGoogleDoc, IQueryMutationErrorResponse } from "@/types";
import { useState } from "react";
import { toast } from "sonner";
import SelectGoogleDoc from "../SelectGoogleDoc";

const ChangeConnectedDoc = ({ currentDocId, appId }: { currentDocId?: string; appId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [selectedDocFile, setSelectedDocFile] = useState<IGoogleDoc>();

  const [updateApp, { isLoading }] = useUpdateAppByAppIdMutation();

  const handleConfirm = async () => {
    if (!selectedDocFile || isLoading || currentDocId === selectedDocFile.id) {
      setIsConfirmationOpen(false);
      setIsOpen(false);
      setSelectedDocFile(undefined);
      return;
    }

    const res = await updateApp({
      appId: appId,
      payload: {
        googleDocId: selectedDocFile.id,
        googleDocName: selectedDocFile.name,
      },
    });

    const error = res.error as IQueryMutationErrorResponse;
    if (error) {
      toast.error(error?.data?.message || "Something went wrong.");
      return;
    }
    setIsConfirmationOpen(false);
    setIsOpen(false);
    setSelectedDocFile(undefined);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
      >
        Change
      </button>

      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <SelectGoogleDoc
            onDocSelect={(doc) => setSelectedDocFile(doc)}
            defaultDocId={currentDocId}
          />

          <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                if (selectedDocFile) {
                  setIsConfirmationOpen(true);
                }
                setIsOpen(false);
              }}
              type="button"
              className="inline-flex justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-xs disabled:opacity-50"
              disabled={!selectedDocFile}
            >
              Change
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={isConfirmationOpen}
        onOpenChange={() => {
          setIsConfirmationOpen(false);
          setSelectedDocFile(undefined);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Change</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-primary">
            Are you sure you want to change current connected Google Doc? with{" "}
            <span className="font-bold">{selectedDocFile?.name}</span>
          </p>

          <DialogFooter className="mt-4">
            <button
              onClick={() => setIsConfirmationOpen(false)}
              className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={isLoading}
              className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 disabled:cursor-pointer disabled:opacity-[0.5]"
            >
              {isLoading ? "Updating..." : "Confirm"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChangeConnectedDoc;
