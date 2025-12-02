// FilterPanel.tsx

// Imports

// Types
type FilterProperty = {
    name: string;
    boolValue?: boolean;
    strValue?: string;
};

type FilterPanelProps = {
    fieldList: FilterProperty[] | null;
    theme: "light" | "dark";
    // setTheme: (t: "light" | "dark") => void;
};

/**
 * Name: FilterPanel
 * Type: Component
 * Description: Displays passed parameters for the user to specify to configure a filter
 */
export default function FilterPanel({ theme }: FilterPanelProps) {
    const consoleParams =
        theme === "light"
            ? {
                  color_primary_text: "wu-gray-200",
                  color_primary_bg: "wu-gray-400",
                  color_accent_text: "wu-gray-400",
                  color_accent_bg: "wu-gray-200",
              }
            : {
                  color_primary_text: "wu-gray-200",
                  color_primary_bg: "wu-gray-500",
                  color_accent_text: "wu-gray-500",
                  color_accent_bg: "wu-gray-200",
              };

    return (
        <>
            <div className={`w-max h-max flex flex-col bg-${consoleParams}`}>
                <dialog className="">
                    <></>
                </dialog>
            </div>
        </>
    );
}
