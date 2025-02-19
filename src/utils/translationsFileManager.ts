import fs from 'fs/promises';
import path from 'path';

export const getLocalesDir = (): string =>
  path.join(process.cwd(), 'src', 'translations');

export const readJSONFile = async (
  locale: string
): Promise<Record<string, unknown>> => {
  const filePath = path.join(getLocalesDir(), `${locale}.json`);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return {};
  }
};

export const writeJSONFile = async (
  locale: string,
  content: Record<string, unknown>
): Promise<void> => {
  const filePath = path.join(getLocalesDir(), `${locale}.json`);
  await fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf-8');
};
