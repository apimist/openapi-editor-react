import { useEffect, useState } from "react";
import OpenAPISpecViewer from "./openapi-spec-viewer"

import { TabNavigator } from "./TabNavigator"
import { Components } from "./tabs/Components";
import { General } from "./tabs/General";
import { Paths } from "./tabs/Paths";
import { Servers } from "./tabs/Servers";
import { Security } from "./tabs/Security";
import spec from './../assets/petstore.json'
import { OpenAPISpecParser } from "../parser/OpenAPISpecParser";


export const OpenApiEditor = () => {
    const [activeTab, setActiveTab] = useState<string>('General');
    const [parsedSpec, setParsedSpec] = useState<OpenAPISpecParser | null>(null);

    useEffect(() => {
        try {
            const newSpec = new OpenAPISpecParser(JSON.stringify(spec));
            console.log(newSpec);
            setParsedSpec(newSpec);
        } catch (err) {
            // TODO: handle error
            console.log(err);
        }
        
    }, [])

    const handleTabChange = (newTab: string): void => {
        setActiveTab(newTab);
    }
    return (
        <div className="w-full min-w-96 h-screen flex">
            <div className="h-full w-1/3 bg-slate-300">

            </div>
            <div className="flex w-full flex-col">
                <div className="w-full h-12 bg-slate-300 flex justify-center">
                    
                </div>
                {/* <OpenAPISpecViewer /> */}
                <TabNavigator onTabChange={handleTabChange} />
                <div className="h-full w-full">
                    {activeTab === 'Components' && <Components components={parsedSpec?.getComponents()} />}
                    {activeTab === 'General' && <General />}
                    {activeTab === 'Paths' && <Paths />}
                    {activeTab === 'Servers' && <Servers />}
                    {activeTab === 'Security' && <Security />}
                </div>
                
            </div>
            <div className="h-full w-1/4 bg-slate-300">

            </div>
        </div>
    )
}
