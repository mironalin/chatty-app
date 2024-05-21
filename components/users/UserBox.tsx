"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AvatarStatus from "../ui/avatarstatus";

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
      <AvatarStatus user={data} />
      <div className="flex flex-col max-w-28">
        <span>{data.name}</span>
      </div>
    </div>
  );
};

export default UserBox;
