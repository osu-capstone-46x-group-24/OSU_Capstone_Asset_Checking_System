import '../App.css'
import Footer from "../components/UI_Elements/Footer.tsx";
import Navbar from "../components/UI_Elements/Navbar.tsx";
import Modal from "../components/UI_Elements/Modal.tsx";

const displayModal: boolean = true;

function UserDashboard() {

    return (
        <div className="absolute w-full top-0 left-0 bg-neutral-100 dark:bg-neutral-800">

            <Navbar />

            {/* Body */}
            <div className="relative min-h-180 w-full pt-19">
                <div className="flex flex-col pt-20">
                    <div className="basis-12 py-6 text-7xl font-sans font-size-body mt-20">
                        <a
                            href="/Home">
                            Dashboard
                        </a>
                        <div>
                            {displayModal ?
                            <Modal
                                bg_color={"neutral-500"}
                                window_title={"Window Title"}
                                window_description={"Description Example"}
                                button_position={"bl"}
                                contains_button={true}
                            />
                                : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default UserDashboard;
