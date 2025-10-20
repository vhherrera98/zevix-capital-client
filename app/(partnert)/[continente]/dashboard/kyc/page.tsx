"use client";
import { PageLoader } from '@/components/loaders/page-loader';
import { DataTable } from '@/components/table/data-table';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { Button } from '@/components/ui/button';
import { useGetAllKycPersonas } from '@/lib/Redux/web/endpoints/kyc-persona/get-all';
import { KycPersonaType } from '@/types/kyc.type';
import { ColumnDef } from '@tanstack/react-table';
import { Info } from 'lucide-react';
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog"
import React, { useState } from 'react'
import KYCFormView from '@/components/kyc/KYC-form-view';
import { Badge } from '@/components/ui/badge';

export default function KYCPage() {

 const { data: kycPersonas, isLoading, isError } = useGetAllKycPersonas();
 const [item, setItem] = useState<KycPersonaType['kyc'] | null>(null);

 if (isLoading) return <PageLoader />;
 if (isError || !kycPersonas) throw new Error("Error al recuperar los datos!");

 const columns: ColumnDef<KycPersonaType>[] = [
  {
   id: "verificado",
   accessorFn: row => row.persona.verificado,
   header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
   cell: ({ row }) => {
    const { verificado } = row.original.persona;
    if (verificado) return <Badge variant={'success'} className='rounded-full'>Verificado</Badge>
    return <Badge variant={'destructive'} className='rounded-full'>No verificado</Badge>
   }
  },
  {
   accessorKey: "persona",
   header: ({ column }) => <DataTableColumnHeader column={column} title="Persona" />,
   cell: ({ row }) => {
    const persona = row.original.persona;
    const fullname = persona.nombres + " " + persona.apellidos;
    return fullname;
   }
  },
  {
   accessorKey: "kyc",
   header: ({ column }) => <DataTableColumnHeader column={column} title="Tipo de Documento" />,
   cell: ({ row }) => {
    const kyc = row.original.kyc;
    return kyc.tipo_documento_identidad;
   }
  },
  {
   id: "numero_documento",
   header: ({ column }) => <DataTableColumnHeader column={column} title="Numero de Documento" />,
   cell: ({ row }) => {
    const kyc = row.original.kyc;
    return kyc.numero_documento;
   }
  },
  {
   id: "nacionalidad",
   header: ({ column }) => <DataTableColumnHeader column={column} title="Nacionalidad" />,
   cell: ({ row }) => {
    const kyc = row.original.kyc;
    return kyc.nacionalidad;
   }
  },
  {
   id: 'actions',
   enableHiding: false,
   cell: ({ row }) => {
    return (
     <Button
      type="button"
      size={'icon'}
      variant={'secondary'}
      onClick={() => setItem(row.original.kyc)}
     >
      <Info />
     </Button>
    )
   }
  }
 ];

 return (
  <div>
   <DataTable columns={columns} data={kycPersonas} />

   {
    item
    &&
    <Dialog
     open={!!item}
     onOpenChange={() => setItem(null)}
     key={item?.id}
    >
     <DialogContent className="w-full sm:max-w-full h-full sm:max-h-full flex flex-col bg-gray-100 dark:bg-background">
      <DialogHeader>
       <DialogTitle>{item?.nombre_completo}</DialogTitle>
       <DialogDescription>
        Formulario KYC
       </DialogDescription>
      </DialogHeader>
      <div className='flex-1 overflow-y-auto'>
       <KYCFormView data={item} />
      </div>
      <DialogFooter>
       <DialogClose asChild>
        <Button variant="outline">Cancelar</Button>
       </DialogClose>
       <Button
        type='button'
        variant={'success'}
       >
        Aprobar
       </Button>
      </DialogFooter>
     </DialogContent>
    </Dialog>
   }

  </div>
 )
}
