/**
 * Extracts unique values of a specified property from an array of objects.
 * @param array - The array of objects to extract from.
 * @param property - The property key to extract unique values for.
 * @returns An array of unique values for the specified property.
 */
export function pluckUnique<T>(array: T[], property: keyof T): T[keyof T][] {
  const uniqueValues = new Set<T[keyof T]>();
  for (const item of array) {
    uniqueValues.add(item[property]);
  }
  return Array.from(uniqueValues);
}

/**
 * Groups an array of objects by a specified property.
 * @param array - The array of objects to group.
 * @param property - The property key to group by.
 * @returns An object where keys are unique property values and values are arrays of objects.
 */
export function groupBy<T>(array: T[], property: keyof T): Record<string, T[]> {
  const groups: Record<string, T[]> = {};
  for (const item of array) {
    const key = String(item[property]);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
  }
  return groups;
}
