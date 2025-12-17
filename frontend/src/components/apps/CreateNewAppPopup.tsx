"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import CreateAppForm from "./CreateAppForm";

interface CreateNewAppPopupProps {
  openPopup: boolean;
  setOpenPopup: (openPopup: boolean) => void;
}

const CreateNewAppPopup = ({ openPopup, setOpenPopup }: CreateNewAppPopupProps) => {
  return (
    <Dialog open={openPopup} onOpenChange={setOpenPopup}>
      <DialogContent className="max-w-[700px] bg-card">
        <CreateAppForm setOpenPopup={setOpenPopup} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAppPopup;
