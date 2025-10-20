/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { PageLoader } from "@/components/loaders/page-loader";
import { useGetMeQuery, useLazyGetMeQuery } from "@/lib/Redux/web/endpoints/users/me";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function GetMeGuard({ children }: { children: React.ReactNode }) {
 // const { data, isLoading, isError } = useGetMeQuery();
 const [getProfile] = useLazyGetMeQuery();
 const { data: session, update, status } = useSession();
 const [mounted, setMounted] = useState<boolean>(false);
 // const [updated, setUpdated] = useState(false); // ⚠️ flag local

 useEffect(() => {
  if (!session) return;
  setMounted(true);
 }, [session]);

 useEffect(() => {
  if (!mounted) return;

  const updateUser = async () => {
   try {
    await getProfile()
     .then(async (res) => {
      const result = await res.data;
      await update({
       user: result
      })
     })
     .catch((err) => {
      console.log(err)
     })
   } catch (error) {
    console.error(error);
   }
  }

  updateUser();

 }, [mounted]);

 // useEffect(() => {
 //  if (!data || updated) return; // ⚠️ solo actualizar una vez

 //  const updateUser = async () => {
 //   try {
 //    const result = await update({
 //     user: {
 //      kyc: true
 //     }
 //    });
 //    setUpdated(true); // marcamos que ya se actualizó
 //    console.log(result)
 //   } catch (error) {
 //    console.error("Error actualizando sesión:", error);
 //   }
 //  };

 //  updateUser();
 // }, [data, updated, update]);

 if (status === 'loading') {
  return (
   <main className="w-full min-h-screen flex items-center justify-center">
    <PageLoader />
   </main>
  );
 }

 if (!session) throw new Error("Error al recuperar data");

 return <>{children}</>;
}
