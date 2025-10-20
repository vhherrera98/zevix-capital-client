import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { fuenteFondosEnum, IngresoMensualEnum, KYCSchema, KYCSchemaType, PatrimonioAproximadoEnum, tipoDocumentosEnum, YesNoEnum } from './kyc-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { cn } from '@/lib/utils';
import { InputControl } from '../inputs/input-control';
import { format } from 'date-fns';
import { regexNumber } from '@/utils/transform.utils';
import { InputFileControl } from '../inputs/input-file-control';
import { AlertCircleIcon, File } from 'lucide-react';
import { MultiSelectSearch } from '../inputs/multi-select.input';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '../ui/alert';
import { useSession } from 'next-auth/react';
import { PageLoader } from '../loaders/page-loader';
import { useUploadKycInfoMutation } from '@/lib/Redux/web/endpoints/kyc/upload';
import { toast } from 'sonner';
import { errorMessage } from '@/utils/error-message.utils';
import { useRouter } from 'next/navigation';

export default function KYCForm() {

  const router = useRouter();

  const { data: userData, status, update } = useSession();
  const [uploadKycHandler, { isLoading }] = useUploadKycInfoMutation();

  const form = useForm<KYCSchemaType>({
    mode: "all",
    resolver: zodResolver(KYCSchema),
    defaultValues: {
      // datos personales
      nombre_completo: "",
      nacionalidad: "Boliviana",
      fecha_nacimiento: new Date("10-30-1998"),
      tipo_documento_identidad: "Carnet de Identidad",
      numero_documento: "8869832", // sigue la subida de documentos
      // domicilio
      direccion_completa_residencia: "Avenida el Dorado, B. 26 de Septiembre", // sigue la subida de documentos
      // informacion fiscal
      residente: "Sí", // queda la subida de documentos
      // informacion economica
      fuente_fondos: ["Otro"], // vamos a mejorar el especificar
      fuente_fondos_otros: "",
      ingreso_mensual: "$5000 - $10000",
      patrimonio_aprox: "$50000 - $250000",
      nombre_pais_banco: "BBVA - Argentina",
      // declaraciones legales
      actividades_ilicitas: "Sí",
      actividades_ilicitas_si: "Trata de personas 😂",
      declaracion_jurada_origen_fondos: "Declaro bajo juramento que los fondos que transfiero a Zevix Capital LLC provienen de actividades lícitas, y no están vinculados con lavado de dinero, narcotráfico, fraude, evasión fiscal u otras actividades ilegales. Acepto que cualquier falsedad o inconsistencia puede dar lugar al rechazo de mi inversión y al cierre de mi cuenta.",
      // aceptacion y firma
      nombre_completo_firmante: "Victor Hugo Herrera Taborga",
      fecha_llenado_formulario: new Date("07-29-2025"),
      firma_electronica: "victoriano"
    }
  });

  const [fuenteOtroValue, setFuenteOtroValue] = useState<boolean>(false);
  const [actividadesIlicitasValue, setActividadesIlicitasValue] = useState<boolean>(false);

  useEffect(() => {
    if (status !== 'authenticated') return;
    if (!userData?.user) return;
    form.setValue("nombre_completo", userData.user.name);
    form.setValue("nombre_completo_firmante", userData.user.name);
    form.setValue("firma_electronica", userData.user.name);
  }, [userData, status, form])

  const submit = async (data: KYCSchemaType) => {
    if (data.fuente_fondos.includes("Otro") && !data.fuente_fondos_otros) {
      setFuenteOtroValue(true);
      return;
    }

    setFuenteOtroValue(false);
    if (data.actividades_ilicitas === 'Sí' && !data.actividades_ilicitas_si) {
      setActividadesIlicitasValue(true);
      return;
    }

    setActividadesIlicitasValue(false);
    uploadKycHandler(data)
      .unwrap()
      .then(async (response) => {
        toast.success(typeof response.data === 'string' ? response.data : response.message);
        await update({
          kyc: true
        });
        router.back();
      })
      .catch((err) => {
        toast.error(errorMessage(err));
      })
  }

  if (status === 'loading') return <PageLoader />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
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
                  <FormMessage className='text-xs text-right -mt-1' />
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
                  <FormMessage className='text-xs text-right -mt-1' />
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
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor='documento_identidad' className='required'>1.6 Subir {form.watch("tipo_documento_identidad")}</FormLabel>
                    <InputFileControl
                      value={field.value}
                      onChange={(event) => field.onChange(event)}
                      name='documento_identidad'
                      accept="image/png, image/jpeg, image/jpg"
                      className={cn(fieldState && fieldState.error && "border-red-400")}
                      disabled={isLoading}
                    />
                    <FormMessage className='text-right' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='selfie_documento'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel htmlFor='selfie_documento' className='required'>1.7 Selfie - {form.watch("tipo_documento_identidad")} en Mano</FormLabel>
                    <InputFileControl
                      value={field.value}
                      onChange={(event) => field.onChange(event)}
                      name='selfie_documento'
                      accept="image/png, image/jpeg, image/jpg"
                      className={cn(fieldState && fieldState.error && "border-red-400")}
                      disabled={isLoading}
                    />
                    <FormMessage className='text-right' />
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
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor='comprobante_domicilio' className='required'>2.8 Subir Comprobante de Domicilio</FormLabel>
                <InputFileControl
                  value={field.value}
                  onChange={(event) => field.onChange(event)}
                  name='comprobante_domicilio'
                  accept="image/png, image/jpeg, image/jpg"
                  className={cn(fieldState && fieldState.error && "border-red-400")}
                  disabled={isLoading}
                />
                <FormMessage className='text-right' />
              </FormItem>
            )}
          />
        </CardSection>

        <CardSection title='3. Información Fiscal'>
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
                <FormMessage className='text-xs text-right -mt-1' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='residente_documento'
            render={({ field, fieldState }) => (
              <FormItem
                className={cn(
                  form.watch("residente") !== undefined ? "visible" : "hidden"
                )}
              >
                <FormLabel htmlFor='residente_documento' className='required'>
                  3.2 Subir Formulario {" "}
                  {form.watch("residente") !== undefined && form.watch("residente") === 'Sí' ? "W-9" : "W-8BEN"}
                </FormLabel>
                <InputFileControl
                  value={field.value}
                  onChange={(event) => field.onChange(event)}
                  name='residente_documento'
                  accept="application/pdf"
                  className={cn(fieldState && fieldState.error && "border-red-400")}
                  icon={<File />}
                  disabled={isLoading}
                />
                <FormMessage className='text-right' />
              </FormItem>
            )}
          />
        </CardSection>
        <CardSection title='4. Información Económica'>

          <Alert
            variant={'destructive'}
            className={cn(
              'col-span-1 md:col-span-2 bg-red-400/10',
              fuenteOtroValue ? "visible" : "hidden"
            )}
          >
            <AlertCircleIcon />
            <AlertTitle>Debe especificar el campo <strong>(otro)</strong>.</AlertTitle>
          </Alert>

          <div className='col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5'>
            <FormField
              control={form.control}
              name='fuente_fondos'
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel htmlFor='fuente_fondos' className='required'>
                    4.1 Fuente de los Fondos a Invertir
                  </FormLabel>
                  <MultiSelectSearch
                    options={fuenteFondosEnum.options.map((item) => ({
                      label: item,
                      value: item
                    })) || []}
                    selected={field.value}
                    onChange={(values) => {
                      if (values.includes('Otro')) {
                        field.onChange(values.filter((v) => v === 'Otro'));
                      } else {
                        field.onChange(values);
                      }
                    }}
                    placeholder='Seleccione opciones'
                    fieldState={fieldState}
                    disabled={isLoading}
                  />

                  <FormMessage className='text-right' />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fuente_fondos_otros'
              render={({ field, fieldState }) => (
                <FormItem className={
                  form.watch("fuente_fondos").includes("Otro") ? "visible" : "hidden"
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
                  <FormMessage className='text-right' />
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
                <FormMessage className='text-xs text-right -mt-1' />
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
                <FormMessage className='text-xs text-right -mt-1' />
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

          <Alert
            variant={'destructive'}
            className={cn(
              'col-span-1 md:col-span-2 bg-red-400/10',
              actividadesIlicitasValue ? "visible" : "hidden"
            )}
          >
            <AlertCircleIcon />
            <AlertTitle>Debe especificar el porque selecciono Sí en el punto 5.1.</AlertTitle>
          </Alert>

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

        <Button
          type="submit"
          className='w-fit ml-auto'
          disabled={isLoading}
        >
          Enviar Formulario
        </Button>

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
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className={cn('grid grid-cols-1 md:grid-cols-2 items-start gap-5', className)}>
        {children}
      </CardContent>
    </Card>
  )
}