"use client";
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription
} from "@/components/ui/dialog"
import { signOut } from "next-auth/react";

export default function LayoutAuthModal({
 children
}: {
 children: React.ReactNode
}) {

 const logout = () => signOut({ callbackUrl: '/api/auth/logout' });

 return (
  <Dialog
   open
   onOpenChange={logout}
  >
   <DialogContent className="sm:max-w-[425px] md:max-w-[500px]">

    <DialogHeader>
     <DialogTitle>Cambiar Contrasenha</DialogTitle>
     <DialogDescription>
      Cambia tu contrasenha por defecto a una que no olvides, recuerda no compartir tu contrasena con otras personas.
     </DialogDescription>
    </DialogHeader>

    {children}
   </DialogContent>
  </Dialog>
 )
}