"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/hooks/use-i18n";
import { AllPeronsalWallet, PersonalWallet } from "../../app/(partnert)/[continente]/dashboard/home/_types";
import { useDateMemo } from "@/hooks/use-moment";
import { useCurrencyMemo } from "@/hooks/use-currency";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function RecentIncomesTable({
 incomes
}: {
 incomes: PersonalWallet[]
}) {

 const [mounted, setMounted] = useState<boolean>(false);
 const { t } = useI18n();

 useEffect(() => setMounted(true), []);
 if (!mounted) return <Skeleton className="w-full h-[200px] bg-gray-300 dark:bg-accent" />

 return (
  <Card className="gap-2">
   <CardHeader>
    <CardTitle className="font-bold">{t('home_recentIncomePersonal')}</CardTitle>
    <CardDescription className="text-sm text-muted-foreground font-medium -mt-1">{t("home_revenues", { length: incomes.length })}</CardDescription>
   </CardHeader>
   <CardContent>
    <RecentIncomeContent>
     {
      incomes.map((income, idx) => (
       <RecentIncomeItem income={income} key={idx} />
      ))
     }
    </RecentIncomeContent>
   </CardContent>
   <CardFooter>
    <Button
     type="button"
     className="w-full"
     variant={'outline'}
    >
     {t("home_incomes")}
    </Button>
   </CardFooter>
  </Card>
 )
}

export function RecentIncomesTotal({
 incomes
}: {
 incomes: AllPeronsalWallet[]
}) {

 const [mounted, setMounted] = useState<boolean>(false);
 const { t } = useI18n();

 useEffect(() => setMounted(true), []);
 if (!mounted) return <Skeleton className="w-full h-[200px] bg-gray-300 dark:bg-accent" />

 return (
  <Card className="gap-2">
   <CardHeader>
    <CardTitle className="font-bold">{t('home_recentIncomeTotal')}</CardTitle>
    <CardDescription className="text-sm text-muted-foreground font-medium -mt-1">{t("home_revenues", { length: incomes.length })}</CardDescription>
   </CardHeader>
   <CardContent>
    <RecentIncomeContent>
     {
      incomes.map((income, idx) => (
       <RecentIncomeSingleItem income={income} key={idx} />
      ))
     }
    </RecentIncomeContent>
   </CardContent>
   <CardFooter>
    <Button
     type="button"
     className="w-full"
     variant={'outline'}
    >
     {t("home_incomes")}
    </Button>
   </CardFooter>
  </Card>
 )
}

function RecentIncomeContent({
 children
}: {
 children: React.ReactNode
}) {
 return (
  <ul className="grid grid-cols-1">
   {children}
  </ul>
 )
}


function RecentIncomeItem({
 income
}: {
 income: PersonalWallet
}) {
 const currentDate = useDateMemo(income.created_at, 'LL');
 const amount = useCurrencyMemo({ abrev: "USD" }, income.monto);

 return (
  <li className="flex flex-row items-end justify-between gap-2 rounded-md hover:bg-gray-200 cursor-pointer py-3 px-5 dark:hover:bg-background">
   <span className="font-medium text-sm flex flex-row items-center gap-1">
    <span className="font-bold text-green-600/60">+</span>
    {amount}
   </span>
   <CardAction>
    <span className="text-xs font-semibold text-muted-foreground text-end">
     {currentDate}
    </span>
   </CardAction>
  </li>
 )
}

function RecentIncomeSingleItem({
 income
}: {
 income: AllPeronsalWallet
}) {

 const currentDate = useDateMemo(income.created_at, 'LL');
 const amount = useCurrencyMemo({ abrev: "USD" }, income.monto);

 return (
  <li className="overflow-x-auto w-full flex flex-row items-end justify-between gap-2 rounded-md hover:bg-gray-200 cursor-pointer py-3 px-5 dark:hover:bg-background">
   <div>
    <h4 className="text-ternary text-[16px]">{income.persona.nombres}</h4>
    <h6 className="text-muted-foreground text-xs font-medium">{income.persona.email}</h6>
   </div>
   <div className="flex flex-col items-end">
    <span className="font-medium text-sm flex flex-row items-center gap-1">
     <span className="font-bold text-green-600/60">+</span>
     {amount}
    </span>
    <p className="text-xs text-muted-foreground text-end">{currentDate}</p>
   </div>
  </li>
 )
}