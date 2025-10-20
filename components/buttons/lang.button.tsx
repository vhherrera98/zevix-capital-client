"use client";

import { Languages } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function LanguageChange() {

 const router = useRouter();
 // const pathname = usePathname();

 const currentLang = Cookies.get('lang');

 const changeLanguage = (lang: string) => {
  // Guardar preferencia en cookie
  Cookies.set("lang", lang)

  // Reemplazar en la URL actual
  // const newPath = pathname.replace(/^\/i18n\/(es|en)/, `/i18n/${lang}`)
  // router.push(newPath);
  router.refresh();
 }

 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild>
    <Button
     type="button"
     size={'icon'}
     variant={'outline'}
    >
     <Languages />
    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent>
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