export const deleteUser = async(userId: string) => {
    const localUrl = process.env.NEXT_PUBLIC_URL;
    try {
        const res = await fetch(`${localUrl}/api/admin/delete-user`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId })
        });
        const {deletedUser} = await res.json();
        return deletedUser;
    }
    catch (err: any) {
        console.error(err.message || "Failed to delete the user!");
        return null;
    }
}



