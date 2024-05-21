"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { ButtonAuth } from "./ui/buttonAuth";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "./ui/use-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthFormProps {}

type Variant = "LOGIN" | "REGISTER";

const AuthForm: FC<AuthFormProps> = ({}) => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch(() => {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        })
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "Invalid Credentials.",
            });
          }

          if (callback?.ok && !callback?.error) {
            toast({
              description: "Logged in!",
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Invalid Credentials.",
          });
        }

        if (callback?.ok && !callback?.error) {
          toast({
            description: "Logged in!",
          });
          router.push("/users");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card className="p-4">
        <CardContent className="mt-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-8">
              {variant === "REGISTER" && (
                <div className="flex flex-col space-y-1.5 gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder=""
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                  />
                </div>
              )}
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="email">E-mail address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col space-y-1.5 gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder=""
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-center flex-col">
                <ButtonAuth
                  disabled={isLoading}
                  type="submit"
                  className="focus-visibile:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {variant === "LOGIN" ? "Sign In" : "Register"}
                </ButtonAuth>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className=" bg-zinc-400 w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="hidden px-2 bg-background marker:px-2 text-zinc-700 dark:block">Or continue with</span>
                <span className="bg-white px-2 text-zinc-400 dark:hidden">Or continue with</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            <Button className="inline-flex w-full justify-center bg-primary" onClick={() => socialAction("github")}>
              <BsGithub className="mr-2 h-4 w-4" /> Github
            </Button>
            <Button className="inline-flex w-full justify-center" onClick={() => socialAction("google")}>
              <BsGoogle className="mr-2 h-4 w-4" /> Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm mb-[-1rem] gap-2">
          <div className="hidden text-zinc-700 dark:block">
            {variant === "LOGIN" ? "New to Chatty?" : "Already have an account?"}
          </div>
          <div className="text-zinc-400 dark:hidden">
            {variant === "LOGIN" ? "New to Chatty?" : "Already have an account?"}
          </div>
          <div className="hidden underline cursor-pointer text-zinc-700 dark:block" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
          <div className="underline cursor-pointer text-zinc-400 dark:hidden" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Create an account" : "Login"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
