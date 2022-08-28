import fs from "fs";
import path from "path";

function recursiveChecker(
  componentDir: string,
  resolver: (...dirs: string[]) => string,
  isIgnore: (dir: string) => boolean,
) {
  if (fs.lstatSync(componentDir).isDirectory()) {
    if (
      isIgnore(componentDir) ||
      componentDir.endsWith("__tests__") ||
      componentDir.endsWith("__mocks__") ||
      componentDir.endsWith("__snapshots__")
    ) {
      return;
    }
    const files = fs.readdirSync(componentDir);
    files.forEach((file) => {
      recursiveChecker(path.join(componentDir, file), resolver, isIgnore);
    });

    return;
  }

  const regexCodeFiles = /.(ts|js|tsx|jsx)$/;

  if (!regexCodeFiles.test(componentDir)) {
    return;
  }

  if (
    /\.(test|spec)\.(t|j)sx?$/g.test(componentDir) &&
    /\.d\.tsx?$/g.test(componentDir)
  ) {
    return;
  }

  const content = fs.readFileSync(componentDir).toString();

  if (content.split("\n")[0].includes("//ignore-localize")) return;

  content.split("\n").forEach((line, index) => {
    const matched = line.match(/[آ-ی]/g);

    if (matched) {
      const error = new Error(
        `An error occured in ${componentDir.split(/[\\?]/).join("/")}:${
          index + 1
        }:0 path at line ${line}`,
      );
      error.stack = `Error:\nat (${componentDir}:${index + 1}:0)\n`;
      test(componentDir, () =>
        expect(() => {
          throw error;
        }).not.toThrow(),
      );
    }
  });
}

function checkPersian(dirname: string, exclude: string[] = []) {
  const resolver = (...dirs: string[]) => path.resolve(dirname, `../`, ...dirs);

  const isIgnore = (_dirname: string) =>
    !!exclude.find((dir) => resolver(dir) === _dirname);

  describe("Persian Characters Localizing", () => {
    recursiveChecker(resolver(""), resolver, isIgnore);

    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { checkPersian };
