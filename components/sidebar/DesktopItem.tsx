"use client";

import clsx from "clsx";
import Link from "next/link";
import { Button } from "../ui/button";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem: React.FC<DesktopItemProps> = ({ label, icon: Icon, href, onClick, active }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Button
        asChild
        className={clsx(
          `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-medium`,
          active && "bg-accent text-accent-foreground"
        )}
        size="lg"
        variant="ghost"
      >
        <Link href={href} className="">
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">{label}</span>
        </Link>
      </Button>
    </li>
  );
};

export default DesktopItem;
