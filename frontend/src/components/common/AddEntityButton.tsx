import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ResponsiveDialog } from "./ResponsiveDialog";

interface AddEntityButtonProps {
  FormComponent: React.FC<{
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  }>;
  buttonLabel: string;
  dialogTitle: string;
  dialogDescription: string;
}

export const AddEntityButton: React.FC<AddEntityButtonProps> = ({
  FormComponent,
  buttonLabel,
  dialogTitle,
  dialogDescription,
}) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowDialog(!showDialog)}
        className="h-8 w-full md:w-auto"
      >
        {buttonLabel}
      </Button>
      <ResponsiveDialog
        isOpen={showDialog}
        setIsOpen={setShowDialog}
        title={dialogTitle}
        description={dialogDescription}
      >
        <FormComponent setShowDialog={setShowDialog} />
      </ResponsiveDialog>
    </>
  );
};
