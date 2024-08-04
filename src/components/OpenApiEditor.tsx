import { SideBar } from "./Sidebar"
// import OpenAPIParser from "@readme/openapi-parser"
// import petstore from "../assets/petstore.json"
// import TwoColumnCollapsible from "./two-column-collapsible"


export const OpenApiEditor = () => {

    return (
        <div className="flex">
            <div className="border-r border-[#6D63CD] hidden md:block">
                <SideBar />
            </div>
            <div className="w-full">
               {/* { api.info.title } */}
               Main
            </div>
        </div>
    )
}