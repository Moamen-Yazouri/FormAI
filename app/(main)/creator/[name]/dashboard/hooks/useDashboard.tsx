"use client"

import { useState, useMemo, useEffect } from "react"
import { ICreatorFormData, ICreatorResponses } from "../types"
import { IFormTable } from "@/@types"
import { generateStateCards } from "../utils/generateStateCards"
import { summarizeForms, summarizeResponses } from "../utils/sliceAndSort"

interface IProps {
    formsData: IFormTable[]
    responses: ICreatorResponses[]
}

const useCreatorDashboard = ({ formsData, responses }: IProps) => {

    const [recentResponses, setRecentResponses] = useState<ICreatorResponses[]>([])
    const [searchForms, setSearchForms] = useState("")
    const [searchResponses, setSearchResponses] = useState("")
    const totalForms = useMemo(() => formsData.length, [formsData])
    const slicedForms = useMemo(() => summarizeForms(formsData), [formsData]);
    const slicedResponses = useMemo(() => summarizeResponses(responses), [responses]);


    const totalResponses = useMemo(() => formsData.reduce((sum, form) => sum + form.responses, 0), [formsData])

    useEffect(() => {
      if(responses.length > 5) {
        setRecentResponses(responses.slice(0, 5)) 
      }
      else {
        setRecentResponses(responses)
      }
    }, [responses])

    const stateCardsData = useMemo(
      () => generateStateCards(totalForms, totalResponses),
    [totalForms, totalResponses]);

    const topPerformingForms = useMemo(() => {
        return [...formsData]
        .sort((a, b) => b.responses - a.responses)
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
    slicedForms,
    slicedResponses,
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
    stateCardsData,
    setSearchForms,
    setSearchResponses,
  }
}

export default useCreatorDashboard
