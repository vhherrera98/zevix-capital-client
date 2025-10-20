/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BellRing } from "lucide-react";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/hooks/use-notification";

export function Notifications() {

 const { notifications } = useNotifications();
 const controls = useAnimation();

 const unreadCount = useMemo(() => {
  return notifications.filter((n) => !n.view).length;
 }, [notifications]);


 useEffect(() => {
  // Ejecutar la animación cuando cambia el contador
  controls.start({
   rotate: [0, -15, 15, -10, 10, -5, 5, 0],
   transition: { duration: 0.6 }
  });
 }, [notifications]);

 return (
  <DropdownMenu>
   <DropdownMenuTrigger asChild className="relative">
    <Button
     type='button'
     size={'icon'}
     variant={'outline'}
     className="rounded-full relative cursor-pointer"
    >
     <motion.div animate={controls}>
      <BellRing />
     </motion.div>
     <span
      className={cn(
       "text-xs absolute -top-1/6 -right-1/6 bg-red-400 dark:bg-red-500 text-white rounded-full w-auto min-w-[1.25rem] h-5 px-1 flex items-center justify-center",
       unreadCount === 0 ? 'hidden' : 'visible'
      )}
     >
      {unreadCount}
     </span>

    </Button>
   </DropdownMenuTrigger>
   <DropdownMenuContent align="end" className="w-full min-w-[300px] max-w-[400px] md:min-w-[400px]">
    <div>
     <h6 className="px-5 pt-5 font-medium">Notificaciones</h6>
     <ul className="p-5 flex flex-col gap-3 overflow-hidden">
      {
       notifications.length === 0
       &&
       <p className="text-muted-foreground text-sm">Sin notificaciones</p>
      }
      {
       notifications.slice(0, 10).map((notification, idx) => (
        <li
         key={idx}
         className={cn(
          "py-2 px-4 truncate hover:bg-gray-200 dark:hover:bg-accent rounded-md cursor-pointer",
          !notification.view ? "bg-indigo-100 dark:bg-accent" : ""
         )}
        >
         <div>
          <h6 className="font-bold text-xs text-black/80 dark:text-white">{notification.creador}</h6>
          <p className="text-muted-foreground text-sm truncate">{notification.descripcion}</p>
          <span className="text-xs">{notification.createdat}</span>
         </div>
        </li>
       ))
      }
      <Button
       type="button"
       variant={'outline'}
       className={cn(
        "w-full",
        Array.from({ length: notifications.length }).length > 10 ? 'visible' : "hidden"
       )}
      >Ver Todas Las Notificaciones</Button>
     </ul>
    </div>
   </DropdownMenuContent>
  </DropdownMenu>
 )
}