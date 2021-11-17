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

const levels = {
  coreModule: getIndexes(0),
  module: getIndexes(20000),
  app: getIndexes(40000),
};

function generateIndex(scope: Index, level: keyof typeof levels = "app") {
  return levels[level][scope]++;
}

export { generateIndex };
