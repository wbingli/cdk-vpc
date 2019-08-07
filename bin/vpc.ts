#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import { VpcStack } from '../lib/vpc-stack';

const app = new cdk.App();
new VpcStack(app, 'VpcStack');