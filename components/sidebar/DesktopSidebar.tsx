"use client";

import useRoutes from "@/app/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { ThemeToggle } from "../theme-toggle/theme-toggle";
import { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ActivityStatus from "../ui/activitystatus";
import Image from "next/image";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log({ currentUser });

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-2">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav
        className="
            mt-4
            flex
            flex-col
            justify-between
            items-center
            space-y-1
            gap-2
          "
      >
        <ThemeToggle />
        <div onClick={() => setIsOpen(true)} className="relative cursor-pointer hover:opacity-75 transition">
          <Avatar>
            <AvatarImage src={currentUser.image! || "/images/placeholder/placeholder.jpg"} alt={currentUser.name!} />
          </Avatar>
          <ActivityStatus />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
