"use client"
import MotionField from "@/components/motionTextField/motionTextField"
import { Button } from "@/components/ui/button"
import { Form, FormikProvider } from "formik"
import useForm from "./hooks/useForm"
import { Loader2 } from "lucide-react"
import MotionedSelect from "@/components/motionedSelect/motionedSelect"

const SignUpForm = () => {
  const { formik } = useForm()

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-2">
        <MotionField
          label="Full Name"
          name="name"
          isPassword={false}
          placeholder="Moamen Yazouri"
          style={{
            label: "",
            input:
              "w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          }}
        />

        <MotionField
          label="Email"
          name="email"
          isPassword={false}
          placeholder="email@example.com"
          style={{
            label: "",
            input:
              "w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          }}
        />

        <MotionedSelect
          label="Role"
          name="role"
          options={[
            { value: "user", label: "User" },
            { value: "creator", label: "Creator" },
          ]}
        />

        <MotionField
          label="Password"
          name="password"
          isPassword={true}
          placeholder="••••••••"
          style={{
            label: "",
            input:
              "w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          }}
        />

        <MotionField
          label="Confirm Password"
          name="confirmedPassword"
          isPassword={true}
          placeholder="••••••••"
          style={{
            label: "",
            input:
              "w-full rounded-md border border-input bg-transparent px-2.5 py-1.5 text-xs shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500",
          }}
        />

        <Button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 mt-1 text-sm py-2 cursor-pointer text-white disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {formik.isSubmitting ? (
            <Loader2 className="animate-spin text-white w-4 h-4" />
          ) : (
            "Create an account"
          )}
        </Button>
      </Form>
    </FormikProvider>
  )
}

export default SignUpForm
