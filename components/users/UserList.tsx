"use client";

import Link from "next/link";
import { User } from "@prisma/client";
import { MoreHorizontal, SquarePen } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import UserBoxMobile from "./UserBoxMobile";
import UserBox from "./UserBox";

interface UserListProps {
  items: User[];
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r block w-full left-0">
      <div className="relative flex flex-col gap-4 p-2 data-[collapsed=true]:p-2">
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
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {items.map((item) => (
            <UserBox key={item.id} data={item}></UserBox>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default UserList;
