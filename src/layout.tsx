
import Navbar from "./components/navbar";

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return (
        <main className=''>
            <Navbar />
            <main className="p-1">
                {children}
            </main>
        </main>
    );
}