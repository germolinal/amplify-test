import { defineFunction } from '@aws-amplify/backend';


export const AGENT_RUNTIME_ARN = "arn:aws:bedrock-agentcore:ap-southeast-2:732467237025:runtime/agentcore_starter_strands-7gggihGoa8"

export const sayHello = defineFunction({
    name: 'say-hello',
    timeoutSeconds: 30,
    // optionally specify a path to your handler (defaults to "./handler.ts")
    entry: './handler.ts'
});

