export const deleteForm = async (formId: string) => {
    const localUrl = process.env.NEXT_PUBLIC_URL;

    try {
        const res = await fetch(`${localUrl}/api/delete-form`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ formId }),
        });

        const { formsData } = await res.json();
        return formsData;
    } catch (err: any) {
        console.error(err.message || "Failed to delete the form!");
        return null;
    }
};
