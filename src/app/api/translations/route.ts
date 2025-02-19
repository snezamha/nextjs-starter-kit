import { NextResponse } from 'next/server';
import { readJSONFile, writeJSONFile } from '@/utils/translationsFileManager';
import { protectedScopes } from '@/config/protected-scopes';

export async function POST(request: Request) {
  try {
    const { locale, scope, translations } = await request.json();

    if (!locale || !scope || !translations) {
      return NextResponse.json(
        {
          error: 'Missing locale, scope, or translations in the request body.'
        },
        { status: 400 }
      );
    }

    const data = (await readJSONFile(locale)) as Record<
      string,
      Record<string, string>
    >;

    if (protectedScopes.includes(scope)) {
      const existingTranslations = data[scope] || {};
      data[scope] = { ...existingTranslations, ...translations };
    } else {
      data[scope] = translations;
    }
    await writeJSONFile(locale, data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving translations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
