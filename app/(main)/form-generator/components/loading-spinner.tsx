import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  className?: string
}

export default function LoadingSpinner({ className = "h-5 w-5" }: LoadingSpinnerProps) {
  return <Loader2 className={`animate-spin ${className}`} />
}
