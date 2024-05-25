"use client";

import Image from "next/image";
import { User } from "@prisma/client";
import useActiveList from "@/app/hooks/useActiveList";

interface AvatarStatusProps {
  user?: User;
}

const AvatarStatus: React.FC<AvatarStatusProps> = ({ user }) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-11 w-11 md:h-11 md:w-11">
        <Image alt="Avatar" fill src={user?.image || "/images/placeholder/placeholder.jpg"} className="dark:hidden" />
        <Image
          alt="Avatar"
          fill
          src={user?.image || "/images/placeholder/placeholder-dark.jpg"}
          className="hidden dark:block"
        />
      </div>
      {isActive && (
        <>
          <span className="hidden absolute rounded-full bg-green-500 ring-2 ring-background top-0 right-0 h-2 w-2 md:h-3 md:w-3 dark:block" />
          <span className="absolute rounded-full bg-green-500 ring-2 ring-background top-0 right-0 h-2 w-2 md:h-3 md:w-3 dark:hidden" />
        </>
      )}
    </div>
  );
};

export default AvatarStatus;
