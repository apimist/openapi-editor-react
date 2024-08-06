
export const TabNavigator = () => {
    return <div className="flex justify-evenly w-full hover:bg-slate-200">
        {["General", "Servers", "Paths", "Components", "Security"].map((field) =>
            <div className="flex justify-center">
            <div className="flex justify-center">
                content
            </div>
            <div className="flex justify-center text-sm">
                {field}
            </div>
        </div>
        )}
    </div>
}