import { KYCSchemaType } from "@/components/kyc/kyc-schema";
import { Persona } from "./usuario.type";

export type KycFormType = KYCSchemaType & {
 id: number;
 documento_identidad_public_id: string;
 documento_identidad_url: string;
 selfie_documento_public_id: string;
 selfie_documento_url: string;
 comprobante_domicilio_public_id: string;
 comprobante_domicilio_url: string;
 residente_documento_public_id: string;
 residente_documento_url: string;
 created_at: string;
 updated_at: string;
};

export type KycPersonaType = {
 id: number;
 id_persona: number;
 id_kyc_form: number;
 kyc: KycFormType;
 persona: Persona;
};
