"use client";

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrencyMemo } from "@/hooks/use-currency";
import { useDateMemo } from "@/hooks/use-moment";
import { useEffect, useState } from "react";

type IProps = {
 label: string;
 amount: number;
 date: string;
 className?: string;
 translate?: string
}

export function RevenueCard({ label = "Label from card", amount, date }: IProps) {

 const [mounted, setMounted] = useState<boolean>(false);

 const amount_currency = useCurrencyMemo({ abrev: "USD" }, amount);
 const currentDate = useDateMemo(date, 'LL');

 useEffect(() => setMounted(true), []);
 if (!mounted) return <Skeleton className="w-full h-[250px] bg-gray-300 dark:bg-accent" />

 return (
  <Card>
   <CardContent className="grid grid-cols-1 gap-2">
    <div className="flex flex-col gap-0">
     <CardTitle className="tracking-tight text-sm font-semibold text-ternary">
      {label}
     </CardTitle>
     <CardDescription className="font-medium text-sm text-muted-foreground">{currentDate}</CardDescription>
    </div>
    <h1 className="text-2xl font-semibold text-ternary">{amount_currency}</h1>
   </CardContent>
  </Card>
 )
}