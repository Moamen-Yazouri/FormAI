"use client"
import { IUserData } from "@/@types";
import { useEffect, useRef, useState } from "react";

export const useFilter = (users: IUserData[] ) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [filteredUsers, setFilteredUsers] = useState<IUserData[]>(users);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);
    const handleDelete = (userId: string) => {
        const filteredUsers = users.filter((user) => {
            return user.id !== userId;
        });
        setFilteredUsers(filteredUsers);
    }
    useEffect(() => {
        if(searchTerm) {
            debounceRef.current = setTimeout(() => {
                const filteredUsers = users.filter((user) => {
                    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
                });
                setFilteredUsers(filteredUsers);
            }, 500);
        }
        else {
            setFilteredUsers(users);
        }
        return () => {
            if(debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        }
    }, [searchTerm]);

    return {
        searchTerm,
        filteredUsers,
        handleDelete,
        setSearchTerm,
    }
}