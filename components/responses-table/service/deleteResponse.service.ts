export const deleteResponse = async (responseId: string) => {
    const localUrl = process.env.NEXT_PUBLIC_URL;

    try {
        const res = await fetch(`${localUrl}/api/delete-response`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ responseId }),
        });

        const { response } = await res.json();
        return response;
    } catch (err: any) {
        console.error(err.message || "Failed to delete the response!");
        return null;
    }
};

