import UserDashboard from "./components/userDashboard";
import fetchDataService from "./service/fetchData.service";
interface IProps {
    params: Promise<{name: string}>
}


export default async function UserFormActivityPage(props: IProps) {
    const name = decodeURIComponent((await props.params).name);
    const [
        responses,
        availableForms,
    ] = await Promise.all([
        fetchDataService.answeredForms(name),
        fetchDataService.availableForms(name),
    ]) 
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
