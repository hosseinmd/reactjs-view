import fs from "fs";
import { join, resolve } from "path";

const components = [
  "atoms",
  "molecules",
  "muscles",
  "organisms",
  "templates",
  "pages",
];

const resolver = (...dirs: string[]) => resolve(__dirname, `../`, ...dirs);

function readRoot() {
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

function recursiveChecker(componentDir: string, atomicName: string) {
  const files = fs.readdirSync(resolver(componentDir));
  files.forEach((file) => {
    if (fs.lstatSync(resolver(componentDir, file)).isDirectory()) {
      recursiveChecker(join(componentDir, file), atomicName);

      return;
    }

    if (!file.match(/(jsx?|tsx?)$/g)) {
      return;
    }

    const content = fs.readFileSync(resolver(componentDir, file)).toString();

    if (content.includes("generateIndex")) {
      if (content.includes(`generateIndex("${atomicName}")`)) {
        return;
      } else {
        throwError("", componentDir, file, atomicName);
        // throw new Error(
        //   `generateIndex parameter is wrong at ${componentDir} expected to be *${atomicName}*`,
        // );
      }
    } else {
      return;
    }
  });
}

function check() {
  const atomicsDirs = readRoot();
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

          recursiveChecker(join(atomicDir, componentDir), atomicDir);
        });
      }
    });
    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { check };
