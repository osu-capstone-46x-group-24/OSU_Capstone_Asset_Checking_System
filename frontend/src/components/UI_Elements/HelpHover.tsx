type helpprops = {
    text?: string;
};


export default function HelpHover({ text }: helpprops) {
    return (
        <>
            <style>
                {`
                    /* Tooltip container */
                    .tooltip {
                        position: relative;
                        border-bottom: 1px dotted black; /* Add dots under the hoverable text */
                        display: inline-flex;
                        align-items: center;
                        margin-left: 5px;
                    }


                    /* hover visibility (unsure about this w React) */
                    .tooltip:hover .tooltiptext {
                        visibility: visible;
                    }
                    
                    /* text */
                    .tooltiptext {
                        visibility: hidden;
                        background-color: white;
                        color: #000;
                        padding: 8px 12px;
                        border-radius: 8px;
                        position: absolute;
                        left: 150%;
                        width: 250px;
                        border: 4px outset #CECFC7;
                        z-index: 1;
                    }

                    /* OUTER triangle (border) */
                    .tooltiptext::before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        right: 100%;
                        transform: translateY(-50%);
                        border-width: 10px;
                        border-style: solid;
                        border-color: transparent #CECFC7 transparent transparent;
                    }

                    /* INNER triangle fill */
                    .tooltiptext::after {
                        content: "";
                        position: absolute;
                        top: 50%;
                        right: 100%;
                        transform: translateY(-50%);
                        border-width: 6px;
                        border-style: solid;
                        border-color: transparent white transparent transparent;
                    }
                `}
            </style>
            <div className="tooltip">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-black"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <text x="12" y="17" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor" fontFamily="sans-serif">?</text>
                </svg>
                <span className="tooltiptext">{text}</span>
            </div>
        </>
    )
}