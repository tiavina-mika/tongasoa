/**
 * Transform a name into its initials.
 * @param name
 * @returns
 */
export const transformNameToInitials = (name: string): string => {
  const trimmedName = name?.trim();

  if (!trimmedName) {
    return '';
  }
  const parts = trimmedName.split(/\s+/).filter(Boolean);

  if (parts.length > 1) {
    // Take first letter of first and second word
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  // If only one word, take first two letters
  const firstChar = parts[0]?.charAt(0).toUpperCase() ?? '';
  const secondChar = parts[0]?.charAt(1)?.toUpperCase() ?? '';

  return (firstChar + secondChar).padEnd(2, ' ');
};
