import UserDashboard from "../components/userDashboard";
import fetchDataService from "../service/fetchData.service";
interface IProps {
    params: Promise<{name: string}>
}
        const mockData = {
        formsCompleted: 6,
        formsAvailable: 4,
        averageCompletionTime: "3m 45s",
        completedForms: [
            {
                id: "form-1",
                title: "Customer Feedback Survey",
                date: "2 days ago",
            },
            {
                id: "form-2",
                title: "Product Satisfaction",
                date: "1 week ago",
            },
            {
                id: "form-3",
                title: "Website Usability Test",
                date: "2 weeks ago",
            },
            {
                id: "form-4",
                title: "Service Quality Evaluation",
                date: "3 weeks ago",
            },
            {
                id: "form-5",
                title: "Feature Request Form",
                date: "1 month ago",
            },
            {
                id: "form-6",
                title: "User Experience Survey",
                date: "1 month ago",
            },
        ],
        availableForms: [
            {
                id: "form-7",
                formTitle: "Quarterly Feedback",
                description: "Help us improve our services with your quarterly feedback",
                deadline: "3 days left",
                creator: "Sarah Johnson",
            },
            {
                id: "form-8",
                formTitle: "New Feature Evaluation",
                description: "Evaluate our latest features and provide your thoughts",
                deadline: "5 days left",
                creator: "Michael Chen",
            },
            {
                id: "form-9",
                formTitle: "User Satisfaction Survey",
                description: "Tell us about your overall satisfaction with our platform",
                deadline: "1 week left",
                creator: "Alex Rodriguez",
            },
            {
                id: "form-10",
                formTitle: "Product Improvement Ideas",
                description: "Share your ideas on how we can improve our products",
                creator: "Emily Parker",
            },
        ],
        }

export default async function UserFormActivityPage(props: IProps) {
    const name = decodeURIComponent((await props.params).name)
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
        <UserDashboard {...data}/>
    )
}
