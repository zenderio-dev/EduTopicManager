export function formatName(
  name: string,
  type: 'FLName' | 'initials' | 'onlyName'
): string {
  const parts = name.trim().split(' ').filter(Boolean); 
  switch (type) {
    case 'FLName':
      
      return `${parts[0] || ''} ${parts[1] || ''}`.trim();

    case 'initials':
     
      const surname = parts[0] || '';
      const initial1 = parts[1]?.[0] || '';
      const initial2 = parts[2]?.[0] || '';
      return `${surname} ${initial1 && initial1 + '.'} ${initial2 && initial2 + '.'}`.trim();

    case 'onlyName':
      
      return parts[1] || '';

    default:
      return name;
  }
}