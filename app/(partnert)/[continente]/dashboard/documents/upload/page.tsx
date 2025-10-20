export const dynamic = 'force-dynamic'; // Si tu app usa headers/cookies dinámicos

import PageDocumentsPersonal from "../page";
import PageBeneficiariesByPerson from "../beneficiaries/page";

export default async function DefaultPage({
 searchParams
}: {
 searchParams: Promise<{ beneficiary: string }>
}) {

 const { beneficiary } = await searchParams;

 if (beneficiary) return <PageBeneficiariesByPerson />;
 return <PageDocumentsPersonal />;

}