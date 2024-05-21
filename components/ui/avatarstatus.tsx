import { User } from "@prisma/client";
import { FC } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ActivityStatus from "../ui/activitystatus";

interface AvatarStatusProps {
  user?: User;
}

const AvatarStatus: FC<AvatarStatusProps> = ({ user }) => {
  return (
    <div className="relative">
      <Avatar className="flex justify-center items-center">
        <AvatarImage
          src={user?.image! || "images/placeholder/placeholder.jpg"}
          alt={user?.image!}
          width={6}
          height={6}
          className="w-10 h-10 "
        />
      </Avatar>
      <ActivityStatus />
    </div>
  );
};

export default AvatarStatus;
