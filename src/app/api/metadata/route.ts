import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const metadataFilePath = path.resolve(process.cwd(), 'src/config/site.ts');

export async function POST(req: NextRequest) {
  try {
    const { locale, settings } = await req.json();
    if (!locale || !settings) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    let siteSettings: Record<string, Record<string, unknown>> = {};

    if (fs.existsSync(metadataFilePath)) {
      const fileContent = fs.readFileSync(metadataFilePath, 'utf8');
      const match = fileContent.match(
        /export const siteSettings = (\{[\s\S]*\});/
      );
      if (match) {
        siteSettings = eval(`(${match[1]})`);
      }
    }

    siteSettings[locale] = settings;

    const updatedFileContent = `export const siteSettings = ${JSON.stringify(siteSettings, null, 2)};`;

    fs.writeFileSync(metadataFilePath, updatedFileContent);

    return NextResponse.json(
      { message: 'Metadata updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating metadata:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
