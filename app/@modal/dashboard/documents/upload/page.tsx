'use client'
import { redirect, useParams } from 'next/navigation'

export default function PageUploadModal () {
  const params = useParams()
  const continente = params.continente as string

  if (continente)
    return redirect(`/${continente}/dashboard/documents/upload/passport`)
  return redirect('/dashboard/documents')
}
