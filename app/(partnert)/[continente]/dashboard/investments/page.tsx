'use client'

import { PageLoader } from '@/components/loaders/page-loader'
import { useGetVoucherAuthenticatedQuery } from '@/lib/Redux/web/endpoints/vouchers'
import { DataTable } from '@/components/table/data-table'
import { ContainerCell } from '@/components/table/data-table-cell'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { ColumnDef } from '@tanstack/react-table'
import { Voucher } from '@/types/voucher.type'
import { useMoneda } from '@/hooks/use-moneda'
import { CircleStateBadge } from '@/components/badges/circle-state-badge'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { useI18n } from '@/hooks/use-i18n'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function PageInvestementsPersona() {
  const params = useParams()
  const continente = params.continente as string

  const session = useSession()
  const isAuthed = session.status === 'authenticated'

  const baseHref = (continente ? `/${continente}` : '')
  const redirectHref = isAuthed && (session.data?.user?.kyc || session.data?.user?.principal)
    ? `${baseHref}/dashboard/investments/add`
    : `${baseHref}/dashboard/investments/kyc`

  const { t } = useI18n()
  const router = useRouter()

  const { data, isLoading, isError } = useGetVoucherAuthenticatedQuery()
  const { formatMoneda } = useMoneda();

  const loader = isLoading || session.status === 'loading';
  if (loader) return <PageLoader />
  if (isError || !data?.data) throw new Error('Error con el servidor');

  if (!session.data?.user.verified && !session?.data?.user?.principal) {
    return (
      <div className='flex flex-col gap-5 items-center justify-center h-full'>
        <h1 className='text-3xl font-medium'>Aún no has verificado tu cuenta</h1>
        <Link
          href={continente ? "/" + continente + "/dashboard/documents" : "/dashboard/documents"}
        >
          <Button type="button">
            Subir documentos
          </Button>
        </Link>
      </div>
    )
  };


  const columns: ColumnDef<Voucher>[] = [
    {
      accessorFn: row => row.estado.nombre,
      accessorKey: 'state',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('voucher_table_status')}
        />
      ),
      cell: ({ row }) => <CircleStateBadge estado={row.original.estado} />,
      meta: { label: t('voucher_table_status') }
    },
    {
      accessorKey: 'num_transaccion',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('voucher_table_transaction_number')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>#{row.getValue('num_transaccion')}</ContainerCell>
      ),
      meta: { label: t('voucher_table_transaction_number') }
    },
    {
      accessorKey: 'fecha_creacion',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('voucher_table_created_at')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>{row.getValue('fecha_creacion')}</ContainerCell>
      ),
      meta: { label: t('voucher_table_created_at') }
    },
    {
      accessorFn: row => row.monto,
      accessorKey: 'monto',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('voucher_table_amount')}
        />
      ),
      cell: ({ row }) => {
        return (
          <ContainerCell>
            {formatMoneda(row.original.monto, row.original.moneda.abrev)}
          </ContainerCell>
        )
      },
      meta: { label: t('voucher_table_amount') }
    },
    {
      accessorFn: row => row.moneda.nombre,
      accessorKey: 'tipo',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('voucher_table_currency')}
        />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue('tipo')}</ContainerCell>,
      meta: { label: t('voucher_table_currency') }
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-5'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='text-2xl font-bold'>Depositos</h1>
        <Button
          type='button'
          className='btn-primary'
          onClick={() =>
            router.push(redirectHref)
          }
        >
          {
            session.data.user.kyc
              ?
              t('voucher_add_new')
              :
              "Subir formulario KYC"
          }
        </Button>
      </div>
      <DataTable data={data.data} columns={columns} />
    </div>
  )
}
