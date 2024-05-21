"use client";

import Link from "next/link";
import useConversation from "@/app/hooks/useConversation";
import { buttonVariants } from "@/components/ui/button";
import { FullConversationType } from "@/app/types";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import ConversationBox from "./ConversationBox";
import ConversationBoxMobile from "./ConversationBoxMobile";
import clsx from "clsx";

interface ConversationListProps {
  isCollapsed: boolean;
  initialItems: FullConversationType[];
}

const ConversationList: FC<ConversationListProps> = ({ isCollapsed, initialItems }) => {
  const [items, setItems] = useState(initialItems);

  const router = useRouter;

  const { conversationId, isOpen } = useConversation();

  return (
    <aside
      className={clsx(
        `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r`,
        isOpen ? "hidden" : "block w-full left-0"
      )}
    >
      <div
        data-collapsed={isCollapsed}
        className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2"
      >
        {!isCollapsed && (
          <div className="flex justify-between p-2 items-center">
            <div className="flex gap-2 items-center text-2xl">
              <p className="font-medium">Messages</p>
              <span className="text-zinc-300">({items.length})</span>
            </div>

            <div className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}>
              <UserPlus size={20} />
            </div>
          </div>
        )}
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {items.map((item) =>
            isCollapsed ? (
              <ConversationBoxMobile
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              ></ConversationBoxMobile>
            ) : (
              <ConversationBox key={item.id} data={item} selected={conversationId === item.id}></ConversationBox>
            )
          )}
        </nav>
      </div>
    </aside>
  );
};

export default ConversationList;
