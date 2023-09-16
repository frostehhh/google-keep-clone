import { Cognito, type StackContext, use } from 'sst/constructs';

import { ApiStack } from './ApiStack';

export function AuthStack({ stack, app }: StackContext) {
  const { notesApi } = use(ApiStack);

  const auth = new Cognito(stack, 'Auth', {
    login: ['email'],
  });

  auth.attachPermissionsForAuthUsers(stack, [
    notesApi,
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  return {
    auth,
  };
}