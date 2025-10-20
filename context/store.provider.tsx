"use client";
import { AppStore, makeStore } from "@/lib/Redux/store"
import { Provider } from "react-redux";
import { useRef } from "react"

export default function StoreProvider({
 children
}: {
 children: React.ReactNode
}) {
 const storeRef = useRef<AppStore>(undefined);
 if (!storeRef.current) storeRef.current = makeStore();
 return <Provider store={storeRef.current}>{children}</Provider>;
}