import Layout from "@/layout";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Schema } from "amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { useParams } from "react-router-dom";


const client = generateClient<Schema>();

export default function Project() {
    const { id } = useParams();
    const { user } = useAuthenticator();

    async function hi() {
        let r = await client.queries.sayHello({ name: user?.signInDetails?.loginId });
        console.log(r)
    }

    return <Layout>
        <button className='bg-blue-400' onClick={hi}>Hello!</button>
        <h1>Tha Project {id}</h1>
    </Layout>
}