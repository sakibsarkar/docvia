"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteAppMutation } from "@/redux/features/apps/apps.api";
import type { IQueryMutationErrorResponse } from "@/types";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface DeleteAppPopupProps {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
  appId: string;
}

const DeleteAppPopup = ({ openPopup, setOpenPopup, appId }: DeleteAppPopupProps) => {
  const [deleteApp, { isLoading }] = useDeleteAppMutation();
  const router = useRouter();
  const handleDelete = async () => {
    if (isLoading) return;
    const res = await deleteApp(appId);
    const error = res.error as IQueryMutationErrorResponse;
    if (error) return toast.error("Something went wrong. Please try again.");
    toast.success("App deleted successfully!");
    setOpenPopup(false);
    router.replace("/dashboard/apps");
  };

  return (
    <Dialog open={openPopup} onOpenChange={setOpenPopup}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:size-10">
              <TriangleAlert aria-hidden="true" className="size-6 text-red-600" />
            </div>
            <div className="flex-1">
              <DialogTitle>Delete App</DialogTitle>
              <DialogDescription className="mt-2">
                Are you sure you want to delete your app? All of your data will be permanently
                removed from our servers forever. This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => setOpenPopup(false)}
            className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={handleDelete}
            className="inline-flex justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete Permanently"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAppPopup;
