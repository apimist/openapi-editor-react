import OpenAPISpecViewer from "./openapi-spec-viewer"
import { SideBar } from "./Sidebar"
import { TabNavigator } from "./TabNavigator"


export const OpenApiEditor = () => {

    return (
        <div className="w-screen h-screen flex">
            <div className="h-full w-1/4 bg-slate-300">
            
            </div>
            <div className="flex w-full flex-col">
                <div className="w-full h-12 bg-slate-300 flex justify-center">
                    Main
                </div>
                <TabNavigator />
            </div>
            <div className="h-full w-1/3 bg-slate-300">

            </div>
        </div>
    )
}
