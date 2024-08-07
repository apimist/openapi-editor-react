import { ComponentsObject } from "../../parser/OpenAPISpec"


export const Components = ({ components }: { components: ComponentsObject | undefined }) => {
    return <div className="grid grid-cols-10 w-full h-full">
            <div className="col-span-7">
                Components: { JSON.stringify(components?.schemas) }
            </div>
            <div className="col-span-3 bg-slate-100 h-full">
                <div className="grid grid-rows-10">
                    <div className="row-span-2 bg-slate-200 h-full">
                        Responses: { JSON.stringify(components?.headers) }
                    </div>
                </div>
                
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
