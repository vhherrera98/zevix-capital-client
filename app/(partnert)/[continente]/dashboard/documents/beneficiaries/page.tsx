'use client'

import { CircleStateBadge } from '@/components/badges/circle-state-badge'
import { TooltipButton } from '@/components/buttons/tooltip-button'
import { PageLoader } from '@/components/loaders/page-loader'
import { DataTable } from '@/components/table/data-table'
import { ContainerCell } from '@/components/table/data-table-cell'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/hooks/use-i18n'
import {
  useGetAllBenefciariesByPersonQuery,
  useMarkPrincipalToBeneficiaryMutation
} from '@/lib/Redux/web/endpoints/beneficiaries'
import { cn } from '@/lib/utils'
import { Beneficiario } from '@/types/beneficiario.type'
import { Documento } from '@/types/documents.type'
import { downloadFile } from '@/utils/download-file.util'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { ColumnDef } from '@tanstack/react-table'
import { CircleCheck, Download, Upload, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function PageBeneficiariesByPerson () {
  const params = useParams()
  const continente = params.continente as string

  const router = useRouter()
  const { t } = useI18n()

  const { data, isLoading, isError } = useGetAllBenefciariesByPersonQuery()
  const [markPrincipal, { isLoading: isChange }] =
    useMarkPrincipalToBeneficiaryMutation()

  const submit = async (id: number) => {
    try {
      await markPrincipal(id)
        .unwrap()
        .then(response => {
          toast(response.data || response.message)
        })
    } catch (error) {
      const err = error as FetchBaseQueryError | SerializedError

      const message =
        'data' in err &&
        typeof err.data === 'object' &&
        err.data !== null &&
        'message' in err.data
          ? (err.data as { message: string }).message
          : 'INTERNAL ERROR'

      toast(message)
    }
  }

  if (isLoading) return <PageLoader />
  if (isError || !data) throw new Error('Error con el servidor')
  const { data: beneficiaries } = data

  const columns: ColumnDef<Beneficiario>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Principal' />
      ),
      cell: ({ row }) => {
        const { id, principal } = row.original

        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type='button'
                size={'icon'}
                className={cn(
                  'rounded-full w-6 h-6 hover:opacity-80 text-white',
                  principal
                    ? 'bg-green-600/80 disabled:opacity-100'
                    : 'bg-destructive/60 hover:bg-destructive/60'
                )}
                onClick={() => submit(id)}
                disabled={principal || isChange}
              >
                {principal ? <CircleCheck size={29} /> : <X />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as primary beneficiary</p>
            </TooltipContent>
          </Tooltip>
        )
      },
      meta: { label: 'Principal' }
    },
    {
      accessorKey: 'nombres',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('doc_beneficiario_firstname')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>{row.getValue('nombres')}</ContainerCell>
      ),
      meta: { label: t('doc_beneficiario_firstname') }
    },
    {
      accessorKey: 'apellidos',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('doc_beneficiario_lastname')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>{row.getValue('apellidos')}</ContainerCell>
      ),
      meta: { label: t('doc_beneficiario_lastname') }
    },
    {
      accessorFn: row => row.genero.nombre,
      id: 'genero',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('doc_beneficiario_gender')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>{row.getValue('genero')}</ContainerCell>
      ),
      meta: { label: t('doc_beneficiario_gender') }
    },
    {
      accessorKey: 'fecha_nacimiento',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('doc_beneficiario_birthdate')}
        />
      ),
      cell: ({ row }) => (
        <ContainerCell>{row.getValue('fecha_nacimiento')}</ContainerCell>
      ),
      meta: { label: t('doc_beneficiario_birthdate') }
    },
    {
      accessorKey: 'dni',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('doc_beneficiario_dni_license')}
        />
      ),
      cell: ({ row }) => {
        const documentos = row.original.documento || []
        const documentoConTipoId1 = documentos.find(
          doc => doc.tipo_documento?.id === 1
        )

        return (
          <DocumentAction
            beneficiarioId={row.original.id}
            documento={documentoConTipoId1}
            type='dni'
            continente={continente}
          />
        )
      },
      meta: { label: t('doc_beneficiario_dni_license') }
    },
    {
      accessorKey: 'passport',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('doc_beneficiario_passport')}
        />
      ),
      cell: ({ row }) => {
        const documentos = row.original.documento || []
        const documentoConTipoId2 = documentos.find(
          doc => doc.tipo_documento?.id === 2
        )

        return (
          <DocumentAction
            beneficiarioId={row.original.id}
            documento={documentoConTipoId2}
            type='passport'
            continente={continente}
          />
        )
      },
      meta: { label: t('doc_beneficiario_passport') }
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-5'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='text-2xl font-bold'>{t('doc_beneficiario_title')}</h1>
        <Button
          type='button'
          variant={'default'}
          className='bg-indigo-600 hover:bg-indigo-800 text-white'
          onClick={() => {
            const route = '/dashboard/documents/beneficiaries/add'
            router.push(continente ? '/' + continente + route : route);
          }}
        >
          {t('doc_beneficiario_add')}
        </Button>
      </div>
      <DataTable data={beneficiaries} columns={columns} />
    </div>
  )
}

function DocumentAction ({
  beneficiarioId,
  documento,
  type,
  continente = ''
}: {
  beneficiarioId: number
  documento: Documento | undefined
  type: 'dni' | 'passport'
  continente?: string
}) {
  const router = useRouter()

  if (!documento) {
    return (
      <div className='flex items-center justify-start gap-2'>
        <TooltipButton
          onClick={() => {
            const route = `/dashboard/documents/upload/${type}?beneficiary=${beneficiarioId}`
            const withContinent = continente ? '/' + continente + route : route
            router.push(withContinent)
          }}
          content={'Sube pues paps!'}
          variant='secondary'
        >
          <Upload />
        </TooltipButton>
        <Badge className='h-6 min-w-6 rounded-full'>No subido</Badge>
      </div>
    )
  }

  return (
    <div className='flex items-center justify-start gap-2'>
      <TooltipButton
        onClick={() => {
          const route = `/dashboard/documents/upload/${type}?beneficiary=${beneficiarioId}`
          const withContinent = continente ? '/' + continente + route : route
          router.push(withContinent)
        }}
        content={'Sube pues paps!'}
        variant='secondary'
      >
        <Upload />
      </TooltipButton>
      <TooltipButton
        content={'Descargar paps'}
        variant='secondary'
        onClick={() => downloadFile(documento.url, documento.public_id)}
      >
        <Download />
      </TooltipButton>
      <CircleStateBadge estado={documento.estado} />
    </div>
  )
}
