"use client";
import { ArellanoLogo } from "@/icons"
import { useTheme } from "@/context/theme/ThemeContext";

export default function ArellanoLoader() {
    const { theme } = useTheme();

    const svgFillColor = theme === "light" ? "#16263C" : "#FFFFFF";

    return (
        <>     
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-28 h-28 border-8 text-[#15253C] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#15253C] rounded-full dark:text-[#A2BF3D] dark:border-t-[#A2BF3D]">
                    <ArellanoLogo fillColor={svgFillColor}/>
                </div>
            </div> 
        </>
    )
}