import prismadb from "@/lib/prismadb";

import { ColorsForm } from "./components.tsx/colors-form";

const ColorPage = async ({ 
    params 
} : { 
    params: {storeId: string,colorId: string}
}) => {

    const color = await prismadb.color.findUnique({
        where: {
            id: params.colorId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsForm initialData={color}/>
            </div>
        </div>
    )
}

export default ColorPage;