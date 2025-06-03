"use client"

import { useCallback } from "react"
import { useParams, usePathname, useRouter } from "next/navigation"
import {
  AlignLeft,
  AlignRight,
  AlignStartHorizontal,
  AlignStartVertical,
  MoonStar,
  RotateCcw,
  Settings,
  Sun,
  SunMoon,
} from "lucide-react"

import type { DictionaryType } from "@/lib/get-dictionary"
import type { LocaleType, ModeType, ThemeType } from "@/types"
import type { CSSProperties } from "react"

import { i18n } from "@/configs/i18n"
import { radii, themes } from "@/configs/themes"
import { relocalizePathname } from "@/lib/i18n"

import { useSettings } from "@/hooks/use-settings"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface CustomizerProps {
  dictionary: DictionaryType
}

export function Customizer({ dictionary }: CustomizerProps) {
  const { settings, updateSettings, resetSettings } = useSettings()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()

  const locale = params.lang as LocaleType
  const direction = i18n.localeDirection[locale]

  const handleSetLocale = useCallback(
    (localeName: LocaleType) => {
      updateSettings({ ...settings, locale: localeName })
      router.push(relocalizePathname(pathname, localeName))
    },
    [settings, updateSettings, router, pathname]
  )

  const handleSetMode = useCallback(
    (modeName: ModeType) => {
      updateSettings({ ...settings, mode: modeName })
    },
    [settings, updateSettings]
  )

  const handleReset = useCallback(() => {
    resetSettings()
    router.push(relocalizePathname(pathname, "en"), { scroll: false })
  }, [resetSettings, router, pathname])

  const isRTL = direction === "rtl"

  return (
    <Sheet>
      <SheetTrigger className="fixed bottom-10 end-0 z-50" asChild>
        <Button
          size="icon"
          className="rounded-e-none shadow-sm"
          aria-label={dictionary.customizer.title}
        >
          <Settings className="shrink-0 h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetPortal>
        <SheetContent className="p-0" side={isRTL ? "right" : "left"}>
          <ScrollArea className="h-full p-4">
            <div className="flex flex-1 flex-col space-y-4">
              <SheetHeader>
                <SheetTitle>{dictionary.customizer.title}</SheetTitle>
                <SheetDescription>
                  {dictionary.customizer.description}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-1.5">
                <p className="text-sm">{dictionary.customizer.color}</p>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(themes).map(([name, value]) => {
                    const isActive = settings.theme === name

                    return (
                      <Button
                        key={name}
                        variant={isActive ? "secondary" : "default"}
                        style={
                          {
                            "--primary":
                              value.activeColor[
                                settings.mode === "dark" ? "dark" : "light"
                              ],
                            "--primary-foreground":
                              value.activeColor["foreground"],
                          } as CSSProperties
                        }
                        onClick={() =>
                          updateSettings({
                            ...settings,
                            theme: name as ThemeType,
                          })
                        }
                      >
                        <span>{value.label}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm">{dictionary.customizer.radius}</p>
                <div className="grid grid-cols-5 gap-2">
                  {radii.map((value) => (
                    <Button
                      variant={
                        settings.radius === value ? "secondary" : "outline"
                      }
                      key={value}
                      onClick={() => {
                        updateSettings({
                          ...settings,
                          radius: value,
                        })
                      }}
                    >
                      {value}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm">{dictionary.customizer.mode}</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={
                      settings.mode === "light" ? "secondary" : "outline"
                    }
                    onClick={() => handleSetMode("light")}
                    aria-label={dictionary.navigation.mode.light}
                    className="flex items-center justify-center gap-2"
                  >
                    <Sun className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.navigation.mode.light}
                    </span>
                  </Button>

                  <Button
                    variant={settings.mode === "dark" ? "secondary" : "outline"}
                    onClick={() => handleSetMode("dark")}
                    aria-label={dictionary.navigation.mode.dark}
                    className="flex items-center justify-center gap-2"
                  >
                    <MoonStar className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.navigation.mode.dark}
                    </span>
                  </Button>
                  <Button
                    variant={
                      settings.mode === "system" ? "secondary" : "outline"
                    }
                    onClick={() => handleSetMode("system")}
                    aria-label={dictionary.navigation.mode.system}
                    className="flex items-center justify-center gap-2"
                  >
                    <SunMoon className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.navigation.mode.system}
                    </span>
                  </Button>
                </div>
              </div>
              <div className="space-y-1.5">
                <p className="text-sm">{dictionary.customizer.layout}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={
                      settings.layout === "horizontal" ? "secondary" : "outline"
                    }
                    onClick={() =>
                      updateSettings({
                        ...settings,
                        layout: "horizontal",
                      })
                    }
                    aria-label={dictionary.customizer.horizontal}
                    className="flex items-center justify-center gap-2"
                  >
                    <AlignStartHorizontal className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.customizer.horizontal}
                    </span>
                  </Button>
                  <Button
                    variant={
                      settings.layout === "vertical" ? "secondary" : "outline"
                    }
                    onClick={() =>
                      updateSettings({
                        ...settings,
                        layout: "vertical",
                      })
                    }
                    aria-label={dictionary.customizer.vertical}
                    className="flex items-center justify-center gap-2"
                  >
                    <AlignStartVertical className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.customizer.vertical}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="space-y-1.5">
                <p className="text-sm">{dictionary.customizer.direction}</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={direction === "ltr" ? "secondary" : "outline"}
                    onClick={() => handleSetLocale("en")}
                    aria-label={dictionary.customizer.ltr}
                    className="flex items-center justify-center gap-2"
                  >
                    <AlignLeft className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.customizer.ltr}
                    </span>
                  </Button>
                  <Button
                    variant={direction === "rtl" ? "secondary" : "outline"}
                    onClick={() => handleSetLocale("fa")}
                    aria-label={dictionary.customizer.rtl}
                    className="flex items-center justify-center gap-2"
                  >
                    <AlignRight className="h-4 w-4 shrink-0" />
                    <span className="hidden md:inline">
                      {dictionary.customizer.rtl}
                    </span>
                  </Button>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={handleReset}
              >
                <RotateCcw className="shrink-0 h-4 w-4 me-2" />
                {dictionary.customizer.reset}
              </Button>
            </div>
          </ScrollArea>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  )
}
