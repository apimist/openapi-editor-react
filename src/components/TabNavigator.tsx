import { useState } from "react";
import { BiSolidComponent } from "react-icons/bi";
import { FaServer } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { TbApiApp } from "react-icons/tb";

export const TabNavigator = () => {
    const tabs = ["General", "Servers", "Paths", "Components", "Security"];
    const [activeTab, setActiveTab] = useState<string>('General');

    return <div className="flex h-20 justify-evenly w-full border-b border-[#6D63CD]">
        {tabs.map((field) =>
            <button 
            key={field} 
            onClick={() => setActiveTab(field)}
            className={`w-full justify-center hover:bg-slate-100 ${activeTab === field ? "border-b-4 border-[#6D63CD]" : ""}`}>
            <div className="flex justify-center">
                <SpecPropertiesIcon field={field} />
            </div>
            <div className="flex justify-center text-sm">
                {field}
            </div>
        </button>
        )}
    </div>
}

function SpecPropertiesIcon({ field }: { field: string }) {
    let content;

    switch (field) {
        case "General":
            content = (
                <IoInformationCircle color="6D63CD" size={30} />
            );
            break;
        case "Servers":
            content = (
                <FaServer color="6D63CD" size={30} />
            );
            break;
        case "Paths":
            content = (
                <TbApiApp color="6D63CD" size={30} />
            );
            break;
        case "Components":
            content = (
                <BiSolidComponent color="6D63CD" size={30} />
            );
            break;
        case "Security":
            content = (
                <MdSecurity color="6D63CD" size={30} />
            );
    }
    return content;
}