# Google Keep Clone

An work-in-progress open source clone of the Google Keep app using TypeScript, React, Next.js, Serverless Stack(SST) and microservice architecture.

## About this project

This purpose of this project is to showcase the implementation of the libraries and architectures mentioned above.

## Packages

The packages involved in this monorepo are as follows

- Root - SST configuration
- web - Frontend application with Next.js
- eslint-config-custom - custom reusable ESLint config for other packages
- core - main library for common types, utils, functions, etc.
- functions - Lambda functions for SST

## Running Locally

1. Install dependencies using pnpm:

```
pnpm install
```

2. Configure AWS Credentials locally. You can refer to this guide - [SST - IAM Credentials](https://docs.sst.dev/advanced/iam-credentials#loading-credentials)

3. Start the development server

```
nx run-many -t dev
```
