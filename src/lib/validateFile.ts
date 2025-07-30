export function validatePdfFile(file: File): void {
      if (file.type !== 'application/pdf') throw new Error('Invalid file type');
        if (file.size > 50 * 1024 * 1024) throw new Error('File too large');
}
