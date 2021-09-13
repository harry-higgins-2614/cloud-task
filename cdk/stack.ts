import { Construct, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import { join } from 'path';

export class CloudTakeHomeAssignment extends Stack {
  private handler: Function;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    this.handler = new Function(this, 'MyFunction', {
      code: Code.fromAsset(join('dist')),
      handler: 'index.handler',
      runtime: Runtime.NODEJS_14_X,
      environment: {
        PUBLISH_URL: 'http://host.docker.internal:3000',
      },
    });
  }
}
