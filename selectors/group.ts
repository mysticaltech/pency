export function groupBy<T>(items: T[], selector: (item: T) => string | undefined) {
  return items.reduce<Record<string, T[]>>((acc, item) => {
    const key = selector(item) || "";

    acc[key] = acc[key] ? acc[key].concat(item) : [item];

    return acc;
  }, {});
}
