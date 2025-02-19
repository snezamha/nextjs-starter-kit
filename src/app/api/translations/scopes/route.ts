import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/utils/translationsFileManager';
import { locales } from '@/config/locales';
import { protectedScopes } from '@/config/protected-scopes';

export async function GET() {
  const enData = await readJSONFile('en');
  const faData = await readJSONFile('fa');
  const deData = await readJSONFile('de');

  const enScopes = Object.keys(enData);
  const faScopes = Object.keys(faData);
  const deScopes = Object.keys(deData);

  const allScopes = Array.from(
    new Set([...enScopes, ...faScopes, ...deScopes])
  );

  return NextResponse.json(allScopes);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get('scope');

  if (!scope) {
    return NextResponse.json(
      { error: 'Missing "scope" parameter' },
      { status: 400 }
    );
  }

  if (protectedScopes.includes(scope)) {
    return NextResponse.json(
      { error: 'This scope is protected and cannot be deleted.' },
      { status: 403 }
    );
  }

  for (const locale of locales) {
    const data = await readJSONFile(locale);
    if (data[scope] !== undefined) {
      delete data[scope];
      await writeJSONFile(locale, data);
    }
  }

  return NextResponse.json({ success: true });
}
