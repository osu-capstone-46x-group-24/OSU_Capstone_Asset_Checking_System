//import Icons from "../assets/icons";

function RenderImage({ url, icon }) {
    if (url) {
        return <a href={url}></a>
    }
}

function Icon({ url, icon}) {
    return (
        <a className="flex items-center">
            <RenderImage
                url={url}
                icon={icon}
            />
        </a>
    );
}

export default Icon;