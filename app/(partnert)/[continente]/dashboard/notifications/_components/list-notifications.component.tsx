/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useI18n } from "@/hooks/use-i18n";
import { useDateMemo } from "@/hooks/use-moment";
import { useChangeStateNotificationMutation } from "@/lib/Redux/web/endpoints/notifications";
import { cn } from "@/lib/utils";
import { Notificacion } from "@/types/notification.type";
import { BellRing } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export function ListNotifications({
  notifications
}: {
  notifications: Notificacion[]
}) {

  const { t } = useI18n();
  const [filter, setFilter] = useState<string>('todos');

  const { aprobadas, rechazadas, pendientes } = useMemo(() => {
    const aprobadas: Notificacion[] = [];
    const rechazadas: Notificacion[] = [];
    const pendientes: Notificacion[] = [];

    for (const n of notifications) {
      if (n.estado_id === 4) {
        aprobadas.push(n);
      } else if (n.estado_id === null) {
        pendientes.push(n);
      } else {
        rechazadas.push(n);
      }
    }

    return { aprobadas, rechazadas, pendientes };
  }, [notifications]);

  if (notifications.length === 0) {
    return (
      <>
        <hr />
        <h1 className="text-xl font-bold text-center my-10">{t("np_no_results")}</h1>
      </>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5">

      <Select
        onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="w-full max-w-[300px]">
          <SelectValue placeholder={t("btn_selected")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            value="todos"
          >{t("btn_all")}</SelectItem>
          <SelectItem
            value="pendientes"
            disabled={pendientes.length === 0}
          >{t("btn_pendings")}</SelectItem>
          <SelectItem
            value="aprobadas"
            disabled={aprobadas.length === 0}
          >{t("btn_approveds")}</SelectItem>
          <SelectItem
            value="rechazadas"
            disabled={rechazadas.length === 0}
          >{t("btn_rechazeds")}</SelectItem>
        </SelectContent>
      </Select>

      <hr />

      <div className={cn(
        'flex flex-col gap-4',
        pendientes.length === 0 ? "hidden" : "visible",
        filter === 'pendientes' && pendientes.length > 0 ? "visible" : filter === 'todos' ? "visible" : "hidden",
      )}>
        <h3 className={'text-xl font-bold text-black/80 dark:text-white'}>
          {t("np_pending")}
        </h3>
        <StateNotifications notifications={pendientes} state="pending" />
      </div>
      <hr className={cn(filter === 'pendientes' && pendientes.length > 0 ? "visible" : filter === 'todos' ? "visible" : "hidden")} />

      <div className={cn(
        'flex flex-col gap-4',
        aprobadas.length === 0 ? "hidden" : "visible",
        filter === 'aprobadas' && aprobadas.length > 0 ? "visible" : filter === 'todos' ? "visible" : "hidden",
      )}>
        <h3 className='text-xl font-bold text-black/80 dark:text-white'>
          {t("np_approvals")}
        </h3>
        <StateNotifications notifications={aprobadas} state="approved" />
      </div>
      <hr className={cn(filter === 'aprobadas' && aprobadas.length > 0 ? "visible" : filter === 'todos' ? "visible" : "hidden")} />

      <div className={cn(
        'flex flex-col gap-4',
        rechazadas.length === 0 ? "hidden" : "visible",
        filter === 'rechazadas' && rechazadas.length > 0 ? "visible" : filter === 'todos' ? "visible" : "hidden",
        filter === 'todos' && "visible"
      )}>
        <h3 className='text-xl font-bold text-black/80 dark:text-white'>
          {t("np_unapproved")}
        </h3>
        <StateNotifications notifications={rechazadas} state="reject" />
      </div>
    </div>
  )
}

function StateNotifications({
  notifications,
  state,
}: {
  notifications: Notificacion[],
  state: 'approved' | 'pending' | 'reject',
}) {

  const id = useId();
  const session = useSession();

  return (
    <div className="flex flex-col gap-3 w-full max-w-[900px]">
      {
        notifications.map((notification, idx) => (
          <StateNotificationItem
            key={id + "-" + idx}
            notification={notification}
            state={state}
            personId={Number(session.data?.user.id)}
          />
        ))
      }
    </div>
  );
}

function StateNotificationItem({
  notification,
  state,
  personId
}: {
  notification: Notificacion,
  state: 'approved' | 'pending' | 'reject',
  personId: number
}) {

  const { t } = useI18n();
  const router = useRouter();
  const date = useDateMemo(notification.createdat);
  const [mounted, setMounted] = useState<boolean>(false);

  const [putNotifaction, { isLoading }] = useChangeStateNotificationMutation();

  const isDisabled = useMemo(() => {
    if (personId === notification.persona_id) return true;
    return isLoading;
  }, [personId, isLoading]);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <Skeleton className="w-full h-20" />

  const changeState = async (state: number) => {
    await putNotifaction({
      id: notification.id,
      estado_id: state
    })
      .unwrap()
      .then((res) => {
        console.log(res)
        toast(res.message, {
          description: res.data.message,
        });
        router.refresh();
      })
  }

  return (
    <Card
      className="w-full flex flex-row items-center justify-between gap-5 rounded-md py-2 px-5"
    >
      <div className="flex flex-row items-center justify-start gap-4">
        <BellRing className="text-muted-foreground" />
        <div className="flex flex-col gap-0 overflow-hidden">
          <h6 className="font-medium text-black/80 dark:text-white truncate max-w-[100px] sm:max-w-[200px] lg:max-w-[300px] xl:max-w-[500px]">{notification.titulo}</h6>
          <p className="text-sm text-muted-foreground truncate max-w-[100px] sm:max-w-[200px] lg:max-w-[300px] xl:max-w-[500px]">{notification.descripcion}</p>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
      </div>

      <div className="flex items-center justify-end md:justify-center gap-2 flex-wrap">
        {
          state === 'pending'
            ?
            <>
              <Button
                type="button"
                size={'sm'}
                variant={'outline'}
                className="bg-green-500/90 hover:bg-green/60 dark:bg-green/60 hover:dark:bg-green/90"
                onClick={() => changeState(4)}
                disabled={isDisabled}
              >
                {t("btn_approve")}
              </Button>
              <Button
                type="button"
                size={'sm'}
                variant={'outline'}
                className="text-white bg-red-500/90 hover:bg-destructive/60 dark:bg-destructive/60 hover:dark:bg-destructive/90"
                onClick={() => changeState(5)}
                disabled={isDisabled}
              >
                {t("btn_reject")}
              </Button>
            </>
            :
            <Button
              type="button"
              size={'sm'}
              variant={'outline'}
              disabled
            >
              {
                state === 'approved'
                  ?
                  t("btn_approved")
                  :
                  t("btn_rejected")
              }
            </Button>
        }
      </div>

    </Card>
  )
}