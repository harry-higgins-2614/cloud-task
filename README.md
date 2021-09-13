# Project: Stream Take Home Test

## Tooling

To contribute to Stream Take Home Test you will need:

* [Visual Studio Code](https://code.visualstudio.com/)
* [Node.js and NPM](https://nodejs.org/en/)

## Install

To install dependencies, run the command `npm install` from the project root.

## Build

To build the project, run the command `npm run build` from the project root.

## Lint

`esbenp.prettier-vscode` and `dbaeumer.vscode-eslint` are recommended extensions that lint on save.

## Test

To run all tests, run the command `npm run test` from the project root.

Test configuration is inside the [package.json](package.json).

The project includes [TS Auto Mock](https://typescript-tdd.github.io/ts-auto-mock/) which allows you to create mock data from TypeScript interfaces.

`orta.vscode-jest` is one of the recommended extensions for this project. This extension has the following benefits:

* Tests will run in the background when the project is open, and will alert you when any fail
* Breakpoints can be set in your tests, or in the code being tested, and can be run in debug mode individually.

## Deploy

This project is deployed using Bitbucket Pipelines. The CI configuration is in [bitbucket-pipelines.yml](bitbucket-pipelines.yml).