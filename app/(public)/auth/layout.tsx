import StoreProvider from "@/context/store.provider";
import type { ReactNode } from "react";
// TODO: Si o si debe esta el modal
type LayoutProps = {
 children: ReactNode;
 // modal?: ReactNode;
};

export default function AuthStoreLayout({
 children,
 // modal
}: LayoutProps) {
 return (
  <StoreProvider>
   {children}
   {/* {modal} */}
  </StoreProvider>
 );
}
