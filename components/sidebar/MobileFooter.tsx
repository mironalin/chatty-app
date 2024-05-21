"use client";

import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";

import MobileItem from "./MobileItem";
import { ThemeToggleMobile } from "../theme-toggle/theme-toggle-mobile";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-4
        grid-flow-column
        fixed
        w-full
        bottom-0
        z-40
        items-center
        border-t-[1px]
        p-4
        gap-4
        lg:hidden

      "
    >
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
    </div>
  );
};

export default MobileFooter;
