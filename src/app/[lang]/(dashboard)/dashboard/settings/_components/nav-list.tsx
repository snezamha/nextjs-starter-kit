"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import type { LocaleType } from "@/types"

import { linksData } from "../_data/nav-list-links"

import { ensureLocalizedPathname } from "@/lib/i18n"
import { cn } from "@/lib/utils"

import { useDictionary } from "@/contexts/dictionary-context"

export function NavList() {
  const params = useParams()
  const pathname = usePathname()
  const dictionary = useDictionary()

  const locale = params.lang as LocaleType

  return (
    <nav className="flex flex-wrap gap-4 text-sm text-muted-foreground md:flex-col">
      {linksData.map((link) => {
        const localizedPathname = ensureLocalizedPathname(link.href, locale)
        const title = dictionary.settings.general.title

        return (
          <Link
            key={link.title}
            href={localizedPathname}
            className={cn(
              pathname === localizedPathname && "font-semibold text-primary"
            )}
            aria-current={pathname === localizedPathname ? "page" : undefined}
          >
            {title}
          </Link>
        )
      })}
    </nav>
  )
}
