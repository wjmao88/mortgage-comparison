export const decodeData = <T>(encoded: string | null | undefined): T | null => {
  if (!encoded) return null;
  const decoded = atob(encoded);
  return JSON.parse(decoded) as T | null;
};

export const encodeData = <T>(data: T): string => {
  const decoded = JSON.stringify(data);
  const encoded = btoa(decoded);
  return encoded;
};
