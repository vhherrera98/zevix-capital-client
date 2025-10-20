"use client";
import { DataTable } from '@/components/table/data-table'
import React from 'react'
import { useDeleteCuentaBancoMutation, useGetAllBankAccountsQuery } from '@/lib/Redux/web/endpoints/banks';
import { PageLoader } from '@/components/loaders/page-loader';
import { useI18n } from '@/hooks/use-i18n';
import { Button } from '@/components/ui/button';
import { useParams, useRouter } from 'next/navigation';
import { ColumnDef } from '@tanstack/react-table';
import { CuentaBanco } from '@/types/bank.type';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { ContainerCell } from '@/components/table/data-table-cell';
import { DialogAlert } from '@/components/dialogs/dialog-alert';
import { Trash } from 'lucide-react';
import { useErrorToast, useSuccessToast } from '@/hooks/use-toast';

export default function PageBankAccounts() {

  const params = useParams();
  const continente = params.continente as string

  const { t } = useI18n();
  const router = useRouter();
  const { data, isLoading, isError } = useGetAllBankAccountsQuery();
  const [removeCuenta, { error, data: success }] = useDeleteCuentaBancoMutation();

  useErrorToast(error);
  useSuccessToast(success);

  if (isLoading) return <PageLoader />
  if (isError || !data) throw new Error('Error con el servidor');;

  const { data: accounts } = data;
  const columns: ColumnDef<CuentaBanco>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_id")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("id")}</ContainerCell>,
      meta: { label: t("bank_account_id") },
    },
    {
      accessorKey: "banco_nombre",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_banco_nombre")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("banco_nombre")}</ContainerCell>,
      meta: { label: t("bank_account_banco_nombre") }
    },
    {
      accessorKey: "titular",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_titular")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("titular")}</ContainerCell>,
      meta: { label: t("bank_account_titular") }
    },
    {
      accessorKey: "numero_cuenta",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_numero_cuenta")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("numero_cuenta")}</ContainerCell>,
      meta: { label: t("bank_account_numero_cuenta") }
    },
    {
      accessorFn: row => row.tipo_cuenta.nombre,
      id: "tipo_cuenta_nombre",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_tipo_cuenta_nombre")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("tipo_cuenta_nombre")}</ContainerCell>,
      meta: { label: t("bank_account_tipo_cuenta_nombre") }
    },
    {
      accessorFn: row => row.moneda.nombre,
      id: "moneda_nombre",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_moneda_nombre")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("moneda_nombre")}</ContainerCell>,
      meta: { label: t("bank_account_moneda_nombre") }
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => <DataTableColumnHeader column={column} title={t("bank_account_created_at")} />,
      cell: ({ row }) => <ContainerCell>{row.getValue("created_at")}</ContainerCell>,
      meta: { label: t("bank_account_created_at") }
    },
    {
      accessorKey: "Actions",
      cell: ({ row }) => {

        return (
          <DialogAlert
            triggerLabel={<Trash />}
            title={t("dialog_title")}
            description={t("dialog_description", {
              name: row.original.banco_nombre
            })}
            onContinue={async () => await removeCuenta(row.original.id)}
            triggerButtonProps={{
              size: 'icon',
              variant: 'destructive'
            }}
          />
        )

      },
    }
  ];

  return (
    <div className='grid grid-cols-1 gap-2'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className="text-2xl font-bold">{t("accounts_banks_title")}</h1>
        <Button
          type='button'
          variant={'default'}
          className='bg-indigo-600 hover:bg-indigo-800 text-white'
          onClick={() => router.push("/" + continente + "/dashboard/accounts/banks/new")}
        >{t("accounts_banks_button")}</Button>
      </div>
      <DataTable columns={columns} data={accounts} />
    </div>
  )
}
