"use client";
import { IFormTable } from "@/@types";
import { useEffect, useRef, useState } from "react";

export const useFilter = (forms: IFormTable[]) => {
    const [filteredForms, setFilteredForms] = useState<IFormTable[]>(forms);
    const [searchTerm, setSearchTerm] = useState("");
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);
    const handleDelete = (formId: string) => {
        const updatedForms = filteredForms.filter((form) => form.id !== formId);
        setFilteredForms(updatedForms);
    }
    useEffect(() => {
        debounceTimer.current = setTimeout(() => {
            if(searchTerm && searchTerm.length > 0) {
                const filtered = forms.filter((form) => form.name.toLowerCase().includes(searchTerm.toLowerCase()));
                setFilteredForms(filtered); 
            }   
            else{
                setFilteredForms(forms);
            }
        }, 500);
        return () => {
            if(debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        }
    }, [searchTerm]);

    return{
        filteredForms,
        searchTerm,
        handleDelete,
        setSearchTerm,
    }
}