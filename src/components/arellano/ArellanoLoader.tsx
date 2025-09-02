"use client";
import { ArellanoLogo } from "@/icons"
import { useTheme } from "@/context/theme/ThemeContext";

export default function ArellanoLoader() {
    const { theme } = useTheme();
    const fillColor = theme === "dark" ? "#FFFFFF" : "#0F192A";
    
    return (
        <>     
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div className="w-28 h-28 border-8 text-[#A2BF3D] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#A2BF3D] rounded-full">
                    <ArellanoLogo fillColor={fillColor}/>
                </div>
            </div> 
        </>
    )
}