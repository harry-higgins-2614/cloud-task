#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CloudTakeHomeAssignment } from '../cdk/stack';

const app = new cdk.App();
new CloudTakeHomeAssignment(app, 'cloud-take-home-assignment', {});
