import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";
import Navbar from "./components/navbar";
import Layout from "./layout";

const client = generateClient<Schema>();

function App() {
  const { user, signOut } = useAuthenticator();

  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }
  async function hi() {
    let r = await client.queries.sayHello({ name: user?.signInDetails?.loginId });
    console.log(r)
  }

  return (
    <Layout>
      <button className='bg-blue-400' onClick={hi}>Hello!</button>
      <h1> You Todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content} <span onClick={() => { deleteTodo(todo.id) }}>Del.</span> </li>
        ))}
      </ul>
    </Layout>
  );
}

export default App;
