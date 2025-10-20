import StoreProvider from "@/context/store.provider";

export default function AuthStoreLayout({
 children,
 modal
}: {
 children: React.ReactNode;
 modal: React.ReactNode;
}) {
 return (
  <StoreProvider>
   {children}
   {modal}
  </StoreProvider>
 )
}