import type { NavigationType } from "@/types"

export const navigationsData: NavigationType[] = [
  {
    title: "mainmenu",
    items: [
      {
        title: "dashboard",
        href: "/dashboard",
        iconName: "ChartPie",
      },
      {
        title: "settings",
        href: "/dashboard/settings",
        iconName: "Settings",
      },
    ],
  },
]
