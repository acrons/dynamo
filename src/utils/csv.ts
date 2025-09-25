// Sencillo parser CSV con soporte para campos entrecomillados y comas internas
export function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;
  const pushField = () => {
    current.push(field);
    field = '';
  };
  const pushRow = () => {
    rows.push(current);
    current = [];
  };
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    if (inQuotes) {
      if (char === '"') {
        const next = content[i + 1];
        if (next === '"') {
          field += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        pushField();
      } else if (char === '\n') {
        pushField();
        pushRow();
      } else if (char === '\r') {
        // ignore CR
      } else {
        field += char;
      }
    }
  }
  // último campo/fila
  if (field.length > 0 || current.length > 0) {
    pushField();
    pushRow();
  }
  return rows;
}

