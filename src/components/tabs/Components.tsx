import { ComponentsObject } from "../../parser/OpenAPISpec"
import { SpecSideBar } from "../SpecSideBar"


export const Components = ({ components }: { components: ComponentsObject | undefined }) => {
    return <div className="grid grid-cols-10 gap-1 xl:gap-3 w-full h-full">
            <div className="col-span-7 ">
                Components: { JSON.stringify(components?.schemas) }
            </div>
            <div className="col-span-3 bg-slate-100 rounded-lg xl:rounded-2xl my-2 mr-2 drop-shadow-md">
                <SpecSideBar />
            </div>
        </div>
}
// schemas
// responses
// parameters
// examples
// requestBodies
// headers
// security schemas
// links
// callbacks
// patternProperties
// additionalProperties
