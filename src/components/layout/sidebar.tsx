"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import type { DictionaryType } from "@/lib/get-dictionary"
import type {
  LocaleType,
  NavigationNestedItem,
  NavigationRootItem,
} from "@/types"

import { navigationsData } from "@/data/navigations"

import { i18n } from "@/configs/i18n"
import { ensureLocalizedPathname } from "@/lib/i18n"
import {
  getDictionaryValue,
  isActivePathname,
  titleCaseToCamelCase,
} from "@/lib/utils"

import { useSettings } from "@/hooks/use-settings"
import { Badge } from "@/components/ui/badge"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  Sidebar as SidebarWrapper,
  useSidebar,
} from "@/components/ui/sidebar"
import { DynamicIcon } from "@/components/dynamic-icon"
import { CommandMenu } from "./command-menu"
import { PageTitle } from "./page-title"

export function Sidebar({ dictionary }: { dictionary: DictionaryType }) {
  const pathname = usePathname()
  const params = useParams()
  const { openMobile, setOpenMobile, isMobile } = useSidebar()
  const { settings } = useSettings()

  const locale = params.lang as LocaleType
  const direction = i18n.localeDirection[locale]
  const isRTL = direction === "rtl"
  const isHoizontalAndDesktop = settings.layout === "horizontal" && !isMobile

  if (isHoizontalAndDesktop) return null

  const renderMenuItem = (item: NavigationRootItem | NavigationNestedItem) => {
    const title = getDictionaryValue(
      titleCaseToCamelCase(item.title),
      dictionary.navigation
    )
    const label =
      "label" in item && item.label
        ? getDictionaryValue(
            titleCaseToCamelCase(item.label),
            dictionary.navigation
          )
        : undefined

    if (item.items) {
      return (
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full justify-between [&[data-state=open]>svg]:rotate-180">
              <span className="flex items-center">
                {"iconName" in item && (
                  <DynamicIcon name={item.iconName} className="me-2 h-4 w-4" />
                )}
                <span>{title}</span>
                {"label" in item && (
                  <Badge variant="secondary" className="me-2">
                    {label}
                  </Badge>
                )}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
            <SidebarMenuSub>
              {item.items.map((subItem: NavigationNestedItem) => (
                <SidebarMenuItem key={subItem.title}>
                  {renderMenuItem(subItem)}
                </SidebarMenuItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    if ("href" in item) {
      const localizedPathname = ensureLocalizedPathname(item.href, locale)
      const isActive = isActivePathname(localizedPathname, pathname)

      return (
        <SidebarMenuButton
          isActive={isActive}
          onClick={() => setOpenMobile(!openMobile)}
          asChild
        >
          <Link href={localizedPathname}>
            {"iconName" in item && (
              <DynamicIcon name={item.iconName} className="h-4 w-4" />
            )}
            <span>{title}</span>
            {"label" in item && <Badge variant="secondary">{label}</Badge>}
          </Link>
        </SidebarMenuButton>
      )
    }
  }

  return (
    <SidebarWrapper side={isRTL ? "right" : "left"}>
      <SidebarHeader>
        <div className="flex justify-center items-center h-16 w-full">
          <PageTitle dictionary={dictionary} />
        </div>
        <CommandMenu dictionary={dictionary} buttonClassName="max-w-full" />
      </SidebarHeader>
      <ScrollArea>
        <SidebarContent className="gap-0">
          {navigationsData.map((nav) => {
            const title = getDictionaryValue(
              titleCaseToCamelCase(nav.title),
              dictionary.navigation
            )

            return (
              <SidebarGroup key={nav.title}>
                <SidebarGroupLabel>{title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {nav.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        {renderMenuItem(item)}
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          })}
        </SidebarContent>
      </ScrollArea>
    </SidebarWrapper>
  )
}
