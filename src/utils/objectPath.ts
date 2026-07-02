export const getNestedValue = (record: unknown, path: string): unknown =>
  path.split(".").reduce<unknown>((current, key) => {
    if (current !== null && typeof current === "object" && key in current) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, record);
