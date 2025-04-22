// Placeholder hook for barcode scanning. TODO: import real scanner library in future.
export function useBarcode() {
  const scan = () => {
    console.warn('Barcode scanning not implemented.');
    // TODO: launch scanner UI
  };
  return { scan };
}