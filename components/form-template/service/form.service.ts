import { IContextUser } from "@/@types";
import { notFound, unauthorized } from "next/navigation";

export const getForm = async(id: string, user: IContextUser) => {
    const localURL = process.env.NEXT_PUBLIC_URL;
    try {
        const formRes = await fetch(`${localURL}/api/get-form`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id})
            }
        )
        const {form} = await formRes.json();
        if(String(form.creatorId) !== user._id && user.role !== "admin") {
            unauthorized();
        }
        console.log(form);
        return form;
    }
    catch(err) {
        if(err instanceof Error && err.message === "Form not found") {
            notFound();
        }
        return null;
    }
}