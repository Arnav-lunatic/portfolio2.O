import { windowContext } from "../App";
import { useContext } from "react";
import Window from "./window";

export default function WindowManager() {
    const { windows, setWindows } = useContext(windowContext);
    return (
        <div className="absolute inset-0">
            {windows.map((window, index) => (
                <Window
                    key={index}
                    title={window.title}
                    content={window.content}
                    onClose={() => {
                        setWindows((prev) => prev.filter((_, i) => i !== index));
                    }}
                    zIndex={index}
                />
            ))}
        </div>
    )
}