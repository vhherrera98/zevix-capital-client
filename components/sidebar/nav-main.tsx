/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useI18n } from "@/hooks/use-i18n";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "../ui/sidebar";
import { navMain } from "./routes";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { NavMainType } from "@/types/sidebar.type";

export function NavMain({
 continente = ""
}: {
 continente?: string
}) {

 const { t } = useI18n();
 const { status, data } = useSession();
 const [openItem, setOpenItem] = useState<string | null>(null);
 const pathname = usePathname();


 useEffect(() => {
  if (!openItem) {
   const defaultOpen = navMain.find(item =>
    item.role.includes(data?.user?.role as string) &&
    item.children.some(sub => sub.url === pathname && sub.role.includes(data?.user?.role as string))
   );
   if (defaultOpen) {
    setOpenItem(defaultOpen.title);
   }
  }
 }, [pathname, data?.user?.role, openItem]);

 if (status === 'loading') {
  return (
   <div className="grid grid-cols-1 gap-4 animate-pulse p-5">
    <div className="w-[100px] h-[20px] bg-gray-400 dark:bg-background rounded-md"></div>
    {
     Array.from({ length: 10 }).map((_, idx) => (
      <div key={idx} className="w-full h-[40px] bg-gray-400 dark:bg-background rounded-md"></div>
     ))
    }
   </div>
  )
 }

 return (
  <SidebarGroup>
   <SidebarGroupLabel>{t('sb_label')}</SidebarGroupLabel>
   <SidebarMenu>
    {
     navMain.map((item, idx) => (
      <ItemCollapsible
       key={item.title + idx}
       item={item}
       data={data}
       openItem={openItem}
       setOpenItem={setOpenItem}
       continente={continente}
      />
     ))
    }
   </SidebarMenu>
  </SidebarGroup>
 )
}

function ItemCollapsible({
 item,
 data,
 openItem,
 setOpenItem,
 continente = ""
}: {
 item: NavMainType;
 data: any;
 openItem: string | null;
 setOpenItem: (value: string | null) => void;
 continente?: string;
}) {

 const { t } = useI18n();
 const pathname = usePathname();
 const router = useRouter();
 const { setOpen } = useSidebar();

 // const isOpen = openItem === item.title;

 if (!item.role.includes(data?.user?.role as string)) return null;

 const isSubitemActive = item.children.some((subitem) => subitem.url === pathname);
 const isOpen = openItem === item.title || isSubitemActive;


 return (
  <Collapsible
   key={item.title}
   className="group/collapsible"
   open={isOpen}
   onOpenChange={(state) => {
    setOpenItem(state ? item.title : null);
   }}
   asChild
  >
   <SidebarMenuItem>
    <CollapsibleTrigger
     asChild
     className={
      cn(
       isOpen && "bg-indigo-500 data-[state=open]:hover:bg-indigo-600 text-white data-[state=open]:hover:text-white"
      )
     }
    >
     <SidebarMenuButton
      tooltip={item.title}
      onClick={() => setOpen(true)}
     >
      {item.icon && <item.icon className={
       cn(
        "text-black/70 dark:text-white",
        isOpen && "text-white"
       )
      } />}
      <span className={
       cn(
        "text-black/80 dark:text-white",
        isOpen && "text-white"
       )
      }>{t(item.title)}</span>
      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
     </SidebarMenuButton>
    </CollapsibleTrigger>

    <CollapsibleContent className="py-1">
     <SidebarMenuSub className="flex flex-col gap-2">
      {
       item.children.map((subitem, idx) => {
        if (!subitem.role.includes(data?.user?.role as string)) return null;
        return (
         <SidebarMenuSubItem key={String(subitem.title) + "-" + String(idx)}>
          <SidebarMenuSubButton
           onClick={() => router.push(continente ? "/" + continente + subitem.url : "" + subitem.url)}
           className={cn(
            "cursor-pointer text-black/80 dark:text-white",
            pathname === subitem.url && "bg-accent"
           )}
          >                {subitem.icon && <subitem.icon />}
           <span className="text-xs">{t(subitem.title)}</span>
          </SidebarMenuSubButton>
         </SidebarMenuSubItem>
        )
       })
      }
     </SidebarMenuSub>
    </CollapsibleContent>

   </SidebarMenuItem>
  </Collapsible>
 )
}