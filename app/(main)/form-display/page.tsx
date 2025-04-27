"use client"
import type React from "react"

import { useState } from "react"
import StyledFormTemplate from "@/components/form-template/formTemplate"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import MotionField from "@/components/motionTextField/motionTextField"
import FormTemplate from "@/components/form-template/formTemplate"

export default function FormExample() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
    }, 2000)
  }

  const handleCancel = () => {
    console.log("Form cancelled")
  }

  return (
    <FormTemplate
        title="Create New Task"
        description="Fill in the details to create a new task"
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
        submitLabel="Create Task"
        cancelLabel="Cancel"
        isPreview={false}
    >  
        <Input
          name="taskName"
          placeholder="Enter task name"
        />
        <Textarea
          name="taskDescription"
          placeholder="Enter task description"
        />
        <Input
          name="taskName"
          placeholder="Enter task name"
        />
        <Textarea
          name="taskDescription"
          placeholder="Enter task description"
        />
        <Input
          name="taskName"
          placeholder="Enter task name"
        />
        <Textarea
          name="taskDescription"
          placeholder="Enter task description"
        />
        <Input
          name="taskName"
          placeholder="Enter task name"
        />
        <Textarea
          name="taskDescription"
          placeholder="Enter task description"
        />
    </FormTemplate>
  )
}
