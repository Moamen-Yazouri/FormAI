"use client"

import { useState, useMemo, useEffect } from "react"
import { ICreatorFormData, ICreatorResponses } from "../types"

interface IProps {
    formsData: ICreatorFormData[]
    responses: ICreatorResponses[]
}

const useCreatorDashboard = ({ formsData, responses }: IProps) => {

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

    const totalForms = useMemo(() => formsData.length, [formsData])


    const totalResponses = useMemo(() => formsData.reduce((sum, form) => sum + form.responsesCount, 0), [formsData])

    const topPerformingForms = useMemo(() => {
        return [...formsData]
        .sort((a, b) => b.responsesCount - a.responsesCount)
        .slice(0, 5)
    }, [formsData])

  const recentResponsesCount = useMemo(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    return responses.filter((response) => new Date(response.date) >= oneWeekAgo).length
  }, [])


  const formGrowthRate = 10; 
  const responseGrowthRate = 12; 
  const conversionRateGrowth = 5; 

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
