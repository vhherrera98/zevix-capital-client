"use client";
import { Estado } from "@/types/documents.type";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Check, Clock, Eye, X } from "lucide-react";
import { useI18n } from "@/hooks/use-i18n";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function CircleStateBadge({
 estado
}: { estado: Estado }) {

 const { t } = useI18n();
 const [mounted, setMounted] = useState<boolean>(false);

 useEffect(() => setMounted(true), []);
 if (!mounted) return <Skeleton className="h-6 w-6 rounded-full px-1" />

 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Badge className={cn(
     "h-6 min-w-6 rounded-full px-1 font-mono tabular-nums flex items-center justify-center",
     estado.nombre === "Aprobado" && "bg-green-200 text-green-800/80",
     estado.nombre === "En Revisión" && "bg-yellow-200 text-yellow-800/80",
     estado.nombre === "Pendiente" && "bg-gray-200 text-gray-800",
     estado.nombre === "Rechazado" && "bg-red-500/90 text-white dark:bg-destructive dark:text-black",
    )}>
     {estado.nombre === "Aprobado" && <Check size={10} />}
     {estado.nombre === "En Revisión" && <Eye size={10} />}
     {estado.nombre === "Pendiente" && <Clock size={10} />}
     {estado.nombre === "Rechazado" && <X size={10} />}
    </Badge>
   </TooltipTrigger>
   <TooltipContent>
    {estado.nombre === "Aprobado" && <p>{t("Aprobado")}</p>}
    {estado.nombre === "En Revisión" && <p>{t("En Revisión")}</p>}
    {estado.nombre === "Pendiente" && <p>{t("Pendiente")}</p>}
    {estado.nombre === "Rechazado" && <p>{t("Rechazado")}</p>}
   </TooltipContent>
  </Tooltip>
 );

}