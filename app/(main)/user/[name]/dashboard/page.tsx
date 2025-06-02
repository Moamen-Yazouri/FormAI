import authService from "@/module/services/auth.service";
import UserDashboard from "./components/userDashboard";
import fetchDataService from "./service/fetchData.service";
import { handleAccess } from "@/lib/triggerCoventions";
interface IProps {
    params: Promise<{name: string}>
}


export default async function UserFormActivityPage(props: IProps) {
    const name = decodeURIComponent((await props.params).name);
    const access = await authService.validateUser(name);
    handleAccess(access);

    const [
        responses,
        availableForms,
    ] = await Promise.all([
        fetchDataService.answeredForms(name),
        fetchDataService.availableForms(name),
    ]) 
    console.log(availableForms);
    const data = {
        formsCompleted: responses.length,
        formsAvailable: availableForms.length,
        averageCompletionTime: "3m 45s",
        availableForms,
        completedForms: responses,
    }
    return (
        <UserDashboard {...data} name={name}/>
    )
}
