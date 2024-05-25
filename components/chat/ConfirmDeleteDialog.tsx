"use client";

import axios from "axios";
import { FC, useCallback, useState } from "react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import useConversation from "@/app/hooks/useConversation";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";

interface ConfirmDeleteDialogProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmDeleteDialog: FC<ConfirmDeleteDialogProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { conversationId } = useConversation();

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      })
      .finally(() => setIsLoading(false));
  }, [conversationId, router, onClose]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent className="w-9/12 sm:max-w-md rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this conversation and remove the data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={isLoading}
            onClick={onDelete}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;
