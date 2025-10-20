"use client";

import { PageLoader } from "@/components/loaders/page-loader";
import { useGetVouchersByPersonsQuery } from "@/lib/Redux/web/endpoints/vouchers";
import { DataTable } from "@/components/table/data-table";
import { ContainerCell } from "@/components/table/data-table-cell";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import { Voucher } from "@/types/voucher.type";
import { useMoneda } from "@/hooks/use-moneda";
import { CircleStateBadge } from "@/components/badges/circle-state-badge";
import { Button } from "@/components/ui/button";
import { useGetAllStatesQuery } from "@/lib/Redux/web/endpoints/states";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo, useState } from "react";
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from "@/components/ui/select"
import { ModalDialog } from "@/components/modal";
import { Eye } from "lucide-react";
import Image from "next/image";
import { useI18n } from "@/hooks/use-i18n";
import { useApproveVoucherMutation } from "@/lib/Redux/web/endpoints/vouchers/requests";
import { toast } from "sonner";
import { errorMessage } from "@/utils/error-message.utils";

export default function PageVouchersByPersons() {

 const { t } = useI18n();
 const [filter, setFilter] = useState<string>("all")
 const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
 const [voucherSelected, setVoucherSelected] = useState<Voucher | null>(null);
 const { data, isLoading, isError } = useGetVouchersByPersonsQuery(undefined, {
  pollingInterval: isOpenModal ? 0 : 10000

 });
 const { formatMoneda } = useMoneda();

 const vouchers = useMemo(() => {
  if (!data) return [];
  if (filter === 'all') return data.data;
  return data.data.filter((voucher) => String(voucher.estado.id) === filter);
 }, [filter, data]);

 if (isLoading) return <PageLoader />
 if (isError || !data) throw new Error('Error con el servidor');

 const columns: ColumnDef<Voucher>[] = [
  {
   accessorFn: (row) => row.estado.nombre,
   accessorKey: "state",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_estado")} />,
   cell: ({ row }) => <CircleStateBadge estado={row.original.estado} />,
   meta: { label: t("voucher_solicitud_tabla_estado") }
  },
  {
   accessorKey: "image",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_recibo")} />,
   cell: ({ row }) => (
    <Button
     type="button"
     size={'icon'}
     onClick={() => {
      setIsOpenModal(true);
      setVoucherSelected(row.original)
     }}
    >
     <Eye />
    </Button>
   ),
   meta: { label: t("voucher_solicitud_tabla_recibo") }
  },
  {
   accessorFn: (row) => row.persona.nombres + " " + row.persona.apellidos,
   accessorKey: "fullname",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_persona")} />,
   cell: ({ row }) => <ContainerCell>{row.getValue("fullname")}</ContainerCell>,
   meta: { label: t("voucher_solicitud_tabla_persona") }
  },
  {
   accessorKey: "num_transaccion",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_numero_transaccion")} />,
   cell: ({ row }) => <ContainerCell>#{row.getValue("num_transaccion")}</ContainerCell>,
   meta: { label: t("voucher_solicitud_tabla_numero_transaccion") }
  },
  {
   accessorFn: (row) => row.monto,
   accessorKey: "monto",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_monto")} />,
   cell: ({ row }) => {
    return <ContainerCell>{formatMoneda(row.original.monto, row.original.moneda.abrev)}</ContainerCell>
   },
   meta: { label: t("voucher_solicitud_tabla_monto") }
  },
  {
   accessorFn: (row) => row.moneda.nombre,
   accessorKey: "tipo",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_tipo_moneda")} />,
   cell: ({ row }) => <ContainerCell>{row.getValue("tipo")}</ContainerCell>,
   meta: { label: t("voucher_solicitud_tabla_tipo_moneda") }
  },
  {
   accessorKey: "fecha_creacion",
   header: ({ column }) => <DataTableColumnHeader column={column} title={t("voucher_solicitud_tabla_fecha_creacion")} />,
   cell: ({ row }) => <ContainerCell>{row.getValue("fecha_creacion")}</ContainerCell>,
   meta: { label: t("voucher_solicitud_tabla_fecha_creacion") }
  },
 ];

 return (
  <div className="grid grid-cols-1 gap-5">
   <div className='flex flex-row items-center justify-between'>
    <h1 className="text-2xl font-bold">{t("voucher_solicitud_titulo")}</h1>
   </div>
   <DataTable data={vouchers} columns={columns} renderTopActions={
    <SelectState selected={filter} onChange={setFilter} />
   } />
   {
    voucherSelected
    &&
    <ModalView voucher={voucherSelected} isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
   }
  </div>
 )
}

