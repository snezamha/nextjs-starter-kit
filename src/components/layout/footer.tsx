import { useParams } from "next/navigation"

import type { DictionaryType } from "@/lib/get-dictionary"

import { siteSettings } from "@/configs/site"
import { cn } from "@/lib/utils"

import { buttonVariants } from "@/components/ui/button"

interface FooterProps {
  dictionary: DictionaryType
}

export function Footer({ dictionary }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const params = useParams()
  const locale = params.lang as keyof typeof siteSettings
  const title = siteSettings[locale].metadata.title
  const authorName = siteSettings[locale].metadata.authors[0].name
  const authorUrl = siteSettings[locale].metadata.authors[0].url

  return (
    <footer className="bg-background border-t border-sidebar-border">
      <div className="container flex flex-col items-center justify-between gap-2 p-4 md:flex-row md:px-6">
        <p className="text-xs text-muted-foreground md:text-sm text-center md:text-left">
          © {currentYear}{" "}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
          >
            {title}
          </a>
        </p>
        <p className="text-xs text-muted-foreground md:text-sm text-center md:text-right">
          {dictionary.footer.copyright}
          <a
            href={authorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "link" }), "inline p-0")}
          >
            {authorName}
          </a>
        </p>
      </div>
    </footer>
  )
}
