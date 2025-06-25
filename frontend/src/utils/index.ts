export function formatName(
  name: string | undefined,
  type: 'FLName' | 'initials' | 'onlyName'
): string {
  if (!name) return '';

  const parts = name.trim().split(' ').filter(Boolean);
  
  switch (type) {
    case 'FLName':
      return parts.slice(0, 2).join(' ');
    case 'initials':
      return parts.length >= 2
        ? `${parts[1][0]}. ${parts[0]}`
        : parts[0];
    case 'onlyName':
      return parts[0];
    default:
      return name;
  }
}
