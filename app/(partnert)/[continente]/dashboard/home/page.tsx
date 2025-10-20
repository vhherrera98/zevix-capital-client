import { swr } from '@/services/fetch.service'
import Link from 'next/link';
import React from 'react'
import { RevenueCard } from '@/components/cards/revenue.card';
import { getLangFromCookie } from '@/utils/getLang.server';
import { getTranslations } from '@/i18n/translate';
import { AllPeronsalWallet, PersonalWallet } from '@/types/wallet.type';
import { RecentIncomesTable, RecentIncomesTotal } from '@/components/tables/recent-incomes.table';

export default async function PageHomePartner() {

  const lang = await getLangFromCookie();
  const { t } = await getTranslations(lang, ['home'])

  const [cartera_total, cartera_personal] = await Promise.all([
    swr<AllPeronsalWallet[]>("/wallets/all "),
    swr<PersonalWallet[]>("/wallets/personal"),
  ]);

  if (!cartera_total || !cartera_personal) throw new Error("Error al obtener la cartera");

  return (
    <main className="grid grid-cols-1 gap-5">

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2">

        <RevenueCard
          label={t("home_total")}
          amount={cartera_total[0]?.total || 0}
          date={cartera_total[0]?.created_at || ""}
          className="col-span-1"
        />

        <Link href="/dashboard/investments/all">
          <RevenueCard
            label={t("home_totalPersonal")}
            amount={cartera_personal[0]?.total || 0}
            date={cartera_personal[0]?.created_at || ""}
            className="col-span-1"
          />
        </Link>

        <div className='col-span-1 md:col-span-2'>
          <RecentIncomesTable incomes={cartera_personal} />
        </div>

        <div className='col-span-1 md:col-span-2'>
          <RecentIncomesTotal incomes={cartera_total} />
        </div>

      </section>
    </main>
  )
}
