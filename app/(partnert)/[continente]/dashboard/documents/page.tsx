'use client'

import { PageLoader } from '@/components/loaders/page-loader'
import { DataTable } from '@/components/table/data-table'
import { ContainerCell } from '@/components/table/data-table-cell'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Skeleton } from '@/components/ui/skeleton'
import { useI18n } from '@/hooks/use-i18n'
import {
  useGetAllDocumentsTypesQuery,
  useGetDocumentByUserQuery
} from '@/lib/Redux/web/endpoints/documents'
import { TipoDocumento } from '@/types/documents.type'
import { ColumnDef } from '@tanstack/react-table'
import { Download, Upload } from 'lucide-react'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { openInGoogleDrive } from '@/utils/download-file.util'
import { useParams, useRouter } from 'next/navigation'
import { TooltipButton } from '@/components/buttons/tooltip-button'

export default function PageDocumentsPersonal () {
  const params = useParams()
  const continente = params.continente as string

  const { data, isLoading, isError, refetch } = useGetAllDocumentsTypesQuery()
  const { t, lang } = useI18n()

  useEffect(() => {
    refetch()
  }, [lang, refetch])

  if (isLoading) return <PageLoader />
  if (isError || !data) throw new Error('Error con el servidor')
  const { data: documents } = data

  const columns: ColumnDef<TipoDocumento>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='ID' />
      ),
      cell: ({ row }) => <ContainerCell>{row.getValue('id')}</ContainerCell>,
      meta: { label: 'ID' }
    },
    {
      accessorKey: 'nombre',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('form_documents_table_nombre')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>{row.getValue('nombre')}</ContainerCell>
      ),
      meta: { label: t('form_documents_table_nombre') }
    },
    {
      accessorKey: 'actions',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Actions' />
      ),
      cell: ({ row }) => {
        return (
          <ButtonsActions
            documentId={row.original.id}
            continente={continente}
          />
        )
      },
      meta: { label: 'Actions' }
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-5'>
      <h1 className='text-2xl font-bold'>{t('page_documents_personal')}</h1>
      <DataTable data={documents} columns={columns} />
    </div>
  )
}

function ButtonsActions ({
  documentId,
  continente = ''
}: {
  documentId: number
  continente?: string
}) {
  const { t } = useI18n()
  const { data, isLoading, isError } = useGetDocumentByUserQuery(documentId)

  const router = useRouter()

  if (isLoading) return <Skeleton className='w-[100px] h-6' />
  if (isError || !data) throw new Error('Error con el servidor')
  const { data: document } = data

  if (!document) {
    return (
      <TooltipButton
        onClick={() => {
          const route = `/dashboard/documents/upload/${
            documentId === 1 ? 'dni' : 'passport'
          }`
          const withContinent = continente ? '/' + continente + route : route
          router.push(withContinent)
        }}
        content={t('form_document_upload_button')}
        variant='secondary'
      >
        <Upload />
      </TooltipButton>
    )
  }

  return (
    <div className='flex items-center justify-start gap-2'>
      <TooltipButton
        onClick={() => {
          const route = `/dashboard/documents/upload/${
            documentId === 1 ? 'dni' : 'passport'
          }`
          const withContinent = continente ? '/' + continente + route : route
          router.push(withContinent)
        }}
        content={t('form_document_upload_button')}
        variant='secondary'
      >
        <Upload />
      </TooltipButton>
      <TooltipButton
        content={t('form_document_download')}
        variant='secondary'
        onClick={() => openInGoogleDrive(document.url)}
      >
        <Download />
      </TooltipButton>
      <Badge
        className={cn(
          'rounded-full font-bold px-4 py-1',
          document.estado.nombre === 'Aprobado' &&
            'bg-green-200 text-green-800/80',
          document.estado.nombre === 'En Revisión' &&
            'bg-yellow-200 text-yellow-800/80',
          document.estado.nombre === 'Pendiente' && 'bg-gray-200 text-gray-800',
          document.estado.nombre === 'Rechazado' &&
            'bg-red-500/90 text-white dark:bg-destructive dark:text-black'
        )}
      >
        {t(document.estado.nombre)}
      </Badge>
    </div>
  )
}
