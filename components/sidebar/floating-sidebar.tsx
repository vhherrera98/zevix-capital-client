"use client";

import { FileText, HelpCircle, Home, Menu, Settings, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export function FloatingSidebar() {

 const [isOpen, setIsOpen] = useState<boolean>(false);
 const sidebarRef = useRef<HTMLDivElement>(null);

 const toggleSidebar = () => setIsOpen(!isOpen);

 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
   if (isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
    setIsOpen(false);
   }
  }

  if (isOpen) {
   document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
   document.removeEventListener("mousedown", handleClickOutside);
  }
 }, [isOpen]);

 const menuItems = [
  { icon: Home, label: "Home", href: "#" },
  { icon: User, label: "Profile", href: "#" },
  { icon: FileText, label: "Documents", href: "#" },
  { icon: Settings, label: "Settings", href: "#" },
  { icon: HelpCircle, label: "Help", href: "#" },
 ];

 return (
  <>
   {
    isOpen
    &&
    <div
     className="fixed inset-0 bg-black/20 z-40"
     onClick={toggleSidebar}
    ></div>
   }

   <Card
    ref={sidebarRef}
    className={cn(
     "fixed top-0 bottom-0 left-0 sm:left-4 sm:top-4 sm:bottom-4 max-w-full w-80 z-50 transition-all duration-300 ease-in-out",
     "bg-sidebar border-sidebar-border shadow-lg",
     "rounded-none sm:rounded-md",
     isOpen ? "translate-x-0" : "-translate-x-full"
    )}
   >
    <div className="flex flex-col h-full">
     {/* header */}
     <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
      <h2 className="text-lg font-semibold text-sidebar-foreground">
       Menu
      </h2>
      <Button
       variant={"ghost"}
       size={"icon"}
       onClick={toggleSidebar}
       className="text-sidebar-accent-foreground hover:bg-sidebar-accent"
      >
       <X className="h-4 w-4" />
      </Button>
     </div>
     {/* content */}
     <div className="flex-1 p-4">
      <nav className="flex flex-col gap-2">
       {
        menuItems.map((item, idx) => (
         <Link
          key={idx}
          href={item.href}
          className={cn(
           "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
           "text-sidebar-accent-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
         >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
         </Link>
        ))
       }
      </nav>
     </div>
     {/* footer */}
     <div className="p-4 border-sidebar-border">
      <div className="text-xs text-sidebar-foreground/60 text-center">
       Sidebar Flotante v1.0
      </div>
     </div>
    </div>
   </Card>

   {/* boton flotante */}
   {
    !isOpen &&
    (
     <Button
      onClick={toggleSidebar}
      className={cn(
       "fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full shadow-lg",
       "bg-sidebar hover:bg-primary/90 text-sidebar-accent-foreground",
       "transition-all duration-300 ease-in-out hover:scale-110"
      )}
      size={'icon'}
     >
      <Menu className="h-5 w-5" />
     </Button>
    )
   }
  </>
 );
}