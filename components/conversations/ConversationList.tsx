"use client";

import useConversation from "@/app/hooks/useConversation";
import { buttonVariants } from "@/components/ui/button";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import ConversationBox from "./ConversationBox";
import clsx from "clsx";
import GroupChatDialog from "./GroupChatDialog";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationList: FC<ConversationListProps> = ({ initialItems, users }) => {
  const session = useSession();
  const [items, setItems] = useState(initialItems);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        return [...current.filter((convo) => convo.id !== conversation.id)];
      });

      if (conversationId === conversation.id) {
        router.push("/conversations");
      }
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} users={users} />
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2">
          <div className="flex justify-between p-2 items-center">
            <div className="flex gap-2 items-center text-2xl">
              <p className="font-medium">Messages</p>
              <span className="text-zinc-300">({items.length})</span>
            </div>

            <div
              onClick={() => setIsDialogOpen(true)}
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 cursor-pointer")}
            >
              <UserPlus size={20} />
            </div>
          </div>
          <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
            {items.map((item) => (
              <ConversationBox key={item.id} data={item} selected={conversationId === item.id}></ConversationBox>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
