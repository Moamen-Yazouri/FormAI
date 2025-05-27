"use client"
import { UserRoles } from '@/@types'
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Eye, MessageSquare } from 'lucide-react';
import { redirect } from 'next/navigation';
import { AuthContext } from '@/providers/auth/authProvider';
import { useContext } from 'react';
import Loader from '../app-sidebar/loader';
import { useRouter } from 'next/navigation';

interface IProps {
    id: string;
}
const ActionsProvider = (props: IProps) => {
    const {user, isLoading} = useContext(AuthContext);
    const router = useRouter();
    if(isLoading) return <Loader/>
    if(!user) return null;
    switch(user.role) {
        case "admin" : {
            return (
                <>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push(`/view-form/${props.id}`)}>
                        <Eye className="h-4 w-4" />
                        View Form
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push(`/answer-form/${props.id}`)}>
                        <Eye className="h-4 w-4"/>
                        Answer Form
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" onClick={() => router.push(`/form-answers/${user.name}/${props.id}`)}/>
                        View Responses
                    </DropdownMenuItem>
                </>
            )
        }
        case "creator" : {
            return(
                <>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push(`/view-form/${props.id}`)}>
                        <Eye className="h-4 w-4"/>
                        View Form
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2" onClick={() => router.push(`/form-answers/${user.name}/${props.id}`)}>
                        <MessageSquare className="h-4 w-4"/>
                        View Responses
                    </DropdownMenuItem>
                </>
            )
        }
        default: return null;
    }
}

export default ActionsProvider