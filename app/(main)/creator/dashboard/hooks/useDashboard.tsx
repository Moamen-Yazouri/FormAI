"use client"

import { useState, useMemo } from "react"

interface IFormData {
    id: string
    title: string
    createdAt: string
    responsesCount: number
    status: "active" | "draft" | "archived"
    conversionRate: number
}

interface IResponseData {
    id: string
    formTitle: string
    respondentName: string
    respondentEmail: string
    submittedAt: string
    status: "complete" | "partial"
}

// Sample response data for demonstration
const sampleResponsesData: IResponseData[] = [
    {
        id: "resp1",
        formTitle: "Customer Feedback",
        respondentName: "John Doe",
        respondentEmail: "john.doe@example.com",
        submittedAt: "2023-05-01T10:30:00",
        status: "complete",
    },
    {
        id: "resp2",
        formTitle: "Product Survey",
        respondentName: "Jane Smith",
        respondentEmail: "jane.smith@example.com",
        submittedAt: "2023-05-02T14:45:00",
        status: "complete",
    },
    {
        id: "resp3",
        formTitle: "Event Registration",
        respondentName: "Mike Johnson",
        respondentEmail: "mike.j@example.com",
        submittedAt: "2023-05-03T09:15:00",
        status: "partial",
    },
    {
        id: "resp4",
        formTitle: "Newsletter Signup",
        respondentName: "Sarah Williams",
        respondentEmail: "sarah.w@example.com",
        submittedAt: "2023-05-04T16:20:00",
        status: "complete",
    },
    {
        id: "resp5",
        formTitle: "Customer Feedback",
        respondentName: "Robert Brown",
        respondentEmail: "robert.b@example.com",
        submittedAt: "2023-05-05T11:10:00",
        status: "complete",
    },
    {
        id: "resp6",
        formTitle: "Product Survey",
        respondentName: "Emily Davis",
        respondentEmail: "emily.d@example.com",
        submittedAt: "2023-05-06T09:25:00",
        status: "partial",
    },
]

interface IProps {
    formsData: IFormData[]
}

/**
 * Hook for managing creator dashboard state and calculations
 */
const useCreatorDashboard = ({ formsData }: IProps) => {
  // Search state
    const [searchForms, setSearchForms] = useState("")
    const [searchResponses, setSearchResponses] = useState("")

  // Filter forms based on search term
    const filteredForms = useMemo(() => {
        if (!searchForms.trim()) return formsData

        const searchTerm = searchForms.toLowerCase()
        return formsData.filter(
            (form) => form.title.toLowerCase().includes(searchTerm) || form.status.toLowerCase().includes(searchTerm),
        )
    }, [formsData, searchForms])

  // Filter responses based on search term
    const filteredResponses = useMemo(() => {
        if (!searchResponses.trim()) return sampleResponsesData

        const searchTerm = searchResponses.toLowerCase()
        return sampleResponsesData.filter(
            (response) =>
            response.formTitle.toLowerCase().includes(searchTerm) ||
            response.respondentName.toLowerCase().includes(searchTerm) ||
            response.respondentEmail.toLowerCase().includes(searchTerm),
        )
    }, [searchResponses])

  // Calculate dashboard metrics
    const totalForms = useMemo(() => formsData.length, [formsData])

    const activeForms = useMemo(() => formsData.filter((form) => form.status === "active").length, [formsData])

    const totalResponses = useMemo(() => formsData.reduce((sum, form) => sum + form.responsesCount, 0), [formsData])

  // Calculate overall conversion rate across all forms
    const conversionRate = useMemo(() => {
    if (totalForms === 0) return 0

    // Calculate total views and responses
    const activeForms = formsData.filter((form) => form.status === "active" && form.responsesCount > 0)

    if (activeForms.length === 0) return 0

    // Calculate weighted average conversion rate
    const totalWeightedConversion = activeForms.reduce((sum, form) => {
      return sum + form.conversionRate * form.responsesCount
    }, 0)

    const totalActiveResponses = activeForms.reduce((sum, form) => sum + form.responsesCount, 0)

    return totalActiveResponses > 0 ? Number.parseFloat((totalWeightedConversion / totalActiveResponses).toFixed(1)) : 0
  }, [formsData, totalForms])

  // Get forms sorted by response count (for analytics)
    const topPerformingForms = useMemo(() => {
        return [...formsData]
        .filter((form) => form.status === "active")
        .sort((a, b) => b.responsesCount - a.responsesCount)
        .slice(0, 5)
    }, [formsData])

  // Get recent responses (last 7 days)
  const recentResponsesCount = useMemo(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return sampleResponsesData.filter((response) => new Date(response.submittedAt) >= oneWeekAgo).length
  }, [])

  // Calculate growth metrics (for demonstration)
  const formGrowthRate = 10 // 10% growth in forms from last month
  const responseGrowthRate = 12 // 12% growth in responses from last month
  const conversionRateGrowth = 5 // 5% improvement in conversion rate

  return {
    // Filtered data
    filteredForms,
    filteredResponses,

    // Dashboard metrics
    totalForms,
    activeForms,
    totalResponses,
    conversionRate,

    // Growth metrics
    formGrowthRate,
    responseGrowthRate,
    conversionRateGrowth,

    // Analytics data
    topPerformingForms,
    recentResponsesCount,

    // Search state
    searchForms,
    searchResponses,
    setSearchForms,
    setSearchResponses,
  }
}

export default useCreatorDashboard
