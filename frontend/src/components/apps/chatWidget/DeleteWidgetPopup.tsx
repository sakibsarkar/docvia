"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";

interface DeleteWidgetPopupProps {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
}

const DeleteWidgetPopup = ({ openPopup, setOpenPopup }: DeleteWidgetPopupProps) => {
  return (
    <Dialog open={openPopup} onOpenChange={setOpenPopup}>
      <DialogContent className="sm:max-w-lg">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
            <TriangleAlert aria-hidden="true" className="size-6 text-red-600" />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogHeader>
              <DialogTitle>Delete Widget</DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-2">
              Are you sure you want to delete your widget? All of your data will be permanently
              removed from our servers forever. This action cannot be undone.
            </DialogDescription>
          </div>
        </div>
        <div className="mt-5 gap-3 sm:mt-4 sm:flex sm:flex-row-reverse">
          <Button
            variant="destructive"
            onClick={() => setOpenPopup(false)}
            className="w-full sm:w-auto"
          >
            Delete
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpenPopup(false)}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWidgetPopup;
