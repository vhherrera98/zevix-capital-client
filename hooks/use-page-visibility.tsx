"use client";

import { useEffect, useState } from "react";

type VisibilityState = "visible" | "hidden";

interface UseExtendedVisibility {
  isVisible: boolean;      // Page Visibility API
  visibilityState: VisibilityState;
  isHidden: boolean;
  hasFocus: boolean;       // Ventana con foco
}

export function useExtendedVisibility(): UseExtendedVisibility {
  const [isVisible, setIsVisible] = useState(true);
  const [visibilityState, setVisibilityState] = useState<VisibilityState>("visible");
  const [hasFocus, setHasFocus] = useState(true);

  useEffect(() => {
    // --- Page Visibility API ---
    const handleVisibilityChange = () => {
      const state = document.visibilityState as VisibilityState;
      setVisibilityState(state);
      setIsVisible(state === "visible");
    };

    // --- Window Focus/Blur ---
    const handleFocus = () => setHasFocus(true);
    const handleBlur = () => setHasFocus(false);

    // Estado inicial
    handleVisibilityChange();
    setHasFocus(document.hasFocus());

    // Listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return {
    isVisible,
    visibilityState,
    isHidden: !isVisible,
    hasFocus,
  };
}
