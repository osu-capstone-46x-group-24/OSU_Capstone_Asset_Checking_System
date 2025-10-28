import '../App.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainBody from "../components/MainBody";

function SplashPage() {

    return (
        <div className="bg-amber-100 dark:bg-gray-950">
            <Header />
            <MainBody title_text={"Capstone - Group 24"} subtitle_text={"Check In / Out System for Assets"}/>
            <Footer/>
        </div>
    );
}

export default SplashPage;
