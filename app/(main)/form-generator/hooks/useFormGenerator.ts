import { IForm, IFormField } from "@/@types";
import { AuthContext } from "@/providers/auth/authProvider";
import mongoose from "mongoose";
import { 
    useContext, 
    useRef, 
    useState 
} from "react";
import { toast } from "sonner";
const publicNext: string = process.env.NEXT_PUBLIC_URL || "";
export const useFormGenerator = () => {
    const {user} = useContext(AuthContext);
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isSent, setIsSent] = useState(false)
    const [generatedForm, setGeneratedForm] = useState< IForm | null >(null)
    const [showPublishDialog, setShowPublishDialog] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [allowAnonymous, setAllowAnonymous] = useState(false)
    const [isPublic, setIsPublic] = useState(false)
    const [email, setEmail] = useState("")
    const [emails, setEmails] = useState<string[]>([])
    const [emailError, setEmailError] = useState("")
    const areaRef = useRef<HTMLTextAreaElement>(null)

    const handleTypedMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value
        setIsEmpty(value.trim() === "")
        setPrompt(value)
        autoResizeTextarea()
    }

    const autoResizeTextarea = () => {
        const textarea = areaRef.current
        if (textarea) {
        textarea.style.height = "auto"
        textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
        }
    }

    const resetTextareaHeight = () => {
        const textarea = areaRef.current
        if (textarea) {
        textarea.style.height = "fit-content"
        }
    }
    const handleAddEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address")
        return
    }

    if (emails.includes(email)) {
        setEmailError("This email is already added")
        return
    }

    setEmails([...emails, email])
    setEmail("")
    setEmailError("")
}

const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((e) => e !== emailToRemove))
}

    const generateForm = async () => { 
        try {
            setIsSent(true)
            setError(null)
            setLoading(true)
            resetTextareaHeight()
            const res = await fetch(`${publicNext}/api/generate-form`,
            {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                formRequirements: prompt, 
                }),
            },
            )
            setPrompt("")

        const formData = await res.json();
        if(!res.ok) {
            toast.error(formData.message || "Failed to generate form!");
            return;
        }
            setGeneratedForm(formData)
        } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to generate form")
        } finally {
        setLoading(false)
        }
    }
    const handlePublishForm = async () => {
        setShowPublishDialog(false);
        setIsPublishing(true);

        if(!user) {
            toast.error("You must be logged in to publish a form")
            return;
        }
        const fields = generatedForm!.fields as Omit<IFormField[], "name">;
        const validFields: IFormField[] = fields.map((field) => ({
            ...field,
            name: field.fieldId.toLowerCase(),
        }));
        const formData: IForm = {
            title: generatedForm!.title as string,
            description: generatedForm!.description as string,
            fields: validFields,
            answeredBy: [],
            creatorId: new mongoose.Types.ObjectId(user._id),
            allowAnonymous,
            isPublic,
            allowedUsers: emails || [],
        }
        try {
            const res = await fetch(`${publicNext}/api/add-form`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json" 
                    },
                    body: JSON.stringify(formData),
                }
            )
            const data = await res.json();
            if(!res.ok) {
                toast.error(data.message);
                return;
            }
            setShowPublishDialog(false);
            setGeneratedForm(null);
            toast.success("Form published successfully!")
        }
        catch(err) {
            if(err instanceof Error) {
                toast.error(err.message)
            }
            toast.error("Something went wrong!")
        }
        finally {
            setIsPublishing(false);
            setEmails([]);
        }
    }
    return {
        prompt,
        loading,
        error,
        isSent,
        generatedForm,
        isEmpty,
        areaRef,
        showPublishDialog,
        allowAnonymous,
        isPublic,
        email,
        emails,
        emailError,
        isPublishing,
        setGeneratedForm,
        handleTypedMessage,
        autoResizeTextarea,
        generateForm,
        setPrompt,
        setShowPublishDialog,
        setAllowAnonymous,
        setIsPublic,
        setEmail,
        handleRemoveEmail,
        handleAddEmail,
        handlePublishForm
    }
}