'use client'

import { ModeToggle } from '@/components/buttons/mode-toggle.button'
import { PageLoader } from '@/components/loaders/page-loader'
import { FloatingSidebar } from '@/components/sidebar/floating-sidebar'
import { Card } from '@/components/ui/card'
import { Continente, useGetAllContinentsQuery } from '@/lib/Redux/web/endpoints/locations/continentes'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// TODO: Corregir cuando funcionen los demas continentes

export default function Home() {
  const { data: continentes, isLoading, isError, status } = useGetAllContinentsQuery()
  const router = useRouter()

  console.log(status)
  if (isLoading) return <PageLoader className='h-screen' />
  if (isError || !continentes)
    throw new Error('Error con el servidor');

  return (
    <div className='relative w-full max-w-[900px] mx-auto min-h-screen flex items-center justify-center'>
      <FloatingSidebar />
      <div className='absolute top-10 right-10'>
        <ModeToggle />
      </div>
      <div className='p-10 w-full flex flex-col gap-10'>
        <h1 className='text-muted-foreground text-2xl font-bold'>
          Seleccione Un Continente
        </h1>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10'>
          {continentes.map((continente, idx) => (
            <ButtonCard
              key={idx}
              continente={continente}
              onClick={() => {
                if (continente.codigo_3 === "AMR") {
                  router.push('/' + continente.codigo_3 + '/dashboard/home')
                }
              }}
              disabled={continente.codigo_3 !== "AMR"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

type ButtonCardProps = {
  continente: Continente;
  onClick: () => void;
  disabled?: boolean;
}

function ButtonCard({ continente, onClick, disabled }: ButtonCardProps) {
  return (
    <Card
      className={cn(
        'aspect-square relative transition-all',
        disabled ? "opacity-30 cursor-not-allowed" : "hover:scale-105 cursor-pointer group"
      )}
      onClick={onClick}
    >
      <Image
        width={500}
        height={500}
        alt='continentes'
        src={'/images/continentes.webp'}
        className={cn(
          'w-full h-full aspect-square transition-all',
          !disabled && "group-hover:scale-75"
        )}
      />
      <h5 className='absolute bottom-2 left-1/2 -translate-x-1/2 font-medium text-black/80 dark:text-white/80'>
        {continente.nombre}
      </h5>
    </Card>
  )
}