import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { AppSidebar } from "./_app-sidebar";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";

type Props = {} & PropsWithChildren;

export default async function Layout({ children }: Props) {

 const cookieStore = await cookies()
 const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'

 return (
  <SidebarProvider
   className="bg-white"
   style={
    {
     '--sidebar-width': '250px'
    } as React.CSSProperties
   }
   defaultOpen={defaultOpen}
  >
   <AppSidebar />
   <SidebarInset className='relative pr-5'>
    <header
     className={cn(
      "py-5 flex flex-row gap-5 items-center justify-start",
      // "sticky top-0 bg-white"
     )}>
     {
      Array.from({ length: 4 }).map((_, idx) => (
       <div
        key={idx}
        className={cn(
         "py-2 px-5 rounded-full",
         "bg-[#f1f9f2] border border-muted-foreground/10",
         idx === 0 && "bg-[#cef803]"
        )}
       >
        Dashboard
       </div>
      ))
     }
    </header>
    <main
     className={cn(
      "bg-[#f1f9f2] dark:bg-background border border-muted-foreground/10 rounded-4xl",
      'flex flex-1 flex-col gap-4 p-10 mb-5',
     )}
    >
     {children}
    </main>
   </SidebarInset>
  </SidebarProvider>
 )
}