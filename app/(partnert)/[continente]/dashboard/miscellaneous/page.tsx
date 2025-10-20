"use client";

import { Button } from '@/components/ui/button';
import { useExtendedVisibility } from '@/hooks/use-page-visibility';
import { useSonner } from '@/hooks/use-sonner';
import React, { useEffect, useState } from 'react'

export default function PageMiscellaneous() {

  const { success, dismiss, error, info, show, warning } = useSonner();
  const { hasFocus } = useExtendedVisibility();

  const [estados, setEstados] = useState<string[]>([]);

  useEffect(() => {
    const currentValue = hasFocus ? "Volviste" : "Te saliste";
    setEstados(prev => [...prev, currentValue])
  }, [hasFocus])

  const handleShow = () => {
    dismiss();
    // const id = show({ title: "Procesando...", duration: Infinity });
    // // guardamos el id
    // setTimeout(() => {
    //   dismiss(id); // lo cerramos manualmente
    // }, 500);
  };

  return (
    <div>
      <h1 className="text-2xl">
        Sonner custom hook test
      </h1>
      <Button
        variant={'success'}
        onClick={() => success("Todo salió bien 🎉")}
      >
        Success
      </Button>
      <Button
        variant={'default'}
        onClick={() => error({ title: "Error", text: "Algo salió mal" })}
      >
        error
      </Button>
      <Button
        variant={'default'}
        onClick={() => info("Info importante")}
      >
        info
      </Button>
      <Button
        variant={'default'}
        onClick={() => warning("Ten cuidado ⚠️")}
      >
        warning
      </Button>

      <Button
        variant={'default'}
        onClick={() => show({ text: "Color custom", color: "#0ea5e9" })}
      >
        Show
      </Button>
      <Button onClick={handleShow}>Mostrar y cerrar</Button>

      <ul>
        {
          estados.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))
        }
      </ul>
    </div>
  )
}
