import { swr } from '@/services/fetch.service'
import Link from 'next/link';
import React from 'react'
import { getLangFromCookie } from '@/utils/getLang.server';
import { getTranslations } from '@/i18n/translate';
import { PersonalWallet } from '@/types/wallet.type';
import { RecentIncomesTable } from '@/components/tables/recent-incomes.table';
import { RevenueCard } from '@/components/cards/revenue.card';

export default async function PageHomeClient() {

  const lang = await getLangFromCookie();
  const { t } = await getTranslations(lang, ['home'])

  const [cartera_personal] = await Promise.all([
    swr<PersonalWallet[]>("/wallets/personal"),
  ]);

  if (!cartera_personal) return "Loading...";

  return (
    <main className="grid grid-cols-1 gap-5">

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <Link href="/dashboard/investments/all">
          <RevenueCard
            label={t("home_totalPersonal")}
            amount={cartera_personal[0]?.total || 0}
            date={cartera_personal[0]?.created_at || new Date().toDateString()}
            className="col-span-1"
          />
        </Link>

        <div className='col-span-1 md:col-span-2'>
          <RecentIncomesTable incomes={cartera_personal} />
        </div>


      </section>
    </main>
  )
}
