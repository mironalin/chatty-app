"use client";

import React, { Fragment, FC } from "react";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { ClipLoader } from "react-spinners";

interface LoadingModalProps {}

const LoadingModal: FC<LoadingModalProps> = ({}) => {
  return (
    <Transition show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-100 bg-opacity-40 transition-opacity dark:bg-zinc-950 dark:bg-opacity-40" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <DialogPanel>
              <div className="hidden dark:block">
                <ClipLoader color="#F4F4F5" size={80} />
              </div>
              <div className="dark:hidden">
                <ClipLoader color="#09090B" size={80} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LoadingModal;
