const pick = <T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Partial<T> => {
  const finalObject: any = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      if (key === "age") {
        finalObject[key] = Number(obj[key]);
      } else {
        finalObject[key] = obj[key];
      }
    }
  }

  return finalObject;
};

export default pick;
