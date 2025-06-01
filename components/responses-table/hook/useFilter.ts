import { useEffect, useRef, useState } from "react";
import { ICreatorResponses } from "../../../types";

export const useFilter = (responses: ICreatorResponses[]) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredResponses, setFilteredResponses] = useState<ICreatorResponses[]>(responses);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

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
    
        return () => {
            if(debounceRef.current) {
                clearTimeout(debounceRef.current); 
            }
        }
    }, [searchTerm])
    
    return {
        searchTerm,
        setSearchTerm,
        filteredResponses,
    }
}