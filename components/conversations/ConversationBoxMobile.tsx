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
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface ConversationBoxMobileProps {
  data: FullConversationType;
  selected?: boolean;
}

const ConversationBoxMobile: FC<ConversationBoxMobileProps> = ({ data, selected }) => {
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
    <div onClick={handleClick} className="cursor-pointer">
      <TooltipProvider key={data.id}>
        <Tooltip key={data.id} delayDuration={0}>
          <TooltipTrigger asChild>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-11 w-11 md:h-16 md:w-16",
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
              <span className="sr-only">{data.name || otherUser.name}</span>
            </div>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ConversationBoxMobile;
