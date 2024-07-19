import { BiSolidComponent } from "react-icons/bi";
import { FaServer } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { MdSecurity } from "react-icons/md";
import { TbApiApp } from "react-icons/tb";

export const SideBar = () => {
    return <div className="grid grid-rows-10 gap-5 min-w-fit">
        <SidebarItem field="General" />
        <SidebarItem field="Servers" />
        <SidebarItem field="Paths" />
        <SidebarItem field="Components" />
        <SidebarItem field="Security" />
    </div>
}

function SidebarItem({ field }: { field: string }) {
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


    return <div className="row-span-1 justify-center p-1 hover:bg-slate-200">
        <div className="flex flex-col justify-center pt-4">
            <div className="flex justify-center">
                {content}
            </div>
            <div className="flex justify-center pt-1 text-sm">
                {field}
            </div>
        </div>
    </div>
}