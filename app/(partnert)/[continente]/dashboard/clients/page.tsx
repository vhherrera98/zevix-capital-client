"use client";

import { useI18n } from "@/hooks/use-i18n";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/loaders/page-loader";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ContainerCell } from "@/components/table/data-table-cell";
import { ColumnDef } from "@tanstack/react-table";
import { Usuario } from "@/types/usuario.type"; // Asegúrate de tener este type
import { useSession } from "next-auth/react";
import { useGetAllClientsQuery } from "@/lib/Redux/web/endpoints/users/client/client.endpoint";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Pageclients() {
  const { t } = useI18n();
  const router = useRouter();
  const { data, isLoading, isError } = useGetAllClientsQuery();

  const params = useParams()
  const continente = params.continente as string

  const session = useSession();

  if (isLoading) return <PageLoader />;
  if (isError || !data) throw new Error('Error con el servidor');;

  const { data: clients } = data;

  const columns: ColumnDef<Usuario>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="ID"
        />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue("id")}</ContainerCell>,
      meta: { label: "ID" },
    },
    {
      accessorKey: "nombre",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("client_table_fullname")}
        />
      ),
      cell: ({ row }) => {
        const personaId = row.original.usuarioRol.usuario.persona.id;
        const sessionId = session.data?.user.id;

        return (
          <ContainerCell>
            {sessionId === personaId && <span className="text-indigo-500">(Tú)</span>}
            {" "}
            {row.getValue("nombre")}
          </ContainerCell>)
          ;
      },
      meta: { label: t("client_table_fullname") },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("client_table_mail")}
        />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue("email")}</ContainerCell>,
      meta: { label: t("client_table_mail") },
    },
    {
      accessorKey: "fecha_creacion",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("client_table_createat")}
        />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue("fecha_creacion")}</ContainerCell>,
      meta: { label: t("client_table_createat") },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("client_table_status")}
        />
      ),
      cell: ({ row }) => {

        const verified = row.original.usuarioRol.usuario.persona.verificado;

        return (
          <Badge
            variant="secondary"
            className={cn(
              "bg-blue-500 text-white dark:bg-blue-600 rounded-full",
              !verified && "bg-red-400 dark:bg-destructive/80"
            )}
          >
            <BadgeCheckIcon />
            {t(verified ? "verified" : "unverified")}
          </Badge>
        )
      },
      meta: { label: t("client_table_status") },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">{t("client_page_title")}</h1>
        <Button
          type="button"
          variant="default"
          className="bg-indigo-600 hover:bg-indigo-800 text-white"
          onClick={() => router.push(`/${continente}/dashboard/clients/new`)}
        >
          {t("client_form_title")}
        </Button>
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
