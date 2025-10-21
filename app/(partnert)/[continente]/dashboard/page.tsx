import { redirect } from 'next/navigation';

export default async function page({
  params
}: {
  params: Promise<{ continente: string }>
}) {

  const { continente } = await params;
  return redirect("/" + continente + "/dashboard/home");
}
