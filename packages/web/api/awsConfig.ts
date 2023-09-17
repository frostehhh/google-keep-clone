export const config = {
  API: {
    endpoints: [
      {
        name: 'notesApi',
        endpoint: process.env.NEXT_PUBLIC_API_URL,
        region: process.env.NEXT_PUBLIC_REGION,
      },
    ],
  },
  Auth: {
    mandatorySignIn: true,
    region: process.env.NEXT_PUBLIC_REGION,
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  },
};