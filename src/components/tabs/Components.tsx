import { useState } from "react";
import { ComponentsObject } from "../../parser/OpenAPISpec"
import { SpecSideBar } from "../SpecSideBar"


export const Components = ({ components }: { components: ComponentsObject | undefined }) => {
    const [activeProperty, setActiveProperty] = useState<string>('');
    const propMap = new Map<string, string[] | null>();
    const componentKeys = [
        'schemas',
        'responses',
        'parameters',
        'examples',
        'requestBodies',
        'headers',
        'security schemas',
        'links',
        'callbacks',
        'patternProperties',
        'additionalProperties'
    ];

    if (components) {
        componentKeys.forEach((key) => {
            const value = components[key as keyof ComponentsObject];
            if (value) {
                propMap.set(key, Object.keys(value));
            } else {
                propMap.set(key, null);
            }
        })
    }

    const handlePropertySelect = (property: string) => {
        setActiveProperty(property);
    }
    return <div className="grid grid-cols-10 gap-1 xl:gap-3 w-full h-full">
            <div className="col-span-7 ">
                <Schema />
                {/* {activeProperty} */}
                {JSON.stringify(components?.schemas?.[activeProperty])}
                 {/* { JSON.stringify(components?.schemas) } */}
            </div>
            <div className="col-span-3 rounded-lg bg-slate-100 h-fit xl:rounded-2xl my-2 mr-2 drop-shadow-md">
                <SpecSideBar specPropertiesMap={propMap} handleItemSelect={handlePropertySelect} />
            </div>
        </div>
}

const Schema = () => {
    return <div>Schema</div>
}

