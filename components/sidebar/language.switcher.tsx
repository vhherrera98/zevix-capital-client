"use client";

import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Languages } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function LanguageSwitcher() {

 const [mounted, setMounted] = useState<boolean>(false);

 const router = useRouter();
 const currentLang = Cookies.get('lang');

 const { state, isMobile } = useSidebar();
 const isCollapsed = useMemo(() => {
  if (state === 'collapsed') return true;
  return false;
 }, [state])

 const changeLanguage = (lang: string) => {
  Cookies.set("lang", lang)
  router.refresh();
 }

 useEffect(() => setMounted(true), []);
 if (!mounted) return <Skeleton className="h-8 w-full" />;

 if (isMobile) {
  return (
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button
      type="button"
      variant={'ghost'}
      size={'default'}
      className={
       cn(
        "flex flex-row items-center gap-2 justify-start hover:bg-gray-200",
       )
      }
     >
      <Languages />
      <span>
       {currentLang === 'es' ? 'Idioma' : 'Language'}
      </span>
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
     <DropdownMenuItem onClick={() => changeLanguage('es')} disabled={currentLang === 'es'}>
      {currentLang === 'es' ? 'Español' : 'Spanish'}
     </DropdownMenuItem>
     <DropdownMenuItem onClick={() => changeLanguage('en')} disabled={currentLang === 'en'}>
      {currentLang === 'en' ? 'English' : 'Ingles'}
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
  )
 }

 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button
     type="button"
     variant={'ghost'}
     size={isCollapsed ? 'icon' : 'default'}
     className={
      cn(
       "flex flex-row items-center gap-2 justify-start hover:bg-gray-200",
       isCollapsed && "justify-center"
      )
     }
    >
     <Languages />
     {
      !isCollapsed
      &&
      <span>
       {currentLang === 'es' ? 'Idioma' : 'Language'}
      </span>
     }
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="start">
    <DropdownMenuItem onClick={() => changeLanguage('es')} disabled={currentLang === 'es'}>
     {currentLang === 'es' ? 'Español' : 'Spanish'}
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => changeLanguage('en')} disabled={currentLang === 'en'}>
     {currentLang === 'en' ? 'English' : 'Ingles'}
    </DropdownMenuItem>
   </DropdownMenuContent>
  </DropdownMenu>
 )
}
