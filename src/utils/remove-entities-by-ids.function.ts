export function removeEntitiesByIds<T extends { id: string; options?: { id: string }[] }>(
  entities: T[],
  ids: string[]
): T[] {
  return structuredClone(entities).filter((entity) => {
    if (ids.includes(entity.id)) {
      return false;
    } else if (entity?.options?.length) {
      entity.options = removeEntitiesByIds(entity.options, ids);
    }

    return true;
  });
}
