import type { Schema } from "../../data/resource"
import { BedrockAgentCoreClient, InvokeAgentRuntimeCommand } from "@aws-sdk/client-bedrock-agentcore"
// import { AGENT_RUNTIME_ARN } from "./resource"

const client = new BedrockAgentCoreClient({
    // region
})

const AGENT_RUNTIME_ARN = "arn:aws:bedrock-agentcore:ap-southeast-2:732467237025:runtime/agentcore_starter_strands-7gggihGoa8"

export const handler: Schema["sayHello"]["functionHandler"] = async (event) => {
    // arguments typed from `.arguments()`
    const { name } = event.arguments
    console.log(name)
    console.log(event)
    const command = new InvokeAgentRuntimeCommand({
        
        agentRuntimeArn: AGENT_RUNTIME_ARN,
        payload: JSON.stringify({
            prompt: `Hello, my name is ${name}!`
        })
    });
    console.log(command)
    const response = await client.send(command)
    // console.log(response.response?.transformToString())
    return await response.response?.transformToString() || "could not turn into string"
    // return `hello!`
}

