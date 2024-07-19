import { SideBar } from "./Sidebar"

export const OpenApiEditor = () => {
    return (
        <div className="flex">
            <div className="w-full">
                Main Screen
            </div>
            <div className="border-l border-[#6D63CD] hidden md:block">
                <SideBar />
            </div>
        </div>
    )
}