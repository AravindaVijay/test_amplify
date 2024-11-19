import Amplify from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: '<AWS_REGION>', // e.g., 'us-west-2'
    userPoolId: '<USER_POOL_ID>',
    userPoolWebClientId: '<APP_CLIENT_ID>',
  },
});
