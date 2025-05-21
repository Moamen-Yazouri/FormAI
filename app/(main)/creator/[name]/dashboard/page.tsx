import CreatorDashboard from '../dashboard/components/creatorDashboard';
import FetchServices from '../dashboard/services/fetchData.service'

// export const formData: IFormData[] = [
//   {
//     id: "f1",
//     title: "Customer Satisfaction Survey",
//     createdAt: "2025-04-25T10:00:00Z",
//     responsesCount: 120,
//     status: "active",
//     conversionRate: 65.4,
//   },
//   {
//     id: "f2",
//     title: "Product Feedback Form",
//     createdAt: "2025-04-22T14:30:00Z",
//     responsesCount: 76,
//     status: "draft",
//     conversionRate: 42.1,
//   },
//   {
//     id: "f3",
//     title: "Event Registration",
//     createdAt: "2025-04-15T08:00:00Z",
//     responsesCount: 204,
//     status: "archived",
//     conversionRate: 78.9,
//   },
//   {
//     id: "f4",
//     title: "Weekly Check-in",
//     createdAt: "2025-04-30T09:15:00Z",
//     responsesCount: 50,
//     status: "active",
//     conversionRate: 55.6,
//   },
//   {
//     id: "f5",
//     title: "Employee Feedback",
//     createdAt: "2025-05-02T11:45:00Z",
//     responsesCount: 33,
//     status: "draft",
//     conversionRate: 36.2,
//   },
// ];

// interface IFormData {
//   id: string
//   title: string
//   createdAt: string
//   responsesCount: number
//   status: "active" | "draft" | "archived"
//   conversionRate: number
// }
// interface IFormCreationData {
//   date: string
//   count: number
// }

// interface IFormResponseData {
//   formId: string
//   formTitle: string
//   responsesCount: number
// }

// interface ICreatorActivityData {
//   date: string
//   formsCreated: number
//   responsesReceived: number
// }
// export const formCreationData: IFormCreationData[] = [
//   { date: "2025-04-28", count: 3 },
//   { date: "2025-04-29", count: 5 },
//   { date: "2025-04-30", count: 2 },
//   { date: "2025-05-01", count: 4 },
//   { date: "2025-05-02", count: 6 },
// ];

// export const formResponseData: IFormResponseData[] = [
//   { formId: "1", formTitle: "Customer Feedback", responsesCount: 12 },
//   { formId: "2", formTitle: "UI Preferences", responsesCount: 30 },
//   { formId: "3", formTitle: "Bug Report", responsesCount: 5 },
//   { formId: "4", formTitle: "Event Signup", responsesCount: 89 },
//   { formId: "5", formTitle: "Weekly Report", responsesCount: 17 },
// ];

// export const creatorActivityData: ICreatorActivityData[] = [
//   { date: "2025-04-28", formsCreated: 3, responsesReceived: 15 },
//   { date: "2025-04-29", formsCreated: 2, responsesReceived: 8 },
//   { date: "2025-04-30", formsCreated: 4, responsesReceived: 21 },
//   { date: "2025-05-01", formsCreated: 5, responsesReceived: 33 },
//   { date: "2025-05-02", formsCreated: 1, responsesReceived: 9 },
// ];
interface IProps {
  params: Promise<{name: string}>; 
}
const page = async (props: IProps) => {
      const {name} = await props.params; 

      const [
        formData,
        formCreationData,
        formResponseData,
        creatorActivityData,
        responses,
    ] = await Promise.all([
        FetchServices.formsData(name),      
        FetchServices.formCreationData(name),
        FetchServices.formResponseData(name),
        FetchServices.creatorActivityData(name),
        FetchServices.creatorResponses(name),
    ]);
  return (
    <CreatorDashboard 
      formsData={formData} 
      formCreationData={formCreationData} 
      formResponsesData={formResponseData} 
      creatorActivityData={creatorActivityData}
      responses={responses}
    />
  )
}

export default page