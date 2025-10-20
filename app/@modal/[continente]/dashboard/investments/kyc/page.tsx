/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import KYCForm from "@/components/kyc/KYC-form";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KYCPage() {

  const params = useParams()
  const continente = params.continente as string
  const baseHref = (continente ? `/${continente}` : '');

  const { data: session, status } = useSession()
  const router = useRouter()


  useEffect(() => {
    if (status === 'authenticated' && session?.user?.kyc) {
      router.replace(baseHref + '/dashboard/investments')
    }
  }, [status, session, router])

  if (status === 'loading') return <div>Cargando...</div>

  return (
    <KYCForm />
  )

}