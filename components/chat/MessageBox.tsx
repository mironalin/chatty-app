"use client";
import AvatarStatus from "../ui/avatarstatus";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import ImageDialog from "./ImageDialog";

interface MessageBoxProps {
  data: FullMessageType;
  isLast?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, isLast }) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden shadow-sm",
    isOwn ? "bg-sky-500 text-zinc-50" : "bg-primary/10",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <AvatarStatus user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-primary/60">{data.sender.name}</div>
          <div className="text-xs text-primary/50">{format(new Date(data.createdAt), "p")}</div>
        </div>
        <div className={message}>
          {data.image ? (
            <ImageDialog src={data.image}>
              <Image
                alt="Image"
                height="289"
                width="289"
                src={data.image}
                className=" object-cover cursor-pointer hover:scale-110 transition translate"
              />
            </ImageDialog>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-primary/60">{`Seen by ${seenList}`}</div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
