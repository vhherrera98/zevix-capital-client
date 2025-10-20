/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { toast } from "sonner";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

type ErrorType = FetchBaseQueryError | SerializedError | undefined;

function extractMessage(error: ErrorType): string | null {
 if (!error) return null;

 if ("status" in error && "data" in error) {
  const data = error.data;

  if (typeof data === "object" && data !== null && "message" in data) {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const message = (data as any).message;
   if (typeof message === "string") return message;
  }

  if (typeof data === "string") {
   return data;
  }

  return "Ocurrió un error en la petición.";
 }

 if ("message" in error && typeof error.message === "string") {
  return error.message;
 }

 return "Error desconocido.";
}

export function useErrorToast(error: ErrorType) {
 useEffect(() => {
  const message = extractMessage(error);
  if (message) {
   toast.error(message);
  }
 }, [error]);
}


// SUCESS
type SuccessResponse = {
 statusCode?: number;
 status?: string;
 message?: string;
 data?: string;
} | undefined;

export function useSuccessToast(response: SuccessResponse | undefined, redirect?: boolean | string) {
 const router = useRouter();

 useEffect(() => {
  if (!response) return;

  const isSuccess = response.status === "success";
  const message = typeof response.data === 'string' ? response.data : response.message;

  if (isSuccess && message) {
   console.log(response)
   toast.success(message);

   if (redirect === true) {
    router.back();
   } else if (typeof redirect === "string") {
    router.push(redirect);
   }
  }
 }, [response, redirect, router]);
}