"use client";

import { useOnlineStatus } from "@/hooks/use-online-status";
import NoInternet from "@/components/common/NoInternet-page";

export default function OnlineGuard({ children }: { children: React.ReactNode }) {
 
 const isOnline = useOnlineStatus();

 if (!isOnline) {
  return <NoInternet />;
 }

 return <>{children}</>;
}
