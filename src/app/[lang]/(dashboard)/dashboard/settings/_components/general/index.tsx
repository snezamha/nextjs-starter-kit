"use client"

import { useDictionary } from "@/contexts/dictionary-context"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import MetaDataForm from "./meta-data-form"

export function General() {
  const dictionary = useDictionary()

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dictionary.settings.general.metaData.title}</CardTitle>
        <CardDescription>
          {dictionary.settings.general.metaData.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MetaDataForm />
      </CardContent>
    </Card>
  )
}
