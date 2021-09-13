#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StreamTakeHomeTest } from '../cdk/stack';

const app = new cdk.App();
new StreamTakeHomeTest(app, 'stream-take-home-test', {});
