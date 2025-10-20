"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Switch } from "../ui/switch";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useSidebar } from "../ui/sidebar";

export function DarkmodeSwitcher() {

  const currentLang = Cookies.get('lang');

  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  const { state, isMobile } = useSidebar();

  const toggle = () => {
    if (theme !== 'light') setTheme('light');
    else setTheme('dark');
  }


  useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton className="h-8 w-full" />;

  if (isMobile) {
    return (
      <div className="relative">
        <Button
          type="button"
          onClick={toggle}
          variant={'ghost'}
          className={cn(
            "flex flex-row items-center justify-start gap-2 hover:bg-gray-200 w-full z-10",
          )}
          size={state === 'collapsed' ? 'icon' : 'default'}
        >
          {theme === "light" ? <Moon /> : <Sun />}
          {
            state !== 'collapsed'
            &&
            <span>
              {
                currentLang === 'es'
                  ?
                  theme !== 'light' ? 'Modo Oscuro' : 'Modo Claro'
                  :
                  theme !== 'light' ? 'Dark Mode' : 'Light Mode'
              }
            </span>
          }
        </Button>
        <Switch
          className={
            cn(
              "absolute top-1/2 -translate-y-1/2 right-3 z-0 transition-all ease-in-out duration-300",
            )
          }
          checked={theme === 'light' ? false : true}
          onCheckedChange={toggle}
        />
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        type="button"
        variant={'ghost'}
        className={cn(
          "flex text-start items-center justify-start gap-2 hover:bg-gray-200 z-10",
          state === 'collapsed' && 'justify-center'
        )}
        onClick={toggle}
        size={state === 'collapsed' ? 'icon' : 'default'}
      >
        {theme === "light" ? <Moon /> : <Sun />}
        {
          state !== 'collapsed'
          &&
          <span>
            {
              currentLang === 'es'
                ?
                theme !== 'light' ? 'Modo Oscuro' : 'Modo Claro'
                :
                theme !== 'light' ? 'Dark Mode' : 'Light Mode'
            }
          </span>
        }
      </Button>
      <Switch
        className={
          cn(
            "absolute top-1/2 -translate-y-1/2 right-3 z-0 transition-all ease-in-out duration-300",
            state === 'collapsed' ? "hidden" : "visible"
          )
        }
        checked={theme === 'light' ? false : true}
        onCheckedChange={toggle}
      />
    </div>
  )
}