import { Outlet } from "react-router-dom";
import Header from "../components/Header/index";
import Footer from "../components/Footer/index";

export default function RootLayout() {
    return (
        <div className="root_layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
