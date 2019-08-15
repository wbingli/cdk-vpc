#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { VpcStack } from '../lib/vpc-stack';

const app = new cdk.App();
const env = {account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION}
new VpcStack(app, 'VpcStack', {env: env});
