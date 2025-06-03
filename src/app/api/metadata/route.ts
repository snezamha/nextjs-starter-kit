import fs from "fs"
import path from "path"

import { NextResponse } from "next/server"
import prettier from "prettier"

import type { NextRequest } from "next/server"

const metadataFilePath = path.resolve(process.cwd(), "src/configs/site.ts")
const prettierConfigPath = path.resolve(process.cwd(), "prettier.config.mjs")

export async function POST(req: NextRequest) {
  try {
    const { locale, settings } = await req.json()

    if (!locale || !settings) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    let siteSettings: Record<string, Record<string, unknown>> = {}

    if (fs.existsSync(metadataFilePath)) {
      const fileContent = fs.readFileSync(metadataFilePath, "utf8")
      const match = fileContent.match(
        /export const siteSettings\s*=\s*(\{[\s\S]*?\});?[\n\r]*$/
      )
      if (match) {
        const objectString = match[1]
        siteSettings = new Function(`return ${objectString}`)()
      }
    }

    // بروزرسانی زبان مشخص‌شده
    siteSettings[locale] = settings

    // بازسازی محتوای TypeScript
    const updatedFileContent = `export const siteSettings = ${JSON.stringify(
      siteSettings,
      null,
      2
    )};`

    // فرمت با Prettier با توجه به نوع فایل TS
    let formattedContent = await prettier.format(updatedFileContent, {
      filepath: metadataFilePath, // ✅ این خط کلیدیه
      config: prettierConfigPath, // اختیاری ولی صریح
    })

    // حذف ; انتهایی (اختیاری، بسته به سلیقه‌ی شما)
    formattedContent = formattedContent.replace(/;\s*$/, "")

    // ذخیره نهایی در فایل
    fs.writeFileSync(metadataFilePath, formattedContent)

    return NextResponse.json(
      { message: "Metadata updated successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error updating metadata:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
