"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { FC, useMemo } from "react";
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
interface ProfileDrawerProps {
  // isOpen: boolean;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: FC<ProfileDrawerProps> = ({ data }) => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info size={20} className="text-primary/50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chat Information</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <div>
            <AvatarStatus user={otherUser} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div>{title}</div>
            <div className="text-xs text-primary/50">{statusText}</div>
          </div>
          <div className="my-6">
            <Button onClick={() => {}} className="flex items-center justify-center gap-1" variant="destructive">
              <Trash2 size={15} />
              <p className="text-sm font-light">Delete</p>
            </Button>
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
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDrawer;
