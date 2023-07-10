import { type SSTConfig } from 'sst';

import { Default } from './stacks/Default';

export default {
  config(_input) {
    return {
      name: 'google-keep-clone',
      region: 'us-east-1',
    };
  },
  stacks(app) {
    app.stack(Default);
  }
} satisfies SSTConfig;
