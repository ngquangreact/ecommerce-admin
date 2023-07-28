"use client";

import { 
    Copy, 
    Edit, 
    MoreHorizontal, 
    Trash 
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";

import { ColorColumn } from "./column";

interface CellActionProps {
    data: ColorColumn
}

const CellAction:React.FC<CellActionProps> = ({
    data
}) => {
    const [loading,setLoading] = useState(false);
    const [open,setOpen] = useState(false);

    const router = useRouter();
    const params = useParams();
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Color id copied to the clipboard.");
    }
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colors/${data.id}`);
            router.refresh();
            toast.success("Color deleted.");
        } catch (error) {
            toast.error("Make sure you removed all products using this color first!");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }
    return (
        <>
            <AlertModal
                loading={loading}
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
            />
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4"/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="h-4 w-4 mr-2"/>
                        Copy
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}>
                        <Edit className="h-4 w-4 mr-2"/>
                        Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default CellAction;