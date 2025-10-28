import "tailwindcss";

function MainBody({ title_text, subtitle_text }) {
    return (
        <div className="bg-amber-100 dark:bg-gray-950 absolute top-1/10 left-0 w-full h-85/100">
            <div className="flex flex-col">
                <div className="basis-48"></div>
                <div className="basis-12 text-7xl
                text-orange-600 dark:text-amber-100
                font-sans font-size-body">
                    <a
                       href="https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=6RBYZj9tMGMllxTk">
                        {title_text}
                    </a>
                </div>

                <div className="basis-16"></div>

                <div className="basis-12 text-xl text-gray-900 text-white">
                    <p>
                        {subtitle_text}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MainBody;