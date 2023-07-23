import { type SSTConfig } from 'sst';

import { Default } from './stacks/Default';
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
      .stack(Default)
      .stack(StorageStack);
  },
} satisfies SSTConfig;
