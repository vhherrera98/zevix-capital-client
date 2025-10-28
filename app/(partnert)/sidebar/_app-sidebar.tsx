"use client";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent, SidebarCustom, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar";
import React from "react";

type Props = {} & React.ComponentProps<typeof Sidebar>

export function AppSidebar({ ...props }: Props) {
 return (
  <SidebarCustom
   collapsible="icon"
   variant="floating"
   {...props}
  >
   {/* header */}
   <SidebarHeader>
    <NavHeader />
   </SidebarHeader>
   {/* content */}
   <SidebarContent className="scrollbar">
    <NavMain />
   </SidebarContent>
   {/* footer */}
   <SidebarFooter>
    <NavFooter />
   </SidebarFooter>
  </SidebarCustom>
 )
}

function NavHeader() {
 return (
  <div>
   <div className="flex flex-col gap-0- items-start justify-start mb-4">
    <div className="flex flex-row gap-1 items-center justify-start">
     <div className="w-5 h-5 bg-black rounded-full"></div>
     <h5 className="font-bold">Saliena +</h5>
    </div>
    <p className="text-sm text-muted-foreground">Sales Marketplace</p>
   </div>
   <div>
    <input
     type="text"
     className="w-full border border-muted-foreground/10 bg-[#f1f9f2] rounded-full py-2 px-5"
     placeholder="Buscar"
    />
   </div>
  </div>
 )
}

function NavMain() {
 return (
  <SidebarGroup>
   <SidebarGroupLabel>MENU</SidebarGroupLabel>
   <SidebarMenu>
    {
     Array.from({ length: 5 }).map((_, idx) => (
      <Collapsible
       key={idx}
       className="group/collapsible"
       asChild
      >
       <SidebarMenuItem>
        <CollapsibleTrigger
         asChild
        >
         <SidebarMenuButton>
          Titulo{" - "}{idx + 1}
         </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
         <SidebarMenuSub>
          {
           Array.from({ length: 5 }).map((_, idx2) => (
            <SidebarMenuSubItem
             key={"subtitle-" + idx2}
            >
             <SidebarMenuSubButton>
              Subtitulo{" - "}{idx2 + 1}
             </SidebarMenuSubButton>
            </SidebarMenuSubItem>
           ))
          }
         </SidebarMenuSub>
        </CollapsibleContent>
       </SidebarMenuItem>
      </Collapsible>
     ))
    }
   </SidebarMenu>
  </SidebarGroup>
 )
}

function NavFooter() {
 return (
  <div className="flex flex-col gap-5">
   <SidebarGroup>
    <SidebarGroupLabel>TOOLS</SidebarGroupLabel>
    <SidebarMenu>
     {
      Array.from({ length: 2 }).map((_, idx) => (
       <Collapsible
        key={idx}
        className="group/collapsible"
        asChild
       >
        <SidebarMenuItem>
         <CollapsibleTrigger
          asChild
         >
          <SidebarMenuButton>
           Titulo{" - "}{idx + 1}
          </SidebarMenuButton>
         </CollapsibleTrigger>
        </SidebarMenuItem>
       </Collapsible>
      ))
     }
    </SidebarMenu>
   </SidebarGroup>
   <div className="bg-black rounded-4xl p-5">
    <div className="flex flex-col gap-7">
     <h5 className="text-white font-light text-sm">Buy and Sell <br />Amazing Products</h5>
     <Button variant={"secondary"} className="rounded-full">
      Learn More
     </Button>
    </div>
   </div>
  </div>
 )
}