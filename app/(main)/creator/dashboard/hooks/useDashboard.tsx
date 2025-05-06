"use client"

import { useState, useMemo, useEffect } from "react"
import { ICreatorFormData, ICreatorResponses } from "../types"


// Sample response data for demonstration


interface IProps {
    formsData: ICreatorFormData[]
    responses: ICreatorResponses[]
}

/**
 * Hook for managing creator dashboard state and calculations
 */
const useCreatorDashboard = ({ formsData, responses }: IProps) => {

    // Search state
    const [recentResponses, setRecentResponses] = useState<ICreatorResponses[]>([])
    const [searchForms, setSearchForms] = useState("")
    const [searchResponses, setSearchResponses] = useState("")

    useEffect(() => {
      if(responses.length > 5) {
        setRecentResponses(responses.slice(0, 5)) 
      }
      else {
        setRecentResponses(responses)
      }
    }, [responses])
    
    const filteredForms = useMemo(() => {
        if (!searchForms.trim()) return formsData

        const searchTerm = searchForms.toLowerCase()
        return formsData.filter(
            (form) => form.title.toLowerCase().includes(searchTerm)
        )
    }, [formsData, searchForms])

  // Filter responses based on search term
    const filteredResponses = useMemo(() => {
        if (!searchResponses.trim()) return responses

        const searchTerm = searchResponses.toLowerCase()
        return responses.filter(
            (response) =>
            response.formTitle.toLowerCase().includes(searchTerm) ||
            response.respondentName.toLowerCase().includes(searchTerm) ||
            response.respondentEmail.toLowerCase().includes(searchTerm),
        )
    }, [searchResponses])

  // Calculate dashboard metrics
    const totalForms = useMemo(() => formsData.length, [formsData])


    const totalResponses = useMemo(() => formsData.reduce((sum, form) => sum + form.responsesCount, 0), [formsData])

    const topPerformingForms = useMemo(() => {
        return [...formsData]
        .sort((a, b) => b.responsesCount - a.responsesCount)
        .slice(0, 5)
    }, [formsData])

  // Get recent responses (last 7 days)
  const recentResponsesCount = useMemo(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return responses.filter((response) => new Date(response.date) >= oneWeekAgo).length
  }, [])

  // Calculate growth metrics (for demonstration)
  const formGrowthRate = 10 // 10% growth in forms from last month
  const responseGrowthRate = 12 // 12% growth in responses from last month
  const conversionRateGrowth = 5 // 5% improvement in conversion rate

  return {
    filteredForms,
    filteredResponses,
    totalForms,
    totalResponses,
    formGrowthRate,
    responseGrowthRate,
    conversionRateGrowth,
    topPerformingForms,
    recentResponsesCount,
    recentResponses,
    searchForms,
    searchResponses,
    setSearchForms,
    setSearchResponses,
  }
}

export default useCreatorDashboard
