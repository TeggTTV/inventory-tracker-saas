import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const exportToCSV = (data: Record<string, unknown>[], filename: string) => {
  if (!data || !data.length) {
    return;
  }

  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ('' + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', filename);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
};

// Append an action to the auditLogs in localStorage
export const logAction = (type: 'add' | 'edit' | 'delete', description: string) => {
  const key = 'auditLogs';
  const stored = localStorage.getItem(key);
  const logs = stored ? JSON.parse(stored) : [];
  logs.push({ type, description, date: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(logs));
};