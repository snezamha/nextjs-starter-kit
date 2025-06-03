import type { LocaleType } from "@/types"
import type { ReactNode } from "react"

import { getDictionary } from "@/lib/get-dictionary"

import { DictionaryProvider } from "@/contexts/dictionary-context"
import { Layout } from "@/components/layout"

export default async function DashboardLayout(props: {
  children: ReactNode
  params: Promise<{ lang: LocaleType }>
}) {
  const params = await props.params

  const { children } = props

  const dictionary = await getDictionary(params.lang)

  return (
    <DictionaryProvider dictionary={dictionary}>
      <Layout dictionary={dictionary}>{children}</Layout>
    </DictionaryProvider>
  )
}
