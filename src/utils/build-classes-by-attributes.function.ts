export function buildClassesByAttributes<A extends string>(
  attributes: { [key in A]?: boolean },
  mapper: { [key in A]?: string }
): string {
  return (Object.keys(attributes) as Array<A>).map((key: A): string => mapper[key]).join(' ');
}
