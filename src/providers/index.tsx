import type { DirectionType, LocaleType } from "@/types"
import type { ReactNode } from "react"

import { SettingsProvider } from "@/contexts/settings-context"
import { DirectionProvider } from "./direction-provider"
import { ModeProvider } from "./mode-provider"
import { ThemeProvider } from "./theme-provider"

export function Providers({
  locale,
  direction,
  children,
}: Readonly<{
  locale: LocaleType
  direction: DirectionType
  children: ReactNode
}>) {
  return (
    <SettingsProvider locale={locale}>
      <ModeProvider>
        <ThemeProvider>
          <DirectionProvider direction={direction}>
            {children}
          </DirectionProvider>
        </ThemeProvider>
      </ModeProvider>
    </SettingsProvider>
  )
}
