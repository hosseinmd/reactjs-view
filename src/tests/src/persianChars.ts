import fs from "fs";
import path from "path";

function readRoot(resolver: (...dirs: string[]) => string) {
  return fs.readdirSync(resolver(""));
}

function recursiveChecker(
  componentDir: string,
  resolver: (...dirs: string[]) => string,
) {
  const files = fs.readdirSync(resolver(componentDir));
  files.forEach((file) => {
    if (fs.lstatSync(resolver(componentDir, file)).isDirectory()) {
      if (
        file === "__tests__" ||
        file === "__mocks__" ||
        file === "__snapshots__"
      ) {
        return;
      }

      recursiveChecker(resolver(componentDir, file), resolver);
      return;
    }

    if (/\.test\.tsx?$/g.test(file) && /\.d\.tsx?$/g.test(file)) {
      return;
    }

    const content = fs.readFileSync(resolver(componentDir, file)).toString();

    if (content.split("\n")[0].includes("//ignore-localize")) return;

    content.split("\n").forEach((line, index) => {
      const matched = line.match(/[آ-ی]/g);

      if (matched) {
        const error = new Error(
          `An error occured in ${componentDir
            .split(/[\\?]/)
            .join("/")}/${file}:${index + 1}:0 path at line ${line}`,
        );
        error.stack = `Error:\nat (${resolver(componentDir, file)}:${
          index + 1
        }:0)\n`;
        test(componentDir, () =>
          expect(() => {
            throw error;
          }).not.toThrow(),
        );
      }
    });
  });
}

function checkPersian(dirname: string) {
  const resolver = (...dirs: string[]) => path.resolve(dirname, `../`, ...dirs);

  describe("Persian Characters Localizing", () => {
    const rootDirectories = readRoot(resolver);
    rootDirectories.forEach((rootDirectory) => {
      if (fs.lstatSync(resolver(rootDirectory)).isDirectory()) {
        const componentsDirs = fs.readdirSync(resolver(rootDirectory));
        componentsDirs.forEach((componentsDir) => {
          if (fs.lstatSync(resolver(rootDirectory, componentsDir)).isFile()) {
            return;
          }
          recursiveChecker(path.join(rootDirectory, componentsDir), resolver);
        });
      }
    });

    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { checkPersian };
