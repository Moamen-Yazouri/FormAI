import { FormInput, Share2, MessageSquareText } from "lucide-react";

export const features = [
    {
      icon: FormInput,
      title: "Create Forms",
      description: "Build intelligent forms with AI-powered field suggestions and smart validation rules.",
      details: [
        "Drag & drop form builder",
        "AI-powered field suggestions",
        "Smart validation rules",
        "Custom styling options",
      ],
      gradient: "from-cyan-600 to-blue-600",
      bgGradient: "from-cyan-700/20 to-blue-800/20",
      delay: 0.1,
    },
    {
      icon: Share2,
      title: "Share Forms",
      description: "Distribute your forms instantly with secure links and embed options for any platform.",
      details: ["Instant secure sharing", "Embeddable widgets", "QR code generation", "Access control settings"],
      gradient: "from-blue-600 to-cyan-700",
      bgGradient: "from-blue-700/20 to-cyan-800/20",
      delay: 0.2,
    },
    {
      icon: MessageSquareText,
      title: "Answer Forms",
      description: "Provide seamless form completion experience with real-time validation and progress tracking.",
      details: ["Real-time validation", "Progress tracking", "Auto-save functionality", "Mobile-optimized interface"],
      gradient: "from-cyan-500 to-sky-600",
      bgGradient: "from-cyan-600/20 to-sky-700/20",
      delay: 0.3,
    },
  ]