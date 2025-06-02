import authService from "@/module/services/auth.service";
import ProfilePage from "../components/profile-Page";
import { handleAccess } from "@/lib/triggerCoventions";
interface IProps {
    params: Promise<{ name: string }>;
}
export default async function Page(props: IProps) {
    const name = decodeURIComponent((await props.params).name);
    const access = await authService.validateUser(name);
    handleAccess(access);
    return (
        <ProfilePage />
    )
}
