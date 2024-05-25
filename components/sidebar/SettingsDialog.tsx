"use client";

import { Label } from "../ui/label";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { buttonVariants } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SettingsDialogProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const SettingsDialog: FC<SettingsDialogProps> = ({ isOpen, onClose, currentUser }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      })
      .finally(() => setIsLoading(false));
  };

  // Fix for Cloudinary upload button
  useEffect(() => {
    // Disable Radix ui dialog pointer events lockout
    setTimeout(() => (document.body.style.pointerEvents = ""), 0);
  });

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger asChild></AlertDialogTrigger>
      <AlertDialogContent
        // Fix for Cloudinary upload button
        //@ts-ignore
        onInteractOutside={(e) => {
          const hasPacContainer = e.composedPath().some((el: EventTarget) => {
            if ("classList" in el) {
              return Array.from((el as Element).classList).includes("pac-container");
            }
            return false;
          });

          if (hasPacContainer) {
            e.preventDefault();
          }
        }}
        className="w-11/12 sm:max-w-md rounded-xl"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Profile</AlertDialogTitle>
          <AlertDialogDescription>Edit your public information</AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 flex flex-col gap-y-8">
            <div className="flex flex-col gap-4">
              <Label>Name</Label>
              <Input
                className="!text-base"
                disabled={isLoading}
                id="name"
                errors={errors}
                required
                register={register}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>Photo</Label>
              <div className="flex items-center gap-2">
                <Image
                  width={48}
                  height={48}
                  className="rounded-full dark:hidden"
                  src={image || currentUser?.image || "/images/placeholder/placeholder.jpg"}
                  alt="Avatar"
                />
                <Image
                  width={48}
                  height={48}
                  className="hidden rounded-full dark:block"
                  src={image || currentUser?.image || "/images/placeholder/placeholder-dark.jpg"}
                  alt="Avatar"
                />
                <CldUploadButton
                  className="block"
                  options={{ maxFiles: 1 }}
                  onSuccess={handleUpload}
                  uploadPreset="vm9o9xsb"
                >
                  <div className={cn(buttonVariants({ variant: "ghost", size: "xl" }), "cursor-pointer")}>Change</div>
                </CldUploadButton>
              </div>
            </div>
          </div>
          <div>
            <AlertDialogFooter className="mt-6 gap-2 flex flex-row items-center justify-between">
              <AlertDialogCancel className="w-full" disabled={isLoading} onClick={onClose}>
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction type="submit" disabled={isLoading} className="w-full">
                Save
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SettingsDialog;
