#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StreamTakeHomeAssignment } from '../cdk/stack';

const app = new cdk.App();
new StreamTakeHomeAssignment(app, 'stream-take-home-assignment', {});
