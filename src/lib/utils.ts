import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import type { ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureWithPrefix(value: string, prefix: string) {
  return value.startsWith(prefix) ? value : `${prefix}${value}`
}

export function ensureWithSuffix(value: string, suffix: string) {
  return value.endsWith(suffix) ? value : `${value}${suffix}`
}

export function ensureWithoutSuffix(value: string, suffix: string) {
  return value.endsWith(suffix) ? value.slice(0, -suffix.length) : value
}

export function ensureWithoutPrefix(value: string, prefix: string) {
  return value.startsWith(prefix) ? value.slice(prefix.length) : value
}

export function ensureRedirectPathname(
  basePathname: string,
  redirectPathname: string
) {
  const searchParams = new URLSearchParams({
    redirectTo: ensureWithoutSuffix(redirectPathname, "/"),
  })

  return ensureWithSuffix(basePathname, "?" + searchParams.toString())
}

export function getDictionaryValue(
  key: string,
  section: Record<string, unknown>
) {
  const value = section[key]

  if (typeof value !== "string") {
    throw new Error(
      `Invalid dictionary value for key: ${key}. Please ensure all values are correctly set in the dictionary files.`
    )
  }

  return value
}

export function isActivePathname(
  basePathname: string,
  currentPathname: string,
  exactMatch: boolean = false
) {
  if (typeof basePathname !== "string" || typeof currentPathname !== "string") {
    throw new Error("Both basePathname and currentPathname must be strings")
  }

  if (exactMatch) {
    return basePathname === currentPathname
  }

  const baseSegments = basePathname.split("/").filter(Boolean)
  const currentSegments = currentPathname.split("/").filter(Boolean)

  if (currentSegments.length > baseSegments.length) {
    return basePathname === currentPathname
  }

  return (
    currentPathname.startsWith(basePathname) &&
    (currentPathname.length === basePathname.length ||
      currentPathname[basePathname.length] === "/")
  )
}

export function titleCaseToCamelCase(titleCaseStr: string) {
  const camelCaseStr = titleCaseStr
    .toLowerCase()
    .replace(/\s+(.)/g, (_, char) => char.toUpperCase())

  return camelCaseStr
}
