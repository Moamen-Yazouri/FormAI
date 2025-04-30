import React from 'react';
import AdminDashboard from './components/adminDashboard';
import FetchData from "./services/fetchData.service";
import { connection } from '@/DB/connection';
import FormModel from '@/DB/models/form.model';

const page = async() => {
//     await connection();
//     FormModel.updateMany(
//   { "fields._id": { $type: "string" } }, // optional filter: only if _id is a string
//   [
//     {
//       $set: {
//         "fields": {
//           $map: {
//             input: "$fields",
//             as: "field",
//             in: {
//               $mergeObjects: [
//                 "$$field",
//                 {
//                   _id: {
//                     $cond: [
//                       { $eq: [ { $type: "$$field._id" }, "string" ] },
//                       { $toObjectId: "$$field._id" },
//                       "$$field._id"
//                     ]
//                   }
//                 }
//               ]
//             }
//           }
//         }
//       }
//     }
//   ]
// );

    const [
        userActivityData,
        formCreationData,
        formResponsesData,
        usersData,
        formsData,
    ] = await Promise.all([
        FetchData.usersActivity(),      
        FetchData.formCreationData(),
        FetchData.formResponsesData(),
        FetchData.usersData(),
        FetchData.formsData(),
    ]);
    return (
        <AdminDashboard 
            usersData={usersData} 
            formsData={formsData} 
            userActivityData={userActivityData} 
            formCreationData={formCreationData} 
            formResponsesData={formResponsesData}        
        />
    )
}

export default page