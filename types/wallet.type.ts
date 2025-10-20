export type PersonalWallet = {
 id: number;
 persona_id: number;
 voucher_id: number;
 monto: number;
 created_at: string;
 total: number;
}

export type AllPeronsalWallet = {
 persona: {
  id: number;
  nombres: string;
  email: string;
 }
} & PersonalWallet;