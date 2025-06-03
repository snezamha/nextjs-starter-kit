import type { ReactNode } from "react"

import { NavList } from "./_components/nav-list"

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container grid w-full items-start gap-6 p-4 md:grid-cols-[180px_1fr]">
      <div className="grid gap-6">
        <NavList />
      </div>
      <div className="grid gap-6">{children}</div>
    </div>
  )
}
