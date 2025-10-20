"use client";

import { useI18n } from "@/hooks/use-i18n";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageLoader } from "@/components/loaders/page-loader";
import { DataTable } from "@/components/table/data-table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ContainerCell } from "@/components/table/data-table-cell";
import { useGetAllPartnersQuery } from "@/lib/Redux/web/endpoints/users/partner/partner.endpoint";
import { ColumnDef } from "@tanstack/react-table";
import { Usuario } from "@/types/usuario.type"; // Asegúrate de tener este type
import { useSession } from "next-auth/react";

export default function PagePartners() {
  const { t } = useI18n();
  const router = useRouter();
  const { data, isLoading, isError, status } = useGetAllPartnersQuery();

  const session = useSession();

  if (isLoading) return <PageLoader />;
  if (isError || !data) return <div>{JSON.stringify(status, null, 2)}</div>;

  const { data: partners } = data;

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
          title={t("partner_table_fullname")}
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
      meta: { label: t("partner_table_fullname") },
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("partner_table_mail")}
        />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue("email")}</ContainerCell>,
      meta: { label: t("partner_table_mail") },
    },
    {
      accessorKey: "fecha_creacion",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t("partner_table_createat")}
        />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue("fecha_creacion")}</ContainerCell>,
      meta: { label: t("partner_table_createat") },
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">{t("partner_page_title")}</h1>
        <Button
          type="button"
          variant="default"
          className="bg-indigo-600 hover:bg-indigo-800 text-white"
          onClick={() => router.push("/dashboard/partners/new")}
        >
          {t("partner_form_title")}
        </Button>
      </div>
      <DataTable columns={columns} data={partners} />
    </div>
  );
}
