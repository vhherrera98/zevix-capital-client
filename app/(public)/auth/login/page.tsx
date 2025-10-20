// import { GalleryVerticalEnd } from "lucide-react"
import Logo from '@/public/images/ico.png';
import IKATBOT from '@/public/images/IKATBOT-NEGRO.png';
import Image from "next/image"
import { LoginForm } from '../_components/forms/login.form';
import { LanguageChange } from '@/components/buttons/lang.button';
import { ModeToggle } from '@/components/buttons/mode-toggle.button';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {

  const session = await auth();
  if(session) return redirect("/auth/logged");

  // Modificando a traves del remoto!!!

  // Comentando desde el origen

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-row items-center justify-between gap-2 ">
          <Image src={Logo} alt="Logo" width={150} height={50} className='dark:invert' />
          <div className='flex flex-row items-center justify-center gap-2'>
            <LanguageChange />
            <ModeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <div className='w-full h-full flex items-center justify-center'>
          <Image src={IKATBOT} alt="Logo" width={500} height={100} className='dark:invert' />
        </div>
      </div>
    </div>
  )
}
