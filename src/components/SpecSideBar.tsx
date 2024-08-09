import { useState } from "react";
import { HiChevronDown, HiChevronRight, HiDocumentAdd } from "react-icons/hi";

interface SpecSideBarItemProps {
    propertyType: string;
    properties: string[] | null;
    isOpen: boolean;
    onToggle: () => void;
    onPropertySelect: (property: string) => void;
}

const SpecSideBarItem = ({ propertyType, properties, isOpen, onToggle, onPropertySelect }: SpecSideBarItemProps) => {
    const [activeProperty, setActiveProperty] = useState<string>('');

    const handleItemSelect = (property: string) => {
        if (activeProperty !== property) {
            setActiveProperty(property);
            onPropertySelect(property);
        }
    }

    return <div className="w-full bg-slate-100">
        <button
            className="flex justify-between w-full p-2"
            onClick={onToggle}>
            <div className="flex justify-center">
                {propertyType}
            </div>
            <div className="flex justify-center">
                {/* TODO: if properties is null, then show add button */}
                {isOpen && properties ? <HiChevronDown color="6D63CD" size={20} /> : <HiChevronRight color="6D63CD" size={20} />}
            </div>
        </button>
        {/* TODO: add styling to scroll bar */}
        <div className="w-full max-h-52 xl:max-h-96 bg-slate-200 overflow-y-auto">
            {isOpen && properties?.map((property) =>
                <button
                    className={`w-full flex justify-start ps-2 py-2 mb-0.5 ${activeProperty === property ? "bg-slate-500" : "bg-slate-300"}`}
                    key={property}
                    onClick={() => handleItemSelect(property)}>
                    <p className={`text-sm text-ellipsis overflow-hidden ${activeProperty === property ? "text-white" : "text-black"}`}>{property}</p>
                </button>
            )}
            {isOpen && <button
                className="w-full flex justify-start px-2 py-2 mb-0.5 bg-slate-300">
                <HiDocumentAdd color="6D63CD" size={20} />
                <p className="text-sm text-ellipsis overflow-hidden pl-2"> Add </p>
            </button>
            }
        </div>
    </div>
}

interface SpecSideBarProps {
    specPropertiesMap: Map<string, string[] | null>;
    handleItemSelect: (property: string) => void;
}

export const SpecSideBar = ({ specPropertiesMap, handleItemSelect }: SpecSideBarProps) => {
    const [activeProperty, setActiveProperty] = useState<string | null>(null);
    const propMap = new Map<string, string[]>();

    const handleClick = (propertyType: string) => {
        setActiveProperty((prevActive) => (prevActive === propertyType ? null : propertyType));
    }

    propMap.set('schemas', ['Pet', 'Order', 'User', 'Pet', 'Order', 'User', 'Pet', 'Order', 'User']);
    propMap.set('responses', ['200', '404', '500']);
    propMap.set('parameters', ['petId', 'userId', 'status']);
    propMap.set('examples', ['application/json', 'application/xml']);
    propMap.set('requestBodies', ['PetRequest', 'OrderRequest']);
    propMap.set('headers', ['X-Rate-Limit', 'X-Request-ID']);
    propMap.set('security schemas', ['apiKeyAuth', 'oauth2', 'basicAuth']);
    propMap.set('links', ['GetUserByUserId', 'GetPetById']);
    propMap.set('callbacks', ['onData', 'onComplete']);
    propMap.set('patternProperties', ['^x-', '^y-']);
    propMap.set('additionalProperties', ['true', 'false']);
    propMap.set('patternProperties', ['^x-', '^y-']);
    propMap.set('additionalProperties', ['true', 'false']);
    propMap.set('patternPrdfdsdsoperties', ['^x-', '^y-']);
    propMap.set('additionalPrfgfdoperties', ['true', 'false']);
    return <div className="w-full h-full divide-y divide-[#6D63CD]">
        {Array.from(specPropertiesMap).map(([propertyType, properties]) =>
            <SpecSideBarItem
                key={propertyType}
                propertyType={propertyType}
                properties={properties}
                isOpen={activeProperty === propertyType}
                onToggle={() => handleClick(propertyType)}
                onPropertySelect={handleItemSelect} />
        )}
    </div>
}