function SelectState({
 selected, onChange
}: {
 selected: string;
 onChange: (value: string) => void;
}) {

 const { data, isLoading, isError } = useGetAllStatesQuery();

 const states = useMemo(() => {
  if (!data) return [];
  return data.data.map((state) => ({
   label: state.nombre,
   value: state.id
  }))
 }, [data]);

 if (isLoading) return <Skeleton className="w-[150px] max-w-[200px] h-[35px]" />;
 if (isError || !data) return null;

 return (
  <Select defaultValue={selected} onValueChange={onChange}>
   <SelectTrigger className="w-full">
    <SelectValue placeholder="Seleccione una filtro" />
   </SelectTrigger>
   <SelectContent>
    <SelectItem value="all">Todos</SelectItem>
    {
     states.map((state, idx) => (
      <SelectItem key={idx} value={String(state.value)}>{state.label}</SelectItem>
     ))
    }
   </SelectContent>
  </Select>
 )
}

function ModalView({
 voucher,
 isOpen,
 setIsOpen
}: {
 voucher: Voucher;
 isOpen: boolean;
 setIsOpen: (value: boolean) => void;
}) {

 const { formatMoneda } = useMoneda();
 const { t, lang } = useI18n();
 const [approveVoucher, { isLoading: isLoadingVoucher }] = useApproveVoucherMutation();
 const isLoading = voucher.estado.id === 4 || voucher.verificacion_previa || isLoadingVoucher;

 const approve = async () => {
  try {
   await approveVoucher({
    estadoId: 4,
    voucherId: voucher.id
   })
    .unwrap()
    .then((response) => {
     toast(response.data || response.message);
     setIsOpen(false);
    });
  } catch (error) {
   toast(errorMessage(error));
  }
 }

 return (
  <ModalDialog
   key={voucher.id}
   open={isOpen}
   setOpen={setIsOpen}
   className="md:max-w-[1000px]"
   title={t("voucher_solicitud_form_titulo", { nombre: voucher.persona.nombres + " " + voucher.persona.apellidos || "" })}
   description={
    <div className="flex flex-col gap-2">
     <h6 className="text-muted-foreground font-bold text-sm">{t("voucher_solicitud_form_subtitulo")}</h6>
     <p className="text-muted-foreground text-sm">
      {formatMoneda(voucher.monto, voucher.moneda.abrev) + " (" + voucher.fecha_creacion + ")"}
     </p>
    </div>
   }
  >
   <div className="grid grid-cols-1 gap-5">
    <div className="grid grid-cols-2 items-center justify-start gap-2">
     <Button
      type="button"
      onClick={approve}
      disabled={isLoading}
     >
      {lang === 'es' ? "Aprobar" : "Approve"}
     </Button>
     <Button
      type="button"
      variant={'destructive'}
      onClick={() => setIsOpen(false)}
      disabled={isLoading}
     >
      {lang === 'es' ? "Rechazar" : "Reject"}
     </Button>
    </div>
    <div className="w-full h-full">
     <Image
      src={voucher.url}
      alt={voucher.public_id}
      width={300}
      height={300}
      className="w-full h-full max-h-[650px] object-contain"
     />
    </div>
   </div>
  </ModalDialog>
 );
}