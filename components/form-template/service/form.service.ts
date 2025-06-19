
export const getForm = async(id: string) => {
    const localURL = process.env.NEXT_PUBLIC_URL || "";
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
        return form;
    }
    catch {
        return null;
    }
}