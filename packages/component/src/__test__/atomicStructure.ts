import { parse } from "@babel/parser";
import babelTraverse, { Node, VisitNode } from "@babel/traverse";
import fs from "fs";
import { join, resolve } from "path";

/**
 * Check AST tree for any (j|tsx?) files and set a file references for any
 * import, require or dynamic import files.
 */
const parseFileASTTree = (
  file: string,
  importDeclaration: VisitNode<Node, any>,
) =>
  babelTraverse(
    parse(file, {
      sourceType: "module",
      plugins: [
        "optionalChaining",
        "classProperties",
        "decorators-legacy",
        "exportDefaultFrom",
        "doExpressions",
        "numericSeparator",
        "dynamicImport",
        "jsx",
        "typescript",
      ],
    }),
    {
      // Used for all ES6 import statements
      ImportDeclaration: importDeclaration,
    },
  );

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
  line: number,
) {
  const error = new Error(
    `(Atomic Rules): import is not correct in ${componentDir
      .split(/[\\?]/)
      .join("/")}/${file}:${line}:0 path at line ${value}
      ${componentDir}`,
  );
  //@ts-ignore

  error.stack = `Error:\nat (${resolver(componentDir, file)}:${line}:0)\n`;
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
    if (content.startsWith("//ignore-atomic")) return;

    try {
      parseFileASTTree(content, (path) => {
        if (!path.node.source.value?.startsWith(".")) {
          return;
        }
        const line = path.node.source.loc.start.line;

        if (
          join(componentDir, path.node.source.value).startsWith(atomicName) &&
          !join(componentDir, path.node.source.value).startsWith(
            join(...componentDir.split("\\").join("/").split("/").slice(0, 2)),
          )
        ) {
          throwError(path.node.source.value, componentDir, file, line);
          return;
        }

        components.slice(getIndex(atomicName) + 1).forEach((topDir) => {
          if (join(componentDir, path.node.source.value).startsWith(topDir)) {
            throwError(path.node.source.value, componentDir, file, line);
          }
        });
      });
    } catch (error) {
      (error as any).stack = `Error:\nat (${resolver(componentDir, file)})\n`;

      test(componentDir, () =>
        expect(() => {
          throw error;
        }).not.toThrow(),
      );
    }
  });
}

function check() {
  describe("Atomic design structure", () => {
    const atomicsDirs = readRoot();
    atomicsDirs.forEach((atomicDir) => {
      if (
        getIndex(atomicDir) !== -1 &&
        fs.lstatSync(resolver(atomicDir)).isDirectory()
      ) {
        const componentsDirs = fs.readdirSync(resolver(atomicDir));
        componentsDirs.forEach((componentsDir) => {
          if (fs.lstatSync(resolver(atomicDir, componentsDir)).isFile()) {
            return;
          }
          recursiveChecker(join(atomicDir, componentsDir), atomicDir);
        });
      }
    });
    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { check };
