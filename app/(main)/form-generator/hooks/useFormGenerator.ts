import { useRef, useState } from "react"
import { toast } from "sonner"

export const useFormGenerator = () => {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const [isEmpty, setIsEmpty] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [isSent, setIsSent] = useState(false)
    const [generatedForm, setGeneratedForm] = useState<any>(null)
    const [showPublishDialog, setShowPublishDialog] = useState(false)
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
    // Basic email validation
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
            const res = await fetch("http://localhost:3000/api/generate-form",
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
            toast.error(formData.message);
            return;
        }
            setGeneratedForm(formData)
        } catch (error) {
        console.error("Error generating form:", error)
        setError(error instanceof Error ? error.message : "Failed to generate form")
        } finally {
        setLoading(false)
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
    }
}