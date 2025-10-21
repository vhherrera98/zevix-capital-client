import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css';
import Logo from '@/public/images/ico.png';
import { getLangFromCookie } from '@/utils/getLang.server'
import { getTranslations } from '@/i18n/translate'
import { I18nProvider } from '@/context/i18n-context'
import { ThemeProvider } from '@/components/theme-provider'
import { SessionProvider } from 'next-auth/react'
import StoreProvider from '@/context/store.provider'
import { Toaster } from 'sonner'
import OnlineGuard from '@/guards/online-guard'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "Zevix Capital",
  description:
    "Gestiona de forma segur y eficiente tu fondo de inversión cerrado. Plataforma MVP con acceso exclusivo para socios y clientes, control de fondos, contratos, notificaciones y más.",
  icons: [
    { rel: 'icon', url: Logo.src }
  ],
  keywords: [
    "fondo de inversión cerrado",
    "gestión de fondos",
    "plataforma de inversión",
    "MVP financiero",
    "software para fondos",
    "fintech",
    "gestión de clientes",
    "automatización financiera",
    "Stripe integración",
    "Neteller pagos",
    "panel de socios",
    "panel de clientes",
  ],
  authors: [{ name: "Zevix Capital", url: "https://zevixcapital.com" }],
  creator: "Tu Empresa o Victor Hugo Herrera Taborga",
  publisher: "Tu Empresa",
  openGraph: {
    title: "Plataforma de Gestión de Fondo de Inversión Cerrado - MVP",
    description:
      "Una solución segura, escalable y transparente para la administración de fondos de inversión cerrados. Ideal para socios y clientes.",
    url: "https://zevixcapital.com",
    siteName: "Gestión de Fondo de Inversión",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://zevixcapital.com",
        width: 1200,
        height: 630,
        alt: "Panel de Gestión de Fondos de Inversión",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gestión de Fondo de Inversión Cerrado - MVP",
    description:
      "Control total para socios. Claridad para clientes. Plataforma segura y escalable para gestionar fondos de inversión cerrados.",
    creator: "@tuusuario",
    images: ["https://zevixcapital.com"],
  },
  metadataBase: new URL("https://zevixcapital.com"),
  alternates: {
    canonical: "https://zevixcapital.com",
  },
  category: "Finanzas",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

};

export default async function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  const lang = await getLangFromCookie()
  const { dictionary } = await getTranslations(lang, [
    'banks',
    'login',
    'validation_login',
    'doc_beneficiario',
    'home',
    'sidebar',
    'buttons',
    'messages',
    'notifications_page',
    'notifications_new_page',
    'tables',
    'required-fields',
    'partners',
    'clients',
    'common',
    'documents',
    'account-form',
    'upload-documents',
    'voucher-page'
  ])

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <StoreProvider>
            <I18nProvider locale={lang} dictionary={dictionary}>
              <ThemeProvider
                attribute='class'
                defaultTheme='system'
                enableSystem
                disableTransitionOnChange
              >
                <OnlineGuard>
                  {children}
                  {modal}
                </OnlineGuard>
                <Toaster richColors position='top-center' />

              </ThemeProvider>
            </I18nProvider>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
