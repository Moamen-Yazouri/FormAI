export const deleteUser = async(userId: string) => {
    const localUrl = process.env.NEXT_PUBLIC_URL;
    try {
        const res = await fetch(`${localUrl}/api/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId })
        });
        const {usersData} = await res.json();
        return usersData
    }
    catch (err: any) {
        console.error(err.message || "Failed to delete the user!");
        return null;
    }
}



