"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Avatar, AvatarImage } from "../ui/avatar";
import { buttonVariants } from "@/components/ui/button";

import ActivityStatus from "../ui/activitystatus";
import { cn } from "@/lib/utils";

interface UserBoxMobileProps {
  data: User;
}

const UserBoxMobile: React.FC<UserBoxMobileProps> = ({ data }) => {
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
    <div onClick={handleClick} className="cursor-pointer">
      <TooltipProvider key={data.id}>
        <Tooltip key={data.id} delayDuration={0}>
          <TooltipTrigger asChild>
            <div className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-11 w-11 md:h-16 md:w-16")}>
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

              <span className="sr-only">{data.name}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            {data.name}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default UserBoxMobile;
