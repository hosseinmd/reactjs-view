//@ts-nocheck
import fs from "fs";
import path from "path";

const resolver = (...dirs: string[]) => path.resolve(__dirname, `../`, ...dirs);

function readRoot() {
  return fs.readdirSync(resolver(""));
}
function recursiveChecker(componentDir: string) {
  const files = fs.readdirSync(resolver(componentDir));
  files.forEach((file) => {
    if (fs.lstatSync(resolver(componentDir, file)).isDirectory()) {
      recursiveChecker(resolver(componentDir, file));
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

function checkPersian() {
  describe("Persian Characters Localizing", () => {
    const rootDirectories = readRoot();
    rootDirectories.forEach((rootDirectory) => {
      if (fs.lstatSync(resolver(rootDirectory)).isDirectory()) {
        const componentsDirs = fs.readdirSync(resolver(rootDirectory));
        componentsDirs.forEach((componentsDir) => {
          if (fs.lstatSync(resolver(rootDirectory, componentsDir)).isFile()) {
            return;
          }
          recursiveChecker(path.join(rootDirectory, componentsDir));
        });
      }
    });

    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { checkPersian };
