type Index =
  | "atoms"
  | "molecules"
  | "muscles"
  | "organisms"
  | "templates"
  | "pages";

const getIndexes = (startIndex: number) => ({
  atoms: startIndex + 1000,
  molecules: startIndex + 3000,
  muscles: startIndex + 5000,
  organisms: startIndex + 7000,
  templates: startIndex + 9000,
  pages: startIndex + 11000,
});

const scopes = {
  coreModule: getIndexes(20000),
  module: getIndexes(40000),
  app: getIndexes(60000),
};

type Scope = keyof typeof scopes;

export type { Scope, Index };
export { scopes };
