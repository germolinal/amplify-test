import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useAuthenticator } from "@aws-amplify/ui-react";

import Layout from "../layout";
import { Copy, FolderOpenDot, Trash } from "lucide-react";
import NewProject from "@/components/new-project";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const client = generateClient<Schema>();


function NoProjects() {
    return <Empty>
        <EmptyHeader>
            <EmptyMedia variant="icon">
                <FolderOpenDot />
            </EmptyMedia>
            <EmptyTitle>There are no projects</EmptyTitle>
            <EmptyDescription>Start by creating one</EmptyDescription>
        </EmptyHeader>

    </Empty>
}



function formatDate(d: string): string {
    const aux = d.split("T")
    const day = aux[0]
    const full_hour = aux[1].split(':')
    const hour = `${full_hour[0]}:${full_hour[1]}`
    return day + " " + hour
}

export default function AllProjects() {
    const { user } = useAuthenticator();


    const [projects, setProjects] = useState<Array<Schema["Project"]["type"]>>([]);

    useEffect(() => {
        const sub = client.models.Project.observeQuery().subscribe({
            next: (data) => setProjects([...data.items]),
        });

        return () => sub.unsubscribe();
    }, []);

    // function deleteProject(id: string) {
    //     client.models.Project.delete({ id })
    // }



    return (
        <Layout>




            {projects.length === 0 &&
                <NoProjects />
            }
            <NewProject />
            {projects.length > 0 &&
                <div className='max-w-[900px] mx-auto mt-1'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead >ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Updated</TableHead>
                                {/* <TableHead className='text-right'>Actions</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                projects.map((p) => {
                                    return <TableRow key={p.id}>
                                        <TableCell >
                                            <Button variant='ghost' size="icon" onClick={() => { navigator.clipboard.writeText(p.id) }}><Copy /></Button>
                                        </TableCell>
                                        <TableCell >
                                            <Link to={`/project/${p.id}`}>
                                                {p.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{p.description}</TableCell>
                                        <TableCell>{formatDate(p.createdAt)}</TableCell>
                                        <TableCell>{formatDate(p.updatedAt)}</TableCell>
                                        {/* <TableCell className="text-right">
                                            <Button variant='ghost' className="text-destructive" size="icon" onClick={() => { deleteProject(p.id) }}><Trash /></Button>
                                        </TableCell> */}
                                    </TableRow>

                                })
                            }
                        </TableBody>
                    </Table>
                </div>
            }


        </Layout>
    );
}


