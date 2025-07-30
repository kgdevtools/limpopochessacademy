import { fuzzyMap } from './translateKeys';

export function extractMetadata(text: string): Record<string, string> {
      const lines = text.split('\n').slice(0, 50);
        const metadata: Record<string, string> = {};

          for (const line of lines) {
                const match = line.match(/^\s*(.+?)\s*[:\-]\s*(.+)$/);
                    if (match) {
                              const rawKey = match[1].toLowerCase().trim();
                                    const rawVal = match[2].trim();
                                          const key = fuzzyMap[rawKey] || rawKey;
                                                metadata[key] = rawVal;
                    }
          }

            return metadata;
}
