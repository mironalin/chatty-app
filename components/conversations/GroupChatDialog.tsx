"use client";

import { FC, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import MultipleSelector, { Option } from "./MultiSelect";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

interface GroupChatDialogProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatDialog: FC<GroupChatDialogProps> = ({ isOpen, onClose, users }) => {
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
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
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

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-11/12 sm:max-w-md rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Create a group chat</AlertDialogTitle>
          <AlertDialogDescription>Create a group chat with more than 2 people!</AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
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
                <Label>Members</Label>

                <MultipleSelector
                  disabled={isLoading}
                  defaultOptions={
                    users.map((user) => ({
                      value: user.id,
                      label: user.name,
                    })) as Option[]
                  }
                  placeholder="Select members..."
                  hidePlaceholderWhenSelected={true}
                  emptyIndicator={<p className="text-center text-lg leading-10 text-primary/60">No users found...</p>}
                  onChange={(value) =>
                    setValue("members", value, {
                      shouldValidate: true,
                    })
                  }
                  value={members}
                />
              </div>
            </div>
          </div>
          <AlertDialogFooter className="mt-6 gap-2 flex flex-row items-center justify-between">
            <AlertDialogCancel className="w-full m-0" disabled={isLoading} onClick={onClose}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction type="submit" className="w-full" disabled={isLoading}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GroupChatDialog;
