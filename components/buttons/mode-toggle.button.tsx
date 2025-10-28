"use client";

import { DynamicIcon } from "lucide-react/dynamic";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ModeToggle() {
 const { setTheme, theme } = useTheme();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 if (!mounted) {
  // Render algo neutro mientras carga (por ejemplo, un placeholder redondo)
  return (
   <Button size="icon" variant="outline">
    <div className="h-4 w-4 rounded-full animate-pulse bg-muted" />
   </Button>
  );
 }

 const isLight = theme === "light";
 const icon = isLight ? "sun" : "moon";

 return (
  <Button
   size="icon"
   variant="outline"
   onClick={() => setTheme(isLight ? "dark" : "light")}
  >
   <DynamicIcon name={icon} />
  </Button>
 );
}
