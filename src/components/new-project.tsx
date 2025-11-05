
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"


import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Button } from "./ui/button";
import { useState } from "react";
const client = generateClient<Schema>();


export default function NewProject() {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")


    async function createProject() {

        await client.models.Project.create({ name, description });
        setName("")
        setDescription("")
    }


    return <div className="mx-auto w-fit my-6">
        <Dialog>
            <form onSubmit={createProject}>
                <DialogTrigger asChild>
                    <Button >Create a new project</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a new project</DialogTitle>
                        <DialogDescription>
                            Select a name and a description for your new project
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-id">Name</Label>
                            <Input id="name-id" placeholder="Project name" name="name" defaultValue={name} onChange={(e) => { setName(e.target.value) }} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="description-id">Description</Label>
                            <Input id="description-id" name="description" defaultValue={description} placeholder="Project description" onChange={(e) => { setDescription(e.target.value) }} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={createProject}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </div>
}


