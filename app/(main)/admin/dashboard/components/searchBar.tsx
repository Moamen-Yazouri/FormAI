import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { SetStateAction } from 'react'
interface IProps {
    search: string;
    setSearch:  (value: SetStateAction<string>) => void;
    placeholder?: string;
}
const SearchBar = (props: IProps) => {
    return (
        <div className="flex items-center mb-4">
            <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input placeholder={props.placeholder} className="pl-8 bg-white"
                    value={props.search}
                    onChange={
                        (e) => props.setSearch(e.target.value)
                    }/>
            </div>
        </div>
        )
}

export default SearchBar;