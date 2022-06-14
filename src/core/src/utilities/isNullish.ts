export const isNullish = (
  value: null | undefined | any,
): value is null | undefined => {
  return value === null || value === undefined;
};
