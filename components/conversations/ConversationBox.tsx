import { FC } from "react";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Conversation, Message, User } from "@prisma/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/app/types";
import useOtherUser from "@/app/hooks/useOtherUser";
import { Avatar, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import ActivityStatus from "../ui/activitystatus";
import { cn } from "@/lib/utils";

interface ConversationBoxProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ data, selected }) => {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];

    if (!userEmail) {
      return false;
    }

    return seenArray.filter((user) => user.email === user.email).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      key={data.id}
      onClick={handleClick}
      className={cn(
        buttonVariants({ variant: "ghost", size: "xl" }),
        "shrink justify-start gap-4 cursor-pointer",
        selected ? "bg-accent" : "bg-background"
      )}
    >
      <div className="relative">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={otherUser.image || "images/placeholder/placeholder.jpg"}
            alt={otherUser.image || "images/placeholder/placeholder.jpg"}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <ActivityStatus />
      </div>
      <div className="flex justify-between items-center flex-1">
        <div className="flex flex-col max-w-38">
          <span>{data.name || otherUser.name}</span>
          <p className={cn(`truncate text-xs`, hasSeen ? `text-zinc-500` : `font-semibold`)}>{lastMessageText}</p>
        </div>
        {lastMessage?.createdAt && <p className="text-xs font-light">{format(new Date(lastMessage.createdAt), "p")}</p>}
      </div>
    </div>
  );
};

export default ConversationBox;
