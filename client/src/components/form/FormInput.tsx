import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import React from "react"
import { useFormContext } from "react-hook-form"

interface WrapFormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
}
const FormInput: React.FC<WrapFormInputProps> = ({ name, ...props }) => {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <Input
            className="w-full"
            {...props}
            {...field}
            value={field.value || ""}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormInput
