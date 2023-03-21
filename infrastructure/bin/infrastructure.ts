#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { WebsiteDistribution } from '../lib/infrastructure-stack'

const app = new cdk.App()
const env = { account: '105352639226', region: 'us-east-1' }
new WebsiteDistribution(app, 'drew-leon-infrastructure', {
  env: env,
  websiteDomainName: 'drew-leon.dev'
})