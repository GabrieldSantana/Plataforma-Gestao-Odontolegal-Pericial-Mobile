import { Anexo } from '../app/(auth)/(tabs)/(casos)/AdicionarCaso';

export function getFileName(file: Anexo | null): string | null {
  if (!file) return null;
  if (file.name) return file.name;
  if (file.uri) {
    const parts = file.uri.split('/');
    return parts[parts.length - 1];
  }
  return null;
}
