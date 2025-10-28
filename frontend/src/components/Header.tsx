//import ButtonIcon from "./ButtonIcon.tsx";
import { MoonIcon } from "@heroicons/react/24/solid";
import osu_horizontal_light from "../images/osu-horizontal-light.svg";
import "tailwindcss";

function Header() {
    return (
        <div className="absolute flex flex-row justify-self-left inset-x-0 top-0 w-full h-1/10 items-center pr-3 pl-3
        bg-gray-800 dark:bg-gray-200 font-sans font-size-body">

            <a href="/" className="basis-10/100 self-center align-flex">
                <img src={osu_horizontal_light} alt="osu logo / home button"/>
            </a>

            <div className="grow"></div>

            <a href="#" className="basis-16 self-center content-end text-gray-800">
                <MoonIcon className="color-white w-16 h-16"/>
            </a>
        </div>
    );
}

export default Header;