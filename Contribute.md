# Introduction

This documentation made for helping contributors and code reviewers, for understanding all part of projects and doing the best,

## TOC

- [Coding Principals](#Coding-Principals)
- [Tests](###Tests)
- [Start](#Start)
- [Build](#Build)
- [Storybook](#Storybook)

# Coding-Principals

Here We will explain our best way of coding. Contributors should write/fix the codes according to these principles, code reviewers should known these principles.

### Tests

We have three type of tests which all of them should pass before of merging to develope
1- `$ yarn lint-commit` will be test syntax of code by defined rules in eslintrc
2- `$ yarn test` run all of \*.test.ts files and all of them should be as expected (if you have problem get help from developer of that test or other developers) **Don't change Test until you don't know what is that**
3- `$ yarn compile` test code types this is important (Avoid using any or ts-ignore)

# Start

# Build

# Storybook
