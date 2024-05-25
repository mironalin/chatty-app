"use client";

import { FC } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface ImageDialogProps {
  children?: React.ReactNode;
  src?: string | null;
}

const ImageDialog: FC<ImageDialogProps> = ({ children, src }) => {
  if (!src) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="flex">
          <Image
            src={src}
            alt="Image"
            width={0}
            height={0}
            sizes="100vw"
            className="flex-1 flex w-full h-full rounded-md scale-110"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
