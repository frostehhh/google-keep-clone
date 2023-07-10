// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
      },
    },
  ],
  parserOptions: {
    project: path.join(__dirname, 'tsconfig.json'),
  },
  extends: ['next/core-web-vitals', 'custom'],
};