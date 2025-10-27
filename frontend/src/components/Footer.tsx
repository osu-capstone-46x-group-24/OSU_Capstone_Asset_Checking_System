//import ButtonIcon from "./ButtonIcon.tsx";
import github_light from "../images/github-mark-light.svg";


function Footer() {
    return (
        <footer className="absolute flex flex-row justify-self-left inset-x-0 left-0 bottom-0 w-full bg-white h-1/15 items-center pr-3">
            <p className="basis-155 justify-self-start self-auto self-center text-black">
                © 2025 Artur Dubanaev, Ethan Shiota, Michael Zandonella, Mick Forsman, Ryan Dobkin
            </p>
            <div className="grow"></div>
            <a href="https://github.com/ryandobkin/OSU_Capstone_Asset_Checking_System" className="basis-8 self-auto justify-self">
                <img src={github_light} alt="github"/>
            </a>
        </footer>
    );
}

export default Footer;