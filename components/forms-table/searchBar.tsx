"use client"

import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

interface IProps {
    placeholder: string
    search: string
    setSearch: (value: string) => void
}

const SearchBar = (props: IProps) => {
    return (
        <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
            placeholder={props.placeholder}
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
            className="pl-10"
        />
        </div>
    )
}

export default SearchBar
