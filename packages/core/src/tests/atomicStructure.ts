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
  line?: number,
) {
  const lineInfo = line === undefined ? "" : `:${line}:0`;
  const error = new Error(
    `(Atomic Rules): ${
      line ? "import" : "Position"
    } is not correct in ${componentDir
      .split(/[\\?]/)
      .join("/")}/${file}${lineInfo} path at line ${value}
      ${componentDir}`,
  );

  error.stack = `Error:\nat (${resolver(componentDir, file)}${lineInfo})\n`;
  test(componentDir, () =>
    expect(() => {
      throw error;
    }).not.toThrow(),
  );
}

function recursiveChecker(componentDir: string, atomicName: string) {
  let isCorrectPosition = false;

  const files = fs.readdirSync(resolver(componentDir));
  files.forEach((file) => {
    if (fs.lstatSync(resolver(componentDir, file)).isDirectory()) {
      const _isCorrectPosition = recursiveChecker(
        join(componentDir, file),
        atomicName,
      );
      if (_isCorrectPosition) {
        isCorrectPosition = true;
      }
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

        if (
          (components[getIndex(atomicName) - 1] &&
            join(componentDir, path.node.source.value).startsWith(
              components[getIndex(atomicName) - 1],
            )) ||
          join(componentDir, path.node.source.value).startsWith(
            components[getIndex(atomicName)],
          )
        ) {
          isCorrectPosition = true;
        }
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

  return isCorrectPosition;
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
        componentsDirs.forEach((componentDir) => {
          if (fs.lstatSync(resolver(atomicDir, componentDir)).isFile()) {
            return;
          }

          const isCorrectPosition = recursiveChecker(
            join(atomicDir, componentDir),
            atomicDir,
          );

          if (
            !isCorrectPosition &&
            components[getIndex(atomicDir)] !== "pages" &&
            components[getIndex(atomicDir)] !== "atoms"
          ) {
            throwError("", atomicDir, componentDir);
          }
        });
      }
    });
    it("fake", () => {
      expect(true).toBe(true);
    });
  });
}

export { check };
