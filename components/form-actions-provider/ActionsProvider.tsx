import { UserRoles } from '@/@types'
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Eye, MessageSquare } from 'lucide-react';
import { redirect } from 'next/navigation';

interface IProps {
    role: UserRoles;
    id: string;
}
const ActionsProvider = (props: IProps) => {
    switch(props.role) {
        case "admin" : {
            return (
                <>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => redirect(`/view-form/${props.id}`)}>
                        <Eye className="h-4 w-4" />
                        View Form
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => redirect(`/answer-form/${props.id}`)}>
                        <Eye className="h-4 w-4"/>
                        Answer Form
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4"/>
                        View Responses
                    </DropdownMenuItem>
                </>
            )
        }
        case "creator" : {
            return(
                <>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => redirect(`view-form/${props.id}`)}>
                        <Eye className="h-4 w-4"/>
                        View Form
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4"/>
                        View Responses
                    </DropdownMenuItem>
                </>
            )
        }
        case "user" : {
            return (
                <>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => redirect(`view-form/${props.id}`)}>
                        <Eye className="h-4 w-4"/>
                            Answer Form
                    </DropdownMenuItem>
                </>
            )
        }
    }
}

export default ActionsProvider