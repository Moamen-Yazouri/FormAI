import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Loader2 className="h-6 w-6 animate-spin text-violet-400" />
    </div>
  )
}
