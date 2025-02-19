import { NextResponse, NextRequest } from 'next/server';
import { readJSONFile } from '@/utils/translationsFileManager';

export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  const { locale } = await params;
  const data = await readJSONFile(locale);
  return NextResponse.json(data);
}
