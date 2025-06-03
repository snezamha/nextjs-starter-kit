import { Inter, Vazirmatn } from "next/font/google"

import { i18n } from "@/configs/i18n"
import { siteSettings } from "@/configs/site"
import { cn } from "@/lib/utils"

import "../globals.css"

import { Providers } from "@/providers"

import type { LocaleType } from "@/types"
import type { Metadata } from "next"
import type { ReactNode } from "react"

import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"

export async function generateMetadata({
  params,
}: {
  params: { lang: keyof typeof siteSettings }
}): Promise<Metadata> {
  const { lang } = params

  return {
    title: {
      template: `%s | ${siteSettings[lang].metadata.title}`,
      default: `${siteSettings[lang].metadata.title}`,
    },
    description: siteSettings[lang].metadata.description,
    keywords: siteSettings[lang].metadata.keywords,
    authors: [
      {
        name: siteSettings[lang].metadata.authors[0].name,
        url: siteSettings[lang].metadata.authors[0].url,
      },
    ],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  }
}
const inter = Inter({ subsets: ["latin"] })
const vazir = Vazirmatn({ subsets: ["arabic"] })

export default async function RootLayout(props: {
  children: ReactNode
  params: Promise<{ lang: LocaleType }>
}) {
  const params = await props.params

  const { children } = props

  const direction = i18n.localeDirection[params.lang]
  const font = params.lang === "fa" ? vazir : inter

  return (
    <html lang={params.lang} dir={direction} suppressHydrationWarning>
      <body
        className={cn(
          "bg-background text-foreground antialiased overscroll-none",
          font.className
        )}
      >
        <Providers locale={params.lang} direction={direction}>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  )
}
