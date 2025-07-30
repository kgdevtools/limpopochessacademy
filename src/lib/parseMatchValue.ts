export function parseMatchValue(cell: string) {
      const match = cell.match(/(\d+)([wb])([\d\.]+)/);
        if (!match) return null;

          return {
                opponent: parseInt(match[1]),
                    color: match[2] as 'w' | 'b',
                        result: parseFloat(match[3])
          };
}
