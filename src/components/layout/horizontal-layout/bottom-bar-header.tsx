"use client"

import type { DictionaryType } from "@/lib/get-dictionary"

import { LanguageDropdown } from "@/components/language-dropdown"
import { FullscreenToggle } from "@/components/layout/full-screen-toggle"
import { ModeDropdown } from "@/components/layout/mode-dropdown"
import { PageTitle } from "../page-title"
import { ToggleMobileSidebar } from "../toggle-mobile-sidebar"

export function BottomBarHeader({
  dictionary,
}: {
  dictionary: DictionaryType
}) {
  return (
    <div className="container flex h-14 justify-between items-center gap-4">
      <ToggleMobileSidebar />
      <PageTitle dictionary={dictionary} />
      <div className="flex gap-2">
        <FullscreenToggle />
        <ModeDropdown dictionary={dictionary} />
        <LanguageDropdown dictionary={dictionary} />
      </div>
    </div>
  )
}
