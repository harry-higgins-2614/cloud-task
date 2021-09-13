# Project: Cloud Take Home Assignment

## Objective

AFerry is building a cloud native system to support ferry bookings. When a booking is made, it is published to an event stream.

There is an external system that needs to be notified about new bookings, and exposes an endpoint to receive booking events.

Your assignment is to implement an event driven Lambda function that publishes `booking_completed` events to an external system.

## Brief

You will implement the Lambda function that is subscribed to the event stream. The event stream contains events of different types, your Lambda function should publish `booking_completed` events to the external system.

The external system accepts these events in a format defined in the enclosed [JSON Schema](./external-service/schema.json). Your Lambda function will need to transform events from the stream into this format before publishing.

## Tasks

- Implement the assignment using JavaScript or TypeScript. Under [src](./src) and [test](./test), there are `js` and `ts` folders for JavaScript and TypeScript respectively - place all your code in the relevant folder, and delete the other. The entry point for your function is already provided and currently logs the event to the console.
- Your Lambda function should pick out `booking_completed` events and ignore other event types
- Your Lambda function should transform events into the format defined in the [JSON Schema](./external-service/schema.json)
- Your Lambda function should publish events to the [Mock Server](#mock-server).
- Your Lambda function should have 100% test coverage, by adding tests under [test](./test) in the relevant folder (js or ts).

## Mock Server

A mock server is provided for you to publish events to. This can be started by running:

```
npm run start:server
```

The URL to publish to is available in your Lambda function via the environment variable `PUBLISH_URL`. Requests will receive a 200 response code when the request body passes validation. If the request body does not pass validation, the server will respond with a 400 response code and an explanation.

## Tooling

To complete the assignment you will need:

- [AWS SAM CLI beta CDK build](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-cdk-getting-started.html)
- [Node.js and NPM](https://nodejs.org/en/)
- AWS CDK, available using `npm i -g aws-cdk`

You can use any IDE but [Visual Studio Code](https://code.visualstudio.com/) is recommended as debugging is already configured.

## Install

To install dependencies, run the command `npm install` from the project root.

## Build

Webpack is included in the repository to bundle your source code with dependencies. There are build commands for JavaScript and TypeScript, depending on which you use. JavaScript commands are prefixed with `js:`, and equivalent TypeScript commands prefixed with `ts:`.

`js:build` will compile your source files once.
`js:watch` will watch your source folder and compile on save.

## Invoke / Debug

Your Lambda function is invoked using the SAM CLI beta. If you haven't installed that please see [Tooling](#tooling). Running invoke or debug commands will invoke your Lambda function with a sample event, containing a number of records.

To invoke your Lambda function run:

```
npm run invoke
```

Alternatively you can debug your Lambda function in Visual Studio Code by running:

```
npm run debug
```

You can then set breakpoints in your source files and attach the debugger via `Run > Start Debugging`.

## Test

To run all tests, run the command `npm run test` from the project root.

Test configuration is inside the [package.json](./package.json).

`orta.vscode-jest` is one of the recommended Visual Studio Code extensions for this project, which allows you to debug tests individually.

If you are using TypeScript, [TS Auto Mock](https://typescript-tdd.github.io/ts-auto-mock/) is included which allows you to create mock data from TypeScript interfaces. You don't have to use it, but it might be useful.
