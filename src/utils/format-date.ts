export const formatDate = (timestamp: string): string => {
  if (typeof window === 'undefined') {
    return new Date(timestamp).toISOString();
  }

  return new Date(timestamp).toLocaleString();
};
