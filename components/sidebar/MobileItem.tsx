"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "../ui/button";

interface MobileItemProps {
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({ href, icon: Icon, active, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };
  return (
    <Button
      onClick={onClick}
      asChild
      className={clsx(
        `flex p-8 gap-x-3 rounded-md text-sm leading-6 font-medium w-full justify-center`,
        active && "bg-accent text-accent-foreground"
      )}
      size="sm"
      variant="outline"
    >
      <Link href={href} className="">
        <Icon className="h-6 w-6 shrink-0" />
      </Link>
    </Button>
  );
};

export default MobileItem;
