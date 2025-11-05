import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sayHello } from './functions/say-hello/resource';
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam"


let backend = defineBackend({
  auth,
  data,
  sayHello,
});

// new SayHello(
//   backend.createStack('say-hi-lambda'),
//   'say-hi-lambda-resource'
// );

backend.sayHello.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ["bedrock-agentcore:InvokeAgentRuntime"],
    resources: [
      "arn:aws:bedrock-agentcore:ap-southeast-2:732467237025:runtime/agentcore_starter_strands-7gggihGoa8/runtime-endpoint/DEFAULT",
      "arn:aws:bedrock-agentcore:ap-southeast-2:732467237025:runtime/agentcore_starter_strands-7gggihGoa8"
    ], // Refine this to your specific ARN
  })
)


