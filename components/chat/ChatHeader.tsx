"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, Info, Phone, Video } from "lucide-react";
import AvatarStatus from "../ui/avatarstatus";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface ChatHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="w-full flex border-b-[1px] sm:px-4 py-6 px-4 lg:px-6 justify-between items-center">
      <div className="flex gap-3 items-center">
        <Link href="/conversations" className="cursor-pointer lg:hidden block">
          <ChevronLeft size={32} />
        </Link>
        <AvatarStatus user={otherUser} />
        <div className="flex flex-col">
          <div className="font-medium">{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-zinc-500">{statusText}</div>
        </div>
      </div>
      <div>
        <div
          onClick={() => {}}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 transition cursor-pointer")}
        >
          <Phone size={20} className="text-zinc-500" />
        </div>
        <div
          onClick={() => {}}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 transition cursor-pointer")}
        >
          <Video size={20} className="text-zinc-500" />
        </div>
        <div
          onClick={() => {}}
          className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 transition cursor-pointer")}
        >
          <Info size={20} className="text-zinc-500" />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
