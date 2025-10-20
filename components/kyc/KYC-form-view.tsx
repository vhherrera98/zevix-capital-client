import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { IngresoMensualEnum, KYCSchema, KYCSchemaType, PatrimonioAproximadoEnum, tipoDocumentosEnum, YesNoEnum } from './kyc-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel } from '../ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { InputControl } from '../inputs/input-control';
import { format } from 'date-fns';
import { regexNumber } from '@/utils/transform.utils';
import { KycFormType } from '@/types/kyc.type';
import { Badge } from '../ui/badge';
import Image from 'next/image';

export default function KYCFormView({
  data
}: {
  data: KycFormType
}) {

  const isLoading = data ? true : false;

  const form = useForm<KYCSchemaType>({
    mode: "all",
    resolver: zodResolver(KYCSchema),
    defaultValues: {
      // datos personales
      nombre_completo: data.nombre_completo,
      nacionalidad: data.nacionalidad,
      fecha_nacimiento: new Date(data.fecha_nacimiento),
      tipo_documento_identidad: data.tipo_documento_identidad,
      numero_documento: data.numero_documento, // sigue la subida de documentos
      // domicilio
      direccion_completa_residencia: data.direccion_completa_residencia, // sigue la subida de documentos
      // informacion fiscal
      residente: data.residente, // queda la subida de documentos
      // informacion economica
      fuente_fondos: ["Otro"], // vamos a mejorar el especificar
      fuente_fondos_otros: data.fuente_fondos_otros,
      ingreso_mensual: data.ingreso_mensual,
      patrimonio_aprox: data.patrimonio_aprox,
      nombre_pais_banco: data.nombre_pais_banco,
      // declaraciones legales
      actividades_ilicitas: data.actividades_ilicitas,
      actividades_ilicitas_si: data.actividades_ilicitas_si,
      declaracion_jurada_origen_fondos: data.declaracion_jurada_origen_fondos,
      // aceptacion y firma
      nombre_completo_firmante: data.nombre_completo_firmante,
      fecha_llenado_formulario: new Date(data.fecha_llenado_formulario),
      firma_electronica: data.firma_electronica
    }
  });

  const pdfViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(data.residente_documento_url)}&embedded=true`;


  return (
    <Form {...form}>
      <form
        className='grid grid-cols-1 gap-5'
      >
        <CardSection
          title='1. Datos Personales'
        >
          <FormField
            control={form.control}
            name='nombre_completo'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor='nombre_completo' className='required'>1.1 Nombre Completo</FormLabel>
                <InputControl
                  id='nombre_completo'
                  name="nombre_completo"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  fieldState={fieldState}
                  placeholder='Ingrese su nombre completo'
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='nacionalidad'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor='nacionalidad' className='required'>1.2 Nacionalidad</FormLabel>
                <InputControl
                  id='nacionalidad'
                  name="nacionalidad"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.value)}
                  fieldState={fieldState}
                  placeholder='Ingrese su nacionalidad'
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-5 col-span-1 md:col-span-2 items-start'>
            <FormField
              control={form.control}
              name='fecha_nacimiento'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='fecha_nacimiento' className='required'>
                    1.3 Fecha de Nacimiento
                  </FormLabel>
                  <Input
                    id='fecha_nacimiento'
                    type='date'
                    placeholder='Ingrese su fecha de nacimiento'
                    value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                    onChange={(event) => {
                      const date = event.target.value ? new Date(event.target.value) : undefined;
                      field.onChange(date);
                    }}
                    className={cn(fieldState && fieldState.error && "border-red-400")}
                    disabled={isLoading}
                  />

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='tipo_documento_identidad'
              render={({ field, fieldState }) => (
                <FormItem className=' overflow-hidden'>
                  <FormLabel htmlFor='tipo_documento_identidad' className='required'>
                    1.4 Tipo de Documento de Identidad
                  </FormLabel>
                  <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger
                      className={cn(
                        "w-full lg:w-full",
                        fieldState && fieldState.error && "border-red-400"
                      )}
                      disabled={isLoading}
                    >
                      <SelectValue placeholder="Seleccione el tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        tipoDocumentosEnum.options.map((op, idx) => (
                          <SelectItem key={idx} value={op}>{op}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>

                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='numero_documento'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='numero_documento' className='required'>1.5 Numero del Documento</FormLabel>
                  <InputControl
                    id='numero_documento'
                    name="numero_documento"
                    value={String(field.value)}
                    onChange={({ target: { value } }) => {
                      const result = regexNumber(value);
                      if (result !== undefined) {
                        field.onChange(String(result));
                      }
                    }}
                    fieldState={fieldState}
                    placeholder='Ingrese su numero del documento'
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />
          </div>

          {
            form.watch('tipo_documento_identidad') !== undefined &&
            <>
              <FormField
                control={form.control}
                name='documento_identidad'
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor='documento_identidad' className='required'>1.6 Subir {form.watch("tipo_documento_identidad")}</FormLabel>
                    <Image
                      src={data.documento_identidad_url}
                      alt={data.documento_identidad_public_id}
                      width={500}
                      height={500}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='selfie_documento'
                render={() => (
                  <FormItem>
                    <FormLabel htmlFor='selfie_documento' className='required'>1.7 Selfie - {form.watch("tipo_documento_identidad")} en Mano</FormLabel>
                    <Image
                      src={data.selfie_documento_url}
                      alt={data.selfie_documento_public_id}
                      width={500}
                      height={500}
                    />
                  </FormItem>
                )}
              />
            </>
          }
        </CardSection>

        <CardSection
          title='2. Domicilio'
          className='grid grid-cols-1 md:grid-cols-1 gap-5'
        >
          <FormField
            control={form.control}
            name='direccion_completa_residencia'
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor='direccion_completa_residencia'>
                  2.1 Dirección completa de residencia
                </FormLabel>
                <Textarea
                  {...field}
                  className='w-full'
                  fieldState={fieldState}
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='comprobante_domicilio'
            render={() => (
              <FormItem>
                <FormLabel htmlFor='comprobante_domicilio' className='required'>2.8 Subir Comprobante de Domicilio</FormLabel>
                <Image
                  src={data.comprobante_domicilio_url}
                  alt={data.comprobante_domicilio_public_id}
                  width={500}
                  height={500}
                />
              </FormItem>
            )}
          />
        </CardSection>

        <CardSection title='3. Información Fiscal' className='md:grid-cols-1'>
          <FormField
            control={form.control}
            name='residente'
            render={({ field, fieldState }) => (
              <FormItem className=' overflow-hidden'>
                <FormLabel htmlFor='residente' className='required'>
                  3.1 ¿Es ciudadano o residente fiscal de EE.UU.?
                </FormLabel>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className={cn(
                      "w-full lg:w-full",
                      fieldState && fieldState.error && "border-red-400"
                    )}
                    disabled={isLoading}
                  >
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      YesNoEnum.options.map((op, idx) => (
                        <SelectItem key={idx} value={op}>{op}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='residente_documento'
            render={() => (
              <FormItem
                className={cn(
                  form.watch("residente") !== undefined ? "visible" : "hidden"
                )}
              >
                <FormLabel htmlFor='residente_documento' className='required'>
                  3.2 Subir Formulario {" "}
                  {form.watch("residente") !== undefined && form.watch("residente") === 'Sí' ? "W-9" : "W-8BEN"}
                </FormLabel>
                {/* <Link
                  // href={`https://drive.google.com/file/d/${data.residente_documento_url}.pdf/preview`}
                  href={`${data.residente_documento_url}.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                {/* <Button
                  type="button"
                  variant={'outline'}
                  onClick={handleOpenPdf}
                >
                  <File />
                  Ver el formulario {form.watch("residente") !== undefined && form.watch("residente") === 'Sí' ? "W-9" : "W-8BEN"}
                </Button> */}
                {/* </Link> */}
                <iframe
                  key={data.id}
                  src={pdfViewerUrl}
                  className="w-full h-[80vh]"
                  title="Vista previa PDF"
                />
              </FormItem>
            )}
          />
        </CardSection>
        <CardSection
          title='4. Información Económica'
        >

          <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5 items-start'>
            <FormField
              control={form.control}
              name='fuente_fondos'
              render={() => (
                <FormItem>
                  <FormLabel htmlFor='fuente_fondos' className='required'>
                    4.1 Fuente de los Fondos a Invertir
                  </FormLabel>

                  <div className='flex flex-row flex-wrap gap-2'>
                    {
                      data.fuente_fondos.map((f, idx) => (
                        <Badge
                          key={idx}
                          className='rounded-full'
                        >{f}</Badge>
                      ))
                    }
                  </div>

                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fuente_fondos_otros'
              render={({ field, fieldState }) => (
                <FormItem className={
                  data.fuente_fondos.includes("Otro") ? "visible" : "hidden"
                }>
                  <FormLabel htmlFor='fuente_fondos_otros' className='required'>
                    Otro (Especificar)
                  </FormLabel>
                  <Input
                    {...field}
                    type="text"
                    fieldState={fieldState}
                    disabled={isLoading}
                  />

                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='ingreso_mensual'
            render={({ field, fieldState }) => (
              <FormItem className=' overflow-hidden'>
                <FormLabel htmlFor='ingreso_mensual' className='required'>
                  4.2 Ingreso mensual estimado (USD)
                </FormLabel>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className={cn(
                      "w-full lg:w-full",
                      fieldState && fieldState.error && "border-red-400"
                    )}
                    disabled={isLoading}
                  >
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      IngresoMensualEnum.options.map((op, idx) => (
                        <SelectItem key={idx} value={op}>{op}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='patrimonio_aprox'
            render={({ field, fieldState }) => (
              <FormItem className=' overflow-hidden'>
                <FormLabel htmlFor='patrimonio_aprox' className='required'>
                  4.3 Patrimonio Aproximado (USD)
                </FormLabel>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className={cn(
                      "w-full lg:w-full",
                      fieldState && fieldState.error && "border-red-400"
                    )}
                    disabled={isLoading}
                  >
                    <SelectValue placeholder="Seleccione una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      PatrimonioAproximadoEnum.options.map((op, idx) => (
                        <SelectItem key={idx} value={op}>{op}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nombre_pais_banco"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>4.4 Cuenta Bancaria para Depositos</FormLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder='Nombre del banco y del país'
                  fieldState={fieldState}
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />
        </CardSection>

        <CardSection title='5. Declarciones Legales'>

          <FormField
            control={form.control}
            name="actividades_ilicitas"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>5.1 ¿Está Vinculado a Actividades Ilícitas?</FormLabel>
                <Select value={field.value} onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className='w-full'
                    fieldState={fieldState}
                    disabled={isLoading}
                  >
                    <SelectValue placeholder="Seleccione una opción"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {
                      YesNoEnum.options.map((op, idx) => (
                        <SelectItem
                          key={idx}
                          value={op}>{op}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="actividades_ilicitas_si"
            render={({ field }) => (
              <FormItem
                className={cn(
                  form.watch("actividades_ilicitas") === "Sí" ? "visible" : "hidden"
                )}
              >
                <FormLabel className='hidden md:block text-transparent'>Especificar</FormLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder='(SÍ) Especificar'
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />

          <div className='col-span-1 md:col-span-2 gap-5'>
            <FormField
              control={form.control}
              name="declaracion_jurada_origen_fondos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5.2 Declaración Jurada de Origen de Fondos</FormLabel>
                  <Textarea
                    value={field.value}
                    readOnly
                    disabled={isLoading}
                  />
                </FormItem>
              )}
            />
          </div>

        </CardSection>

        <CardSection title='6. Aceptación y Firma'>
          <FormField
            control={form.control}
            name="nombre_completo_firmante"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>6.1 Nombre Completo del Firmante</FormLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder='Ingrese su nombre completo'
                  fieldState={fieldState}
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fecha_llenado_formulario"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>6.2 Fecha de Llenado del Formulario</FormLabel>
                <Input
                  value={field.value ? format(field.value, 'yyyy-MM-dd') : ''}
                  onChange={(event) => {
                    const date = event.target.value ? new Date(event.target.value) : undefined;
                    field.onChange(date);
                  }}
                  type="date"
                  placeholder='Ingrese su nombre completo'
                  fieldState={fieldState}
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firma_electronica"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>6.3 Firma Electrónica (Escriba su nombre o utilice pad de firma)</FormLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder='...'
                  fieldState={fieldState}
                  disabled={isLoading}
                />
              </FormItem>
            )}
          />
        </CardSection>

      </form>
    </Form>
  );
}


function CardSection({
  children,
  title = "",
  className = ""
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className='border-none dark:border'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={cn('grid grid-cols-1 md:grid-cols-2 items-start gap-5', className)}>
        {children}
      </CardContent>
    </Card>
  )
}