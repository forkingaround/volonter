import { Outlet } from "react-router-dom";
import NavBar from 'features/navigation/Navbar';

export default function Layout () {
    return (
        <>
            <header>
                <nav>
                    <NavBar />
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
}