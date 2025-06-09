import { ICreatorResponses } from "@/app/(main)/creator/[name]/dashboard/types";
import { useEffect, useRef, useState } from "react";

export const useFilter = (responses: ICreatorResponses[]) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredResponses, setFilteredResponses] = useState<ICreatorResponses[]>(responses);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const handleDelete = (responseId: string) => {
        const filteredResponses = responses.filter((response) => {
            return response.id !== responseId;
        });
        setFilteredResponses(filteredResponses);
    }
    useEffect(() => {
        if(searchTerm) {
            debounceRef.current = setTimeout(() => {
                const filtered = responses.filter((response) => {
                    return response.formTitle.toLowerCase().includes(searchTerm.toLowerCase()) 
                    || response.respondentName.toLowerCase().includes(searchTerm.toLowerCase())
                });
                setFilteredResponses(filtered);
            }, 500) 
        }
        else {
            setFilteredResponses(responses);
        }
    
        return () => {
            if(debounceRef.current) {
                clearTimeout(debounceRef.current); 
            }
        }
    }, [searchTerm])
    
    return {
        searchTerm,
        filteredResponses,
        handleDelete,
        setSearchTerm,
    }
}