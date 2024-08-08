import { useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";

interface SpecSideBarItemProps {
    propertyType: string;
    properties: string[];
    isOpen: boolean;
    onToggle: () => void;
}

const SpecSideBarItem = ({ propertyType, properties, isOpen, onToggle }: SpecSideBarItemProps) => {



    return <div className="w-full bg-slate-100">
        <button
            className="flex justify-between w-full p-2"
            onClick={onToggle}>
            <div className="flex justify-center">
                {propertyType}
            </div>
            <div className="flex justify-center">
                {isOpen ? <HiChevronDown color="6D63CD" size={20} /> : <HiChevronRight color="6D63CD" size={20} />}
            </div>
        </button>
        {/* TODO: add styling to scroll bar */}
        <div className="w-full max-h-52 xl:max-h-96 bg-slate-200 overflow-y-auto">
            {isOpen && properties.map((property) =>
                <button
                    className="w-full flex justify-start ps-2 py-2 mb-0.5 bg-slate-300"
                    key={property}>
                    <p className="text-sm text-ellipsis overflow-hidden">{property}</p>
                </button>
            )}
        </div>
    </div>
}

export const SpecSideBar = () => {
    const [activeProperty, setActiveProperty] = useState<string | null>(null);
    const propMap = new Map<string, string[]>();

    const handleClick = (propertyType: string) => {
        setActiveProperty((prevActive) => (prevActive === propertyType ? null : propertyType));
    }
    propMap.set('General', ['title', 'version']);
    propMap.set('Servers', ['url', 'description']);
    propMap.set('Paths', ['path', 'description']);
    propMap.set('Components', ['schemas', 'responses', 'parameters', 'examples', 'requestBodies', 'headers', 'security schemas', 'links', 'callbacks', 'patternProperties', 'additionalProperties']);
    propMap.set('Security', ['securitySchemes']);
    return <div className="w-full h-full divide-y divide-[#6D63CD]">
        {Array.from(propMap).map(([propertyType, properties]) =>
            <SpecSideBarItem
                key={propertyType}
                propertyType={propertyType}
                properties={properties}
                isOpen={activeProperty === propertyType}
                onToggle={() => handleClick(propertyType)} />
        )}
    </div>
}