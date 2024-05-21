"use client";

import Link from "next/link";
import { User } from "@prisma/client";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserBoxMobile from "./UserBoxMobile";
import UserBox from "./UserBox";

interface UserListProps {
  isCollapsed: boolean;
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ isCollapsed, items }) => {
  return (
    <div
      data-collapsed={isCollapsed}
      className="fixed group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 lg:w-80 lg:block lg:pb-0"
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">People</p>
            <span className="text-zinc-300">({items.length})</span>
          </div>

          <div>
            <Link href="#" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}>
              <MoreHorizontal size={20} />
            </Link>

            <Link href="#" className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9")}>
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {items.map((item) =>
          isCollapsed ? <UserBoxMobile key={item.id} data={item} /> : <UserBox key={item.id} data={item}></UserBox>
        )}
      </nav>
    </div>
  );
};

export default UserList;
