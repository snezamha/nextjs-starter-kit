import type { i18n } from "@/configs/i18n"
import type { icons } from "lucide-react"
import type { radii, themes } from "./configs/themes"

export type LocaleType = (typeof i18n)["locales"][number]

export type DirectionType = "ltr" | "rtl"

export type LayoutType = "vertical" | "horizontal"

export type ModeType = "light" | "dark" | "system"
export type ThemeType = keyof typeof themes

export type RadiusType = (typeof radii)[number]

export type SettingsType = {
  theme: ThemeType
  mode: ModeType
  radius: RadiusType
  layout: LayoutType
  locale: LocaleType
}
export type DynamicIconNameType = keyof typeof icons

export interface NavigationType {
  title: string
  items: NavigationRootItem[]
}

export type NavigationRootItem =
  | NavigationRootItemWithHrefType
  | NavigationRootItemWithItemsType

export interface NavigationRootItemBasicType {
  title: string
  label?: string
  iconName: DynamicIconNameType
}

export interface NavigationRootItemWithHrefType
  extends NavigationRootItemBasicType {
  href: string
  items?: never
}

export interface NavigationRootItemWithItemsType
  extends NavigationRootItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
}

export interface NavigationNestedItemBasicType {
  title: string
  label?: string
}

export interface NavigationNestedItemWithHrefType
  extends NavigationNestedItemBasicType {
  href: string
  items?: never
}

export interface NavigationNestedItemWithItemsType
  extends NavigationNestedItemBasicType {
  items: (
    | NavigationNestedItemWithHrefType
    | NavigationNestedItemWithItemsType
  )[]
  href?: never
}

export type NavigationNestedItem =
  | NavigationNestedItemWithHrefType
  | NavigationNestedItemWithItemsType
