/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PageLoader } from "@/components/loaders/page-loader";
import { ModalDialog } from "@/components/modal";
import { DataTable } from "@/components/table/data-table";
import { ContainerCell } from "@/components/table/data-table-cell";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { useGetAllDocumentsBeneficiariesRequestsQuery } from "@/lib/Redux/web/endpoints/documents/persons";
import { useChangeStateDocumentMutation } from "@/lib/Redux/web/endpoints/documents/requests";
import { Documento } from "@/types/documents.type";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export default function PageRequestsBeneficiariesDocuments() {

 const router = useRouter();

 const { data, isLoading, isError } = useGetAllDocumentsBeneficiariesRequestsQuery();
 if (isLoading) return <PageLoader />
 if (isError || !data) throw new Error('Error con el servidor');
 const { data: documents } = data;

 const columns: ColumnDef<Documento>[] = [
  {
   accessorFn: (row) => `${row.persona.nombres} ${row.persona.apellidos}`,
   accessorKey: "personaCompleto",
   header: ({ column }) => (
    <DataTableColumnHeader column={column} title={"Persona"} />
   ),
   cell: ({ row }) => (
    <ContainerCell>{row.getValue("personaCompleto")}</ContainerCell>
   ),
   meta: { label: "Persona" }
  },
  {
   accessorFn: (row) => `${row.beneficiario.nombres} ${row.beneficiario.apellidos}`,
   accessorKey: "beneficiarioCompleto",
   header: ({ column }) => (
    <DataTableColumnHeader column={column} title={"Beneficiario"} />
   ),
   cell: ({ row }) => (
    <ContainerCell>{row.getValue("beneficiarioCompleto")}</ContainerCell>
   ),
   meta: { label: "Beneficiario" },
  },
  {
   accessorFn: (row) => row.tipo_documento.nombre,
   accessorKey: "documento",
   header: ({ column }) => <DataTableColumnHeader column={column} title={"Documento"} />,
   cell: ({ row }) => <ContainerCell>{row.getValue("documento")}</ContainerCell>,
   meta: { label: "Documento" }
  },
  {
   accessorFn: (row) => row.fecha_creacion,
   accessorKey: "fecha_creacion",
   header: ({ column }) => <DataTableColumnHeader column={column} title={"Fecha De Subida"} />,
   cell: ({ row }) => <ContainerCell>{row.getValue("fecha_creacion")}</ContainerCell>,
   meta: { label: "Fecha De Subida" }
  },
  {
   accessorKey: "action",
   header: ({ column }) => <DataTableColumnHeader column={column} title={"Ver Documento"} />,
   cell: ({ row }) => <ModalView documento={row.original} />,
   meta: { label: "Ver Documento" }
  },
 ];

 return (
  <div className="grid grid-cols-1 gap-5">
   <div className='flex flex-row items-center justify-between'>
    <h1 className="text-2xl font-bold">Documentos (Solicitudes, Beneficiarios)</h1>
    <Button
     type="button"
     className="btn-primary"
     onClick={() => router.push("/dashboard/documents/requests")}
    >
     Usuarios
    </Button>
   </div>
   <DataTable data={documents} columns={columns} />
  </div>
 )
}


function ModalView({ documento }: { documento: Documento }) {

 const [changeState, { isLoading }] = useChangeStateDocumentMutation();
 const { data } = useSession();

 const disabled = useMemo(() => {
  if (!data || !documento) return false;

  const userId = data.user.id;
  const verificaciones = documento.verificacion;

  const yaVerificadoPorUsuario = verificaciones.some(
   (v: any) => v.persona_id === userId
  );
  return yaVerificadoPorUsuario;
 }, [data, documento]);

 const submit = async (state: number) => {
  try {
   await changeState({
    estadoId: state,
    documentoId: documento.id
   })
    .unwrap()
    .then((response) => {
     toast(response.data || response.message);
     setOpen(false);
    });
  } catch (error) {
   const err = error as FetchBaseQueryError | SerializedError;

   const message =
    'data' in err && typeof err.data === 'object' && err.data !== null && 'message' in err.data
     ? (err.data as { message: string }).message
     : 'INTERNAL ERROR';

   toast(message);
  }
 }

 const pdfViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(documento.url)}&embedded=true`;
 const [open, setOpen] = useState<boolean>(false);

 return (
  <ModalDialog
   open={open}
   setOpen={setOpen}
   trigger={<Button size={'icon'} onClick={() => setOpen(true)}><Eye /></Button>}
   className="md:max-w-[800px]"
   title={documento.persona.nombres + " " + documento.persona.apellidos || ""}
   description={documento.tipo_documento.nombre + " (" + documento.fecha_creacion + ")"}
  >
   <div className="flex flex-col gap-5">
    <div className="flex flex-row items-center justify-start gap-2">
     <Button
      type="button"
      disabled={isLoading || disabled}
      onClick={() => submit(4)}
     >
      Aceptar
     </Button>
     <Button
      type="button"
      variant={'destructive'}
      onClick={() => setOpen(false)}
      disabled={isLoading}
     >
      Rechazar
     </Button>
    </div>
    <iframe
     src={pdfViewerUrl}
     className="w-full h-[80vh]"
     title="Vista previa PDF"
    />
   </div>
  </ModalDialog>
 );
}