import { type SSTConfig } from 'sst';

import { ApiStack } from './stacks/ApiStack';
import { FrontendStack } from './stacks/FrontendStack';
import { StorageStack } from './stacks/StorageStack';

export default {
  config(_input) {
    return {
      name: 'google-keep-clone',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app
      .stack(StorageStack)
      .stack(ApiStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
