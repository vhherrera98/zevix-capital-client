"use client";
import { LogOut as LogOutIcon } from "lucide-react"
import { Button } from "../ui/button";
import { useSidebar } from "../ui/sidebar";
import { useEffect, useMemo, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { useI18n } from "@/hooks/use-i18n";
import { signOut } from "next-auth/react";

export function Logout() {

 const { state } = useSidebar();
 const { t } = useI18n();
 const [mounted, setMouted] = useState<boolean>(false);

 const collapsed = useMemo(() => state === 'collapsed', [state]);

 const logout = () => signOut({ callbackUrl: '/api/auth/logout' });

 useEffect(() => setMouted(true), []);
 if (!mounted) return <Skeleton className="h-10 w-full" />;

 return (
  <Button
   type="button"
   variant={'destructive'}
   size={collapsed ? "icon" : "default"}
   className={cn(
    "w-full text-left flex flex-row items-center justify-start cursor-pointer bg-red-500/90 hover:bg-destructive/60 dark:bg-destructive/60 hover:dark:bg-destructive/90",
    collapsed && "justify-center"
   )}
   onClick={logout}
  >
   <LogOutIcon />
   <span className={
    cn(collapsed ? "hidden" : "visible")
   }>{t("btn_logout")}</span>
  </Button>
 );
}