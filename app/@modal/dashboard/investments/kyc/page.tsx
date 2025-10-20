"use client";

import KYCForm from "@/components/kyc/KYC-form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function KYCPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.kyc) {
      router.replace('/dashboard/investments')
    }
  }, [status, session, router])

  if (status === 'loading') return <div>Cargando...</div>


  return (
    <KYCForm />
  )

}