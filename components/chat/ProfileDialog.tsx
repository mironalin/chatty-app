"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { FC, useMemo, useState } from "react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import AvatarStatus from "../ui/avatarstatus";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "../ui/alert-dialog";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import AvatarGroup from "../ui/avatargroup";

interface ProfileDialogProps {
  isOpen?: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDialog: FC<ProfileDialogProps> = ({ isOpen, data, onClose }) => {
  const otherUser = useOtherUser(data);

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

  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);

  return (
    <>
      <ConfirmDeleteDialog isOpen={isOpenAlertDialog} onClose={() => setIsOpenAlertDialog(false)} />
      <AlertDialog open={isOpen}>
        <AlertDialogContent className="w-11/12 sm:max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle asChild>Chat Information</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center">
            <div>{data.isGroup ? <AvatarGroup users={data.users} /> : <AvatarStatus user={otherUser} />}</div>
            <div className="flex flex-col items-center justify-center">
              <div>{title}</div>
              <div className="text-xs text-primary/50">{statusText}</div>
            </div>
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
          <AlertDialogFooter className="flex flex-row justify-between gap-2">
            <AlertDialogCancel className="w-full" onClick={onClose}>
              Close
            </AlertDialogCancel>
            <Button className="w-full" variant="destructive" onClick={() => setIsOpenAlertDialog(true)}>
              <Trash2 size={15} />
              <p className="text-sm font-light">Delete</p>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProfileDialog;
