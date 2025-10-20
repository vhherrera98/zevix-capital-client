import { auth } from "@/auth"
import { redirect } from 'next/navigation'

export default async function LoggedPage() {

  const session = await auth();

  if (!session) return redirect("/");
  if (session && session.user.firstSession) return redirect('/auth/settings');
  if (session && session.user.role === 'Socio') redirect("/");
    return redirect('/dashboard');
}