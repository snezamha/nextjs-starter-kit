"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

import { i18n } from "@/configs/i18n"
import { siteSettings } from "@/configs/site"

import { useToast } from "@/hooks/use-toast"
import { useDictionary } from "@/contexts/dictionary-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type SettingsState = {
  metadata: {
    title: string
    description: string
    keywords: string[]
    authors: Array<{
      name: string
      url: string
    }>
  }
}

export default function MetaDataForm() {
  const { toast } = useToast()
  const params = useParams()
  const dictionary = useDictionary()

  const defaultLocale = params.lang as keyof typeof siteSettings
  const [locale, setLocale] = useState<keyof typeof siteSettings>(defaultLocale)
  const [settings, setSettings] = useState<SettingsState>(
    siteSettings[locale] ?? {
      metadata: {
        title: "",
        description: "",
        keywords: [],
        authors: [{ name: "", url: "" }],
      },
    }
  )

  useEffect(() => {
    setSettings(
      siteSettings[locale] ?? {
        metadata: {
          title: "",
          description: "",
          keywords: [],
          authors: [{ name: "", url: "" }],
        },
      }
    )
  }, [locale])

  const handleSave = async () => {
    try {
      const response = await fetch("/api/metadata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ locale, settings }),
      })

      if (response.ok) {
        toast({
          description:
            dictionary.settings.general.metaData.metaDataUpdatedFor.replace(
              "{locale}",
              locale === "fa"
                ? dictionary.settings.general.metaData.faLabel
                : locale === "en"
                  ? dictionary.settings.general.metaData.enLabel
                  : dictionary.settings.general.metaData.deLabel
            ),
          variant: "default",
        })
      } else {
        toast({
          description: dictionary.settings.general.metaData.saveFailed,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      toast({
        description: dictionary.settings.general.metaData.saveFailed,
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Tabs
        defaultValue={locale}
        onValueChange={(value) => setLocale(value as keyof typeof siteSettings)}
        className="flex flex-col items-center"
      >
        <TabsList className="mb-4">
          {i18n.locales.map((locale) => (
            <TabsTrigger key={locale} value={locale}>
              {locale.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mb-4">
        <Label className="mb-2 block font-medium">
          {dictionary.settings.general.metaData.metaTitle}
        </Label>
        <Input
          value={settings.metadata.title}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                title: e.target.value,
              },
            })
          }
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block font-medium">
          {dictionary.settings.general.metaData.metaDescription}
        </Label>
        <Textarea
          value={settings.metadata.description}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                description: e.target.value,
              },
            })
          }
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block font-medium">
          {dictionary.settings.general.metaData.keywords}
        </Label>
        <Input
          value={settings.metadata.keywords.join(", ")}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                keywords: e.target.value.split(", ") as string[],
              },
            })
          }
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block font-medium">
          {dictionary.settings.general.metaData.authorName}
        </Label>
        <Input
          value={settings.metadata.authors[0]?.name || ""}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                authors: [
                  {
                    name: e.target.value,
                    url: settings.metadata.authors[0]?.url || "",
                  },
                ],
              },
            })
          }
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <Label className="mb-2 block font-medium">
          {dictionary.settings.general.metaData.authorUrl}
        </Label>
        <Input
          value={settings.metadata.authors[0]?.url || ""}
          onChange={(e) =>
            setSettings({
              ...settings,
              metadata: {
                ...settings.metadata,
                authors: [
                  {
                    name: settings.metadata.authors[0]?.name || "",
                    url: e.target.value,
                  },
                ],
              },
            })
          }
          className="w-full"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSave} variant="default" className="px-6">
          {dictionary.settings.general.metaData.saveChanges}
        </Button>
      </div>
    </>
  )
}
