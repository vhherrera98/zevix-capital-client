"use client";
import { InputControl } from '@/components/inputs/input-control';
import { PageLoader } from '@/components/loaders/page-loader';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Form, FormField } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { useFindPersonByCookieQuery, useRequestChangePasswordMutation, useSignupMutation } from '@/lib/Redux/web/endpoints/users/settings';
import { login } from '@/services/login.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { AlertCircleIcon, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const REGEXP_ONLY_DIGITS = "^\\d+$";

const PasswordsSchema = z.object({
 currentPassword: z.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
  .min(8, "La contraseña debe tener mínimo 8 carácteres"),
 newPassword: z.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
  .min(8, "La nueva contraseña debe tener mínimo 8 carácteres"),
 confirmNewPassword: z.string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d\S]{6,}$/, "La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número")
  .min(8, "La nueva contraseña debe tener mínimo 8 carácteres")
})
 .refine(data => data.currentPassword !== data.newPassword, {
  message: "Las contraseña actual es igual a la nueva contraseña",
  path: ['newPassword']
 })
 .refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Las contraseñas no coinciden",
  path: ['confirmNewPassword']
 });

export type Passwords = z.infer<typeof PasswordsSchema>;

export default function PagePassword() {

 const { data: user, isLoading, isError } = useFindPersonByCookieQuery();
 const [showPasswords, setShowPasswords] = useState<boolean>(false);
 const [step, setStep] = useState<'loading' | 'one' | 'two'>('one');
 const [code, setCode] = useState<number>(0);

 const [requestChangePassword, { error: errorStepOne }] = useRequestChangePasswordMutation();
 const [finishSignup, { error: errorStepTwo, isLoading: sendingCode }] = useSignupMutation();

 const formPass = useForm<Passwords>({
  mode: "all",
  resolver: zodResolver(PasswordsSchema),
  defaultValues: {
   currentPassword: "RUQyC0hn",
   newPassword: "A123456789a",
   confirmNewPassword: "A123456789a"
  } as Passwords
 })

 const requestPasswordChange = async (data: Passwords) => {
  try {
   setStep('loading');
   await requestChangePassword(data)
    .unwrap()
    .then(() => {
     setStep("two");
    })
  } catch (error) {
   console.log(error);
   setStep("one");
  }
 }

 const signup = async () => {
  try {
   await finishSignup({
    ...formPass.getValues(),
    code
   })
    .unwrap()
    .then(() => {
     setTimeout(async () => {
      await login({
       password: formPass.getValues().newPassword,
       email: user?.email || "",
      })
       .then(((response) => {
        if (response) {
         if (response.status !== 'success') return;
         window.location.href = "/auth/logged";
        }
       }))
     }, 1000)
    })
  } catch (error) {
   console.log(error);
   // setStep("one");
  }
 }

 if (isLoading || step === 'loading') return <PageLoader />;
 if (isError || !user) throw new Error('Error con el servidor');;

 if (step === 'two') {
  return (
   <div className='grid grid-cols-1 gap-5'>

    <AlertMessage error={errorStepTwo} />

    <div className="flex items-center justify-center">
     <InputOTP
      maxLength={6}
      pattern={REGEXP_ONLY_DIGITS}
      onChange={(value) => setCode(Number(value))}
     >
      <InputOTPGroup>
       <InputOTPSlot index={0} />
       <InputOTPSlot index={1} />
       <InputOTPSlot index={2} />
       <InputOTPSlot index={3} />
       <InputOTPSlot index={4} />
       <InputOTPSlot index={5} />
      </InputOTPGroup>
     </InputOTP>
    </div>

    <div className='grid grid-cols-1 gap-2'>
     <p className='text-xs text-muted-foreground'>Se ha enviado un codigo a tu correo electronico el cual deberas ingresar para poder cambiar la contrasena.</p>
     <p className='text-muted-foreground text-xs font-bold'>Aun no has recibido el correo?</p>
     <Button
      type='button'
      size={'sm'}
      variant={'link'}
      className='w-full text-left flex items-start justify-start'
      onClick={() => requestChangePassword(formPass.getValues())}
      disabled={sendingCode}
     >
      Reenviar codigo
     </Button>
    </div>

    <div className='flex flex-row gap-2 flex-wrap'>
     <Button
      type="button"
      className='flex-1'
      variant={'destructive'}
      onClick={() => setStep("one")}
      disabled={sendingCode}
     >Volver</Button>
     <Button
      type="button"
      className='flex-1'
      disabled={String(code).length !== 6 || sendingCode}
      onClick={signup}
     >Cambiar Datos</Button>
    </div>
   </div>
  )
 }

 return (
  <Form {...formPass}>
   <form
    className='grid grid-cols-1 gap-5'
    onSubmit={formPass.handleSubmit(requestPasswordChange)}
   >

    <AlertMessage error={errorStepOne} />

    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
     <div className='grid grid-cols-1 gap-1'>
      <Label className='text-xs'>Nombre(s)</Label>
      <Input value={user.persona.nombres} disabled />
     </div>
     <div className='grid grid-cols-1 gap-1'>
      <Label className='text-xs'>Apellido(s)</Label>
      <Input value={user.persona.apellidos} disabled />
     </div>
    </div>

    <div className='grid grid-cols-1 gap-1'>
     <Label className='text-xs'>Correo Electronico</Label>
     <Input value={user.email} disabled />
    </div>

    <div className='grid grid-cols-1 gap-5'>

     <FormField
      control={formPass.control}
      name="currentPassword"
      render={({ field, fieldState }) => (
       <InputControl
        label='Contrasena Actual'
        placeholder='Ingrese la contrasena actual'
        value={field.value}
        onChange={(event) => field.onChange(event.target.value)}
        fieldState={fieldState}
        type={showPasswords ? "text" : "password"}
        className='mr-1'
        action={
         <Button
          type='button'
          size={'icon'}
          onClick={() => setShowPasswords(prev => !prev)}
         >
          {
           showPasswords
            ?
            <EyeOff />
            :
            <Eye />
          }
         </Button>
        }
       />
      )}
     />

     <FormField
      control={formPass.control}
      name="newPassword"
      render={({ field, fieldState }) => (
       <InputControl
        label='Nueva Contrasena'
        placeholder='Ingrese la nueva contrasena'
        value={field.value}
        onChange={(event) => field.onChange(event.target.value)}
        fieldState={fieldState}
        type={showPasswords ? "text" : "password"}
       />
      )}
     />

     <FormField
      control={formPass.control}
      name="confirmNewPassword"
      render={({ field, fieldState }) => (
       <InputControl
        label='Confirmar nueva Contrasena'
        placeholder='Confirme la nueva contrasena'
        value={field.value}
        onChange={(event) => field.onChange(event.target.value)}
        fieldState={fieldState}
        type={showPasswords ? "text" : "password"}
       />
      )}
     />

    </div>

    <Button
     type='submit'
    >
     Solicitar cambio de constrasena
    </Button>

   </form>
  </Form>
 )
}

function AlertMessage({
 error
}: {
 error: unknown
}) {

 const err = error as FetchBaseQueryError | SerializedError;
 const message =
  typeof err !== 'undefined' && 'data' in err && typeof err.data === 'object' && err.data !== null && 'message' in err.data
   ? (err.data as { message: string }).message
   : 'INTERNAL ERROR';

 if (!message || typeof err === 'undefined') return null;

 return (
  <Alert
   variant="destructive"
   className='bg-red-500/5'
  >
   <AlertCircleIcon />
   <AlertTitle>{message}</AlertTitle>
  </Alert>
 );
}