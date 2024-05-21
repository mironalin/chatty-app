"use client";

import useOtherUser from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { useMemo } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import AvatarStatus from "../ui/avatarstatus";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return "Active";
  }, [conversation]);

  return (
    <div className="w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center">
      <div className="flex gap-3 items-center">
        <Link href="/conversations" className="cursor-pointer lg:hidden block">
          <ChevronLeft size={32} />
        </Link>
        <AvatarStatus user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-zinc-500">{statusText}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
