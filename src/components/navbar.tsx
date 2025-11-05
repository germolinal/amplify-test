import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Navbar() {

    const { signOut } = useAuthenticator();

    return <div className='flex py-1 px-2 container-wrapper bg-background shadow-md'>
        <Link to={"/"}>
            <Button variant="ghost" >Projects</Button>
        </Link>
        <span className="grow"></span>
        <Button variant='ghost' onClick={signOut}>Sign Out</Button>
    </div>
}