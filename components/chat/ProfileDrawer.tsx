"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { FC, useCallback, useMemo, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Info, Trash2 } from "lucide-react";
import AvatarStatus from "../ui/avatarstatus";
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
import useRoutes from "@/app/hooks/useRoutes";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
// import { toast } from "react-hot-toast";
import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
interface ProfileDrawerProps {
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ data, onClose }) => {
  const otherUser = useOtherUser(data);

  onClose = () => setOpenAlertDialog(false);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return "Active";
  }, [data]);

  const [openMainDialog, setOpenMainDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

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
    <>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" size="icon">
            <Info size={20} className="text-primary/50" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-11/12 sm:max-w-md rounded-lg">
          <DialogHeader>
            <DialogTitle asChild>Chat Information</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center">
            <div>
              <AvatarStatus user={otherUser} />
            </div>
            <div className="flex flex-col items-center justify-center">
              <div>{title}</div>
              <div className="text-xs text-primary/50">{statusText}</div>
            </div>
            <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
              <div className="my-6">
                <AlertDialogTrigger>
                  <Button className="flex items-center justify-center gap-1" variant="destructive">
                    <Trash2 size={15} />
                    <p className="text-sm font-light">Delete</p>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-9/12 sm:max-w-md rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete this conversation and remove the data
                      from our servers.
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
              </div>
            </AlertDialog>

            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                {data.isGroup && (
                  <div>
                    <dt className="text-sm font-medium text-primary/50 sm:w-40 sm:flex-shrink-0">Emails</dt>
                    <dd className="mt-1 text-sm text-primary/90 sm:col-span-2">
                      {data.users.map((user) => user.email).join(", ")}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <div>
                    <dt className="text-sm font-medium text-primary/50 sm:w-40 sm:flex-shrink-0">Email</dt>
                    <dd className="mt-1 text-sm text-primary/90 sm:col-span-2">{otherUser.email}</dd>
                  </div>
                )}
                {!data.isGroup && (
                  <>
                    <hr />
                    <div>
                      <dt className="text-sm font-medium text-primary/50 sm:w-40 sm:flex-shrink-0">Joined</dt>
                      <dd className="mt-1 text-sm text-primary/90 sm:col-span-1">
                        <time dateTime={joinedDate}>{joinedDate}</time>
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="w-full">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileDrawer;
