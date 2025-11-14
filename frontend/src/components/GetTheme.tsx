const GetTheme = () => {
    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme === "dark") {
        return "dark";
    } else {
        return "light";
    }
};

export default GetTheme;
