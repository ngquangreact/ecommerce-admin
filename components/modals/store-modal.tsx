"use client";

import * as z from "zod";

import { useState } from "react";
import axios from "axios";
import {toast} from "react-hot-toast";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Modal } from "../ui/modal";
import { 
    Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const [loading,setLoading] = useState(false);
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });
    
    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = axios.post('/api/stores', value);

            toast.success("Store created.")
        } catch (error) {
            toast.error("Something went wrong!")
        } finally {
            setLoading(false)
        }
    };

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage categories and products"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={loading} 
                                                placeholder="E-Commerce" 
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}