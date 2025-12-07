"use client";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import CreateAppForm from "./CreateAppForm";

interface CreateNewAppPopupProps {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
}

const CreateNewAppPopup = ({ openPopup, setOpenPopup }: CreateNewAppPopupProps) => {
  return (
    <Dialog open={openPopup} onOpenChange={setOpenPopup}>
      <DialogContent className="max-w-[700px]">
        <DialogClose className="absolute top-0 right-0 rounded-md bg-white p-4 text-gray-400 hover:text-gray-500">
          <span className="sr-only">Close</span>
        </DialogClose>
        <CreateAppForm setOpenPopup={setOpenPopup} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAppPopup;
