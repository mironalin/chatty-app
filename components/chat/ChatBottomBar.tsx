"use client";

import { FC } from "react";
import useConversation from "@/app/hooks/useConversation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import { Image, SendHorizontal } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "../ui/input";

interface ChatBottomBarProps {}

const ChatBottomBar: FC<ChatBottomBarProps> = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue("message", "", { shouldValidate: true });
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="p-2 flex w-full items-center gap-2 lg:gap-4">
      <div className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 cursor-pointer")}>
        <Image size={25} className="text-primary/50" />
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="w-full relative"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
            <Input
              id="messages"
              className="border-primary/10 font-light py-2 px-4 w-full rounded-full border-2 shadow-sm focus-visible:ring-transparent focus-visible:ring-0"
              register={register}
              errors={errors}
              required
              placeholder="Write a message"
              autoComplete="off"
            />
            <Button type="submit" variant="ghost" className="rounded-full p-2 hover:bg-background hover:text-primary">
              <SendHorizontal size={25} className="text-primary/50" />
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ChatBottomBar;
