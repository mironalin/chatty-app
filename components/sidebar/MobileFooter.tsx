"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";

import MobileItem from "./MobileItem";
import { ThemeToggleMobile } from "../theme-toggle/theme-toggle-mobile";
import AvatarStatus from "../ui/avatarstatus";
import { User } from "@prisma/client";
import SettingsDialog from "./SettingsDialog";
import { useState } from "react";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "../ui/button";
interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <>
      {" "}
      <SettingsDialog currentUser={currentUser} isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
      <div className="grid grid-cols-5 grid-flow-column fixed w-full bottom-0 z-40 items-center border-t-[1px] p-4 gap-4 lg:hidden">
        {routes.map((route) => (
          <MobileItem
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
          />
        ))}
        <ThemeToggleMobile />
        <Button
          onClick={() => setIsDialogOpen(true)}
          className={clsx(
            `flex items-center p-8 gap-x-3 rounded-md text-sm leading-6 font-medium w-full justify-center text-accent-foreground`
          )}
          size="sm"
          variant="outline"
        >
          <div className="flex items-center justify-center">
            <AvatarStatus user={currentUser} />
          </div>
        </Button>
      </div>
    </>
  );
};

export default MobileFooter;
