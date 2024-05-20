import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm: px-6 lg:px-8">
      {/* <ThemeToggle /> */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image height={96} width={96} className="mx-auto w-[96px]" src="/images/svg/logo-no-background.svg" alt="Chatty logo"></Image>
        <h2 className="mt-6 text-3xl text-center font-medium tracking-tight text-gray-800">Sign in to your account</h2>
      </div>
    </div>
  );
}
