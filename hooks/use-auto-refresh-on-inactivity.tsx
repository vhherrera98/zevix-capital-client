/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { mainApiSlice } from "@/lib/Redux/web/api-slice";

const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutos

export function useAutoRefreshOnInactivity() {
  const router = useRouter();
  const dispatch = useDispatch();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleRefresh = () => {
    console.log("Inactividad detectada. Refrescando...");
    
    // 1. Refrescar la ruta en Next.js
    router.refresh();

    // 2. Invalidar todas las tags registradas
    dispatch(mainApiSlice.util.invalidateTags(["AUTO_REFRESH", "vouchers"]));

    // 3. Opcional: resetear por completo la cache de RTK
    // dispatch(api.util.resetApiState());
  };

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(handleRefresh, INACTIVITY_LIMIT);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "scroll", "touchstart"];

    const handleActivity = () => resetTimer();

    events.forEach((event) => window.addEventListener(event, handleActivity));

    resetTimer(); // iniciar temporizador

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
}
