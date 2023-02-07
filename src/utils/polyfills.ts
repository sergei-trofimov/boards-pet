export {};

declare global {
  interface Array<T> {
    /**
     * Update an item in the array without array mutation
     */
    updateItem(item: T): Array<T>;
  }
}

if (!Array.prototype.updateItem) {
  Array.prototype.updateItem = function <T extends { id: string | number }>(item: T): T[] {
    const index: number = this.findIndex(({ id }) => id === item.id);

    if (typeof index === 'boolean') {
      return this;
    }

    const copy: T[] = this.slice();
    copy[index] = item;

    return copy;
  };
}
