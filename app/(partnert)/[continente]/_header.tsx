"use client";

import { Notifications } from "@/components/dropdowns/notifications.dropdown";
import { PageLoader } from "@/components/loaders/page-loader";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useFindOneContinentByCodeQuery } from "@/lib/Redux/web/endpoints/locations/continentes";
import { redirect } from "next/navigation";

export function LayoutContinente({
 continente,
}: {
 continente: string;
}) {

 const { data, isLoading, isError } = useFindOneContinentByCodeQuery(continente);

 if (isLoading) return <PageLoader className="w-full h-screen fixed top-0 left-0 z-[999] bg-sidebar" />
 if (isError || !data) return redirect("/");

 // TODO: Quitar
 if (data.codigo_3 !== "AMR") return redirect("/AMR/dashboard/home");

 return (
  <header className='sticky top-0 flex shrink-0 items-center gap-2 border-b p-4 bg-white dark:bg-background rounded-tr-none rounded-tl-none tablet:rounded-tr-lg tablet:rounded-tl-lg z-10'>
   <div className="w-full flex items-center justify-between gap-2 px-4">
    <SidebarTrigger className='-ml-1' />

    <h6 className="font-bold text-muted-foreground">{data.nombre}</h6>

    <Notifications />
   </div>
  </header>
 );
}