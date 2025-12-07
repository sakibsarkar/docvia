"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

interface DeleteAccountPopupProps {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
}

const DeleteAccountPopup = ({ openPopup, setOpenPopup }: DeleteAccountPopupProps) => {
  return (
    <Dialog open={openPopup} onOpenChange={setOpenPopup}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle aria-hidden="true" className="size-6 text-red-600" />
            </div>
            <div className="flex-1">
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription className="mt-2">
                Are you sure you want to delete your account? All of your data will be permanently
                removed from our servers forever. This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => setOpenPopup(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => setOpenPopup(false)}>
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountPopup;
