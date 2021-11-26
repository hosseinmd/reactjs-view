import fs from "fs";
import { join, resolve } from "path";
import { Scope } from "../utilities/generateIndex";

const components = [
  "atoms",
  "molecules",
  "muscles",
  "organisms",
  "templates",
  "pages",
];

function readRoot(resolver: (...dirs: string[]) => string) {
  return fs.readdirSync(resolver(""));
}

function getIndex(atomicName: string) {
  return components.indexOf(atomicName);
}

function throwError(
  value: string,
  componentDir: string,
  file: string,
  atomicName: string,
  resolver: (...dirs: string[]) => string,
) {
  const error = new Error(
    `(jss Rules): generateIndex parameter is not correct in ${componentDir
      .split(/[\\?]/)
      .join("/")}/${file} ${value}
      expected to be => ${atomicName}`,
  );

  error.stack = `Error:\nat (${resolver(componentDir, file)})\n`;
  test(componentDir, () =>
    expect(() => {
      throw error;
    }).not.toThrow(),
  );
}

function recursiveChecker(
  componentDir: string,
  atomicName: string,
  resolver: (...dirs: string[]) => string,
  scope?: Scope,
) {
  const files = fs.readdirSync(resolver(componentDir));
  files.forEach((file) => {
    if (fs.lstatSync(resolver(componentDir, file)).isDirectory()) {
      recursiveChecker(join(componentDir, file), atomicName, resolver, scope);

      return;
    }

    if (!file.match(/(jsx?|tsx?)$/g)) {
      return;
    }

    const content = fs.readFileSync(resolver(componentDir, file)).toString();

    if (content.includes("generateIndex")) {
      if (
        content
          .replace(/[\n\s]+/g, "")
          .match(
            new RegExp(
              `generateIndex\\(["']${atomicName}["']${
                scope ? `,["']${scope}["']` : ""
              }`,
            ),
          )
      ) {
        return;
      } else {
        throwError("", componentDir, file, atomicName, resolver);
        // throw new Error(
        //   `generateIndex parameter is wrong at ${componentDir} expected to be *${atomicName}*`,
        // );
      }
    } else {
      return;
    }
  });
}

function checkJssIndex(dirname: string, scope?: Scope) {
  const resolver = (...dirs: string[]) => resolve(dirname, `../`, ...dirs);

  const atomicsDirs = readRoot(resolver);
  describe("jss design structure", () => {
    atomicsDirs.forEach((atomicDir) => {
      if (
        getIndex(atomicDir) !== -1 &&
        fs.lstatSync(resolver(atomicDir)).isDirectory()
      ) {
        const componentsDirs = fs.readdirSync(resolver(atomicDir));
        componentsDirs.forEach((componentDir) => {
          if (fs.lstatSync(resolver(atomicDir, componentDir)).isFile()) {
            return;
          }

          recursiveChecker(
            join(atomicDir, componentDir),
            atomicDir,
            resolver,
            scope,
          );
        });
      }
    });
    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { checkJssIndex };
