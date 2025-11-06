import '../App.css'
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";

function AdminDashboard() {

    return (
        <div className="absolute w-full top-0 left-0 bg-neutral-100 dark:bg-neutral-800">

            <Navbar />

            {/* Body */}
            <div className="relative min-h-180 w-full pt-19">
                <div className="flex flex-col pt-20">
                    <div className="basis-12 py-6 text-7xl font-sans font-size-body mt-20">
                        <a
                            href="/Home">
                            Admin Dashboard :)
                        </a>
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default AdminDashboard;
