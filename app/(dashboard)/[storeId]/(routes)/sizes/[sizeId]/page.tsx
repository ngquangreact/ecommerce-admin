import prismadb from "@/lib/prismadb";

import { SizesForm } from "./components.tsx/sizes-form";

const SizePage = async ({ 
    params 
} : { 
    params: {storeId: string,sizeId: string}
}) => {

    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizesForm initialData={size}/>
            </div>
        </div>
    )
}

export default SizePage;