"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "@/components/ui/button";

import clsx from "clsx";
import ActivityStatus from "../ui/activitystatus";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface UserBoxMobileProps {
  data: User;
}

const UserBox: React.FC<UserBoxMobileProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <div
      key={data.id}
      onClick={handleClick}
      className={cn(buttonVariants({ variant: "ghost", size: "xl" }), "shrink justify-start gap-4 cursor-pointer")}
    >
      <div className="relative">
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={data.image! || "images/placeholder/placeholder.jpg"}
            alt={data.image!}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <ActivityStatus />
      </div>
      <div className="flex flex-col max-w-28">
        <span>{data.name}</span>
      </div>
    </div>
  );
};

export default UserBox;
