"use client";

import { WifiOff } from "lucide-react"; // icono de shadcn/lucide
import { Button } from "@/components/ui/button";

export default function NoInternet() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900">
      <WifiOff className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold">Sin conexión a internet</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Por favor, revisa tu conexión e inténtalo de nuevo.
      </p>
      <Button onClick={() => location.reload()} className="mt-6">
        Reintentar
      </Button>
    </div>
  );
}
