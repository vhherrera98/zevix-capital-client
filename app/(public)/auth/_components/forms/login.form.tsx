/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import * as z from 'zod';
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  EyeIcon,
  EyeOffIcon
} from "lucide-react"
import { useForm } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState, useTransition } from "react"
import { useI18n } from '@/hooks/use-i18n';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { LoginSchema } from '../../_schemas';
import { getLangClient } from '@/utils/getLang.client';
// import { signIn } from 'next-auth/react';
import { login } from '@/services/login.service';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {

  // const { t } = useTranslation("login");
  const { t } = useI18n();
  const lang = getLangClient() || "en";
  useEffect(() => reset(), [lang]);


  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const [capsLockOn, setCapsLockOn] = useState(false);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const isCapsLock = e.getModifierState("CapsLock");
    setCapsLockOn(isCapsLock);
  };

  const form = useForm<z.infer<typeof LoginSchema>>({
    mode: "all",
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { control, handleSubmit, reset, formState: { errors } } = form;
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
  //   const response = await signIn("credentials", {
  //     redirect: false,
  //     email: data.email,
  //     password: data.password,
  //   });

  //   if (!response?.error) {
  //     window.location.href = "/auth/logged";
  //   } else {
  //     setError("Error al loguearse");
  //   }
  // }

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(async () => {
      await login(data)
        .then(((response) => {
          if (response) {
            if (response.status !== 'success') {
              setError(response?.status[lang as keyof typeof response.status]);
            } else {
              window.location.href = "/auth/logged";
            }
          }
        }))
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            {t("signin_title")}
          </h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("signin_description")}
          </p>
        </div>
        {
          error
          &&
          <div className='text-red-500 text-sm text-center bg-red-100 border border-red-400 rounded-md py-2 font-medium'>
            {error}
          </div>
        }
        <div className="grid gap-6">
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <Label htmlFor="email">
                  {t("signin_email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...field}
                  disabled={isPending}
                  tabIndex={1}
                  className={`${errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                />
                <FormMessage className='text-xs' />
              </FormItem>
            )}
          />
          <div className="grid gap-2">
            <div className="w-full flex items-center justify-between">
              <Label htmlFor="password">
                {t("signin_password")}
              </Label>
              {/* <Link
              href="/auth/forget-your-password"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              ¿Olvidaste tú contraseña?
            </Link> */}
              <p
                className={cn(
                  'text-xs text-yellow-400',
                  capsLockOn ? "visible" : "hidden"
                )}
              >
                Bloq Mayús está activado
              </p>
            </div>
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem className="flex flex-row items-center gap-2">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      disabled={isPending}
                      tabIndex={2}
                      {...field}
                      className={`${errors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                      onKeyUp={handleKeyUp}
                    />
                    <Button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-8 w-8 bg-gray-200 hover:bg-gray-300"
                      disabled={isPending}
                    >
                      {
                        showPassword
                          ?
                          <EyeOffIcon size={16} className="text-gray-900" />
                          :
                          <EyeIcon size={16} className="text-gray-900" />
                      }
                    </Button>
                  </FormItem>
                  <FormMessage className='text-xs' />
                </>
              )}
            />
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Checkbox
              name="session"
              id="session"
              disabled={isPending}
            />
            <label className="text-sm" htmlFor="session">
              {t("signin_stay")}
            </label>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
          >
            {t("signin_submit")}
          </Button>
        </div>
      </form>
    </Form>
  )
}
