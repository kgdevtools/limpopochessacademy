export function detectTableHeader(text: string): string[] {
      const lines = text.split('\n');
        return lines.find(line => /ime|rtg|poen/i.test(line))?.split(/\s+/) || [];
}